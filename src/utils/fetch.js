const Response = {
  data: null,
  error: null,
  loading: false
};

const Fetch = async (url, method, body, formData) => {
  const FETCH_HEADERS = {
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    ...(formData
      ? { "Content-Type": "application/form-data; charset=UTF-8" }
      : { "Content-Type": "application/json; charset=UTF-8" })
  };

  const controller = new AbortController();
  Response.loading = true;

  const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}${url}`, {
    method: method || "GET",
    headers: FETCH_HEADERS,
    signal: controller.signal,
    ...(method === "POST" || method === "PUT" ? { body: body } : {})
  });

  if (!res.ok) {
    Response.error = true;
    return Response;
  }

  const data = await res.json();

  Response.data = data;
  Response.loading = false;

  return Response;
};

export default Fetch;
