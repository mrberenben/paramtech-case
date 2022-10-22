import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "src/styles/pages/signup.module.scss";

// redux
import { useDispatch } from "react-redux";
import { signup } from "src/features/auth/authSlice";

// components
import Button from "src/components/button";
import { Logo } from "src/components/icons";
import { EnvelopeIcon, UserIcon } from "src/components/icons/index";

// utils
import API from "src/utils/api";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: false
  });

  // on form submit
  const onSubmit = async e => {
    e.preventDefault();

    if (name.current && email.current) {
      setResponse(current => ({
        ...current,
        loading: true
      }));

      const formData = new FormData();
      const controller = new AbortController();

      formData.append("fullName", name.current.value);
      formData.append("email", email.current.value);

      const res = await fetch(
        `${process.env.REACT_APP_BASE_API_URL}${API.SIGN_UP}`,
        {
          signal: controller.signal,
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "multipart/form-data"
          },
          body: formData
        }
      );

      if (
        res.status !== 200 ||
        res.status !== 201 ||
        res.statusText !== "Created"
      ) {
        setResponse(current => ({
          ...current,
          error: true,
          loading: false
        }));
      }

      const data = await res.json();

      // register
      dispatch(
        signup({ name: name.current.value, email: email.current.value })
      );
      setResponse(current => ({
        ...current,
        data,
        loading: false
      }));
      navigate("/");
    }
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth_card}>
        <header className={styles.auth_card_header}>
          <Logo />
        </header>

        <div className={styles.auth_card_body}>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.form_row}>
              <label htmlFor="name">Adınız Soyadınız</label>
              <div className={styles.form_row_input}>
                <input
                  ref={name}
                  id="name"
                  type="text"
                  placeholder="Adınızı girin"
                  autoComplete="off"
                  required
                />
                <UserIcon />
              </div>
            </div>
            <div className={styles.form_row}>
              <label htmlFor="email">Email Adresiniz</label>
              <div className={styles.form_row_input}>
                <input
                  ref={email}
                  id="email"
                  type="email"
                  placeholder="Email adresinizi girin"
                  autoComplete="off"
                  required
                />
                <EnvelopeIcon />
              </div>
            </div>
            <div className={styles.form_row}>
              <Button
                type="submit"
                variant="primary"
                stretch={true}
                loading={response.loading}
              >
                Devam Et
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
