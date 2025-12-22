import clsx from "clsx";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  query: string;
  setQuery: (query: string) => void;
}
function SearchBox({ query, setQuery }: SearchBoxProps) {
  return (
    <div>
      <input
        className={css.input}
        type="text"
        value={query.trim()}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button
        type="button"
        className={clsx(css.btnClear, query && css.btnClearVisible)}
        onClick={() => setQuery("")}
      >
        Cancel
      </button>
    </div>
  );
}

export default SearchBox;
