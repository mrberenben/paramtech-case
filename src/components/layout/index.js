import { Outlet, useLocation } from "react-router-dom";
import styles from "src/styles/components/layout/AppLayout.module.scss";

// redux
import { useSelector } from "react-redux";

// components
import { Logo } from "src/components/icons";

const AppLayout = () => {
  const location = useLocation();
  const auth = useSelector(state => state.auth);

  return (
    <div className={styles.app_layout}>
      {location.pathname !== "/sign-up" && (
        <header className={styles.app_layout_header}>
          <div className={styles.app_layout_header_logo}>
            <Logo />
          </div>
          <div className={styles.app_layout_header_auth}>
            {auth.name || "Logout"}
          </div>
        </header>
      )}

      <main className={styles.app_layout_main} role="main">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
