import { useEffect, useState } from "react";

import css from "./App.module.css";
import { fetchNotes } from "../../services/appointService";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Pagination from "../Pagination/Pagination";
import { toast } from "react-hot-toast";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useDebounce } from "use-debounce";

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [debouncedQuery] = useDebounce(query, 500);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", debouncedQuery, page],
    queryFn: () => fetchNotes(debouncedQuery, page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && data?.notes?.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data, isSuccess]);

  function handleQuery(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
  }

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox setQuery={handleQuery} query={query} />
          {isSuccess && totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              setPage={setPage}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
      </div>
      <main>
        {isLoading && <Loader />}
        {isError && <ErrorMessage error={error?.message} />}
        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
