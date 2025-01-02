import { memo, ReactNode, useState } from "react";
import Button from "../ui/Button";
import s from "./PaginatedList.module.scss";
import { usePagination } from "@/hooks/usePagination";

interface PaginatedListProps<T> {
  data: T[];
  itemsPerPage?: number;
  currentPage?: number;
  renderItem: (item: T) => ReactNode;
  onPageChange?: (page: number) => void;
}

const PaginatedList = <T,>({
  data,
  itemsPerPage = 6,
  currentPage = 1,
  renderItem,
  onPageChange,
}: PaginatedListProps<T>) => {
  const [_currentPage, setCurrentPage] = useState(currentPage);
  const { currentItems, totalPages } = usePagination({
    data,
    currentPage: _currentPage,
    itemsPerPage,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  return (
    <div>
      <ul className={s.ul}>
        {currentItems.map((item, index) => (
          <li key={index}>{renderItem(item)}</li>
        ))}
      </ul>
      <div className={s.paginationBar}>
        <Button
          onClick={() => handlePageChange(_currentPage - 1)}
          disabled={_currentPage === 1 || totalPages < 2}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, index) => {
          if (
            index + 1 === _currentPage ||
            index + 2 === _currentPage ||
            index === _currentPage ||
            index - 1 === _currentPage
          ) {
            return (
              <Button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                disabled={_currentPage === index + 1}
              >
                {index + 1}
              </Button>
            );
          } else if (
            (index === 0 && _currentPage > 3) ||
            (index === totalPages - 1 && _currentPage < totalPages - 2)
          ) {
            return <span key={index + 1}>...</span>;
          }
        })}

        <Button
          onClick={() => handlePageChange(_currentPage + 1)}
          disabled={_currentPage === totalPages || totalPages < 2}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default memo(PaginatedList) as typeof PaginatedList;
