import { Link } from "react-router-dom";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

function Header() {
  return (
    <header className={css.header}>
      <Link to="/" aria-label="Home" className={css.headerLink}>
        NoteHub
      </Link>

      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link to={"/"} className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link to={"/notes/filter/all"} className={css.navigationLink}>
              Businesses
            </Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
