import { Link } from "react-router-dom";
import css from "./Header.module.css";

// Інтерфейс пропсів (те, що Header очікує від App.tsx)
interface HeaderProps {
  role: "client" | "business" | null; // Поточна роль юзера
  onLogout: () => void; // Функція виходу
}

function Header({ role, onLogout }: HeaderProps) {
  return (
    <header className={css.header}>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          {/* Загальні посилання */}
          <li className={css.navigationItem}>
            <Link to="/" className={css.navigationLink}>
              Home
            </Link>
          </li>

          {/* Логіка, яка раніше була в AuthNavigation */}
          {role ? (
            /* Якщо юзер залогінений */
            <>
              <li className={css.navigationItem}>
                <span
                  className={css.navigationLink}
                  style={{ cursor: "default", color: "#888" }}
                >
                  Вітаю, {role === "client" ? "Клієнт" : "Бізнес"}
                </span>
              </li>
              <li className={css.navigationItem}>
                <button
                  onClick={onLogout}
                  className={css.navigationLink}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Вийти
                </button>
              </li>
            </>
          ) : (
            /* Якщо юзер НЕ залогінений */
            <li className={css.navigationItem}>
              <span className={css.navigationLink} style={{ color: "#888" }}>
                Гість
              </span>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
