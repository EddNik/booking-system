import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
}

function Pagination({ totalPages, currentPage, setPage }: PaginationProps) {
  const handlePageChange = (page: { selected: number }) => {
    setPage(page.selected + 1);
  };
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
}

export default Pagination;
