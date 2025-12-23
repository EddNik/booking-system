import css from "./Header.module.css";
import type { UserRole } from "../../types/appointTypes";
import clsx from "clsx";

interface HeaderProps {
  role: UserRole | null;
  onLogout: () => void;
  onOpenModal: (role: UserRole, mode: "login" | "register") => void;
}

function Header({ role, onLogout, onOpenModal }: HeaderProps) {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navigation}>
          {role ? (
            <>
              <li className={css.navigationItem}>
                <span className={css.navigationLink}>
                  {role === "client" ? "Client" : "Business"}
                </span>
              </li>
              <li className={css.navigationItem}>
                <button onClick={onLogout} className={css.navigationLink}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li
                className={css.navigationItem}
                style={{ marginRight: "10px" }}
              >
                <h3>Client</h3>

                <button
                  onClick={() => onOpenModal("client", "login")}
                  className={clsx(css.navigationLink, css.usersGroupedButton)}
                >
                  Login
                </button>
                <span style={{ margin: "0 5px" }}>/</span>
                <button
                  onClick={() => onOpenModal("client", "register")}
                  className={clsx(css.navigationLink, css.usersGroupedButton)}
                >
                  Register
                </button>
              </li>

              {/* Business */}
              <li
                className={css.navigationItem}
                style={{ borderLeft: "1px solid #ccc", paddingLeft: "15px" }}
              >
                <h3>Business</h3>

                <button
                  onClick={() => onOpenModal("business", "login")}
                  className={clsx(css.navigationLink, css.usersGroupedButton)}
                >
                  Login
                </button>
                <span style={{ margin: "0 5px" }}>/</span>
                <button
                  onClick={() => onOpenModal("business", "register")}
                  className={clsx(css.navigationLink, css.usersGroupedButton)}
                >
                  Register
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
