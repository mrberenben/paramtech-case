import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "src/styles/components/layout/AppLayout.module.scss";

// redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "src/features/auth/authSlice";

// components
import { Logo, AvatarIcon } from "src/components/icons";
import { ChevronDownIcon } from "../icons/index";

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/sign-up");
  };

  return (
    <div className={styles.app_layout}>
      {location.pathname !== "/sign-up" && (
        <header className={styles.app_layout_header}>
          <div className={styles.app_layout_header_logo}>
            <Logo />
          </div>
          <div className={styles.app_layout_header_auth}>
            <button type="button" onClick={() => handleLogout()}>
              <AvatarIcon />
              {auth.name}
            </button>
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
