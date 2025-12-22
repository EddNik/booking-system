"use client";

import { Link } from "react-router-dom";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

function AuthNavigation() {
  const router = useRouter();
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.replace("/sign-in");
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link to="/profile" prefetch={"none"} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.username}</p>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link to="/sign-in" prefetch={"none"} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link to="/sign-up" prefetch={"none"} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
}

export default AuthNavigation;
