import PropTypes from "prop-types";
import styles from "src/styles/components/button/button.module.scss";

// components
import Loader from "src/components/loader";

const Button = ({ variant, type, loading, disabled, stretch, children }) => {
  return (
    <button
      type={type || "button"}
      disabled={loading || disabled || false}
      className={`${styles.button} ${styles[variant]} ${
        stretch ? styles.stretch : ""
      }`}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  variant: PropTypes.string.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  stretch: PropTypes.bool,
  children: PropTypes.node.isRequired
};
