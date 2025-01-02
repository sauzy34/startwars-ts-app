import { getFilmsById } from "@/api/queries";
import { Film } from "@/types/film";
import { getIdFromUrl } from "@/util/getIdFromUrl";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

interface Props {
  data: Film["url"][];
}

function useFilms({ data }: Props) {
  const filmQueriesOptions = useMemo(
    () =>
      data?.map((film, idx) => ({
        queryKey: ["film", `${getIdFromUrl(film)}-${idx}`],
        queryFn: () => getFilmsById({ id: getIdFromUrl(film) ?? "" }),
      })),
    [data]
  );

  const filmQueries = useQueries({
    queries: filmQueriesOptions,
    combine(result) {
      return {
        data: result.map((res) => res.data),
      };
    },
  });

  return filmQueries;
}

export { useFilms };
