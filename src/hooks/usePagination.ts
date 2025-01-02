import PaginatedList from "@/components/PaginatedList";
import { ComponentProps } from "react";

function usePagination<T>({
  data,
  currentPage = 1,
  itemsPerPage = 6,
}: Pick<
  ComponentProps<typeof PaginatedList<T>>,
  "data" | "currentPage" | "itemsPerPage"
>) {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    data.length > itemsPerPage
      ? data.slice(indexOfFirstItem, indexOfLastItem)
      : data;
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  return { currentItems, totalPages };
}

export { usePagination };
