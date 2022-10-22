import { useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";

const FETCH_HEADERS = {
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json; charset=UTF-8"
};

const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false
};

const useFetch = (url, method, body, isFormData) => {
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case "LOADING":
        return { ...INITIAL_STATE, loading: action.payload };
      case "FETCHED":
        return { ...INITIAL_STATE, data: action.payload };
      case "ERROR":
        return { ...INITIAL_STATE, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, INITIAL_STATE);
  const cancelRequest = useRef(false);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "LOADING", payload: true });

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_API_URL}${url}`,
          {
            method: method || "GET",
            headers: {
              ...FETCH_HEADERS,
              ...(isFormData ? { "Content-Type": "multipart/form-data" } : {})
            },
            ...(body ? { body } : {}),
            signal: controller.signal
          }
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();

        if (cancelRequest.current) return;

        dispatch({ type: "FETCHED", payload: data });
      } catch (error) {
        dispatch({ type: "ERROR", payload: error });
      }

      dispatch({ type: "LOADING", payload: false });
    };

    void fetchData();

    return () => {
      cancelRequest.current = true;
      controller.abort();
    };
  }, [url]);

  return state;
};

export default useFetch;

useFetch.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string,
  body: PropTypes.object
};
