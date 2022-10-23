import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import styles from "src/styles/components/layout/AppLayout.module.scss";

// redux
import { useSelector, useDispatch } from "react-redux";
import { logout } from "src/features/auth/authSlice";

// components
import { Logo, AvatarIcon } from "src/components/icons";

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
          <Link to="/" className={styles.app_layout_header_logo}>
            <Logo />
          </Link>
          <div className={styles.app_layout_header_auth}>
            <button type="button" onClick={() => handleLogout()} title="logout">
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
