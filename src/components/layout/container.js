import styles from "src/styles/components/layout/container.module.scss";
import PropTypes from "prop-types";

const Container = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;

Container.propTypes = {
  children: PropTypes.node.isRequired
};
