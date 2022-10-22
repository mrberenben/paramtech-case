import { Outlet, useLocation } from "react-router-dom";
import styles from "src/styles/components/layout/AppLayout.module.scss";

const { default: APP_LOGO } = require("../../assets/logo.svg");

const AppLayout = () => {
  const location = useLocation();

  return (
    <div className={styles.app_layout}>
      {location.pathname !== "/sign-in" && (
        <header className={styles.app_layout_header}>
          <img src={APP_LOGO} alt="Paramtech" />
        </header>
      )}

      <main className={styles.app_layout_main} role="main">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
