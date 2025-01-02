import { getStarshipsById } from "@/api/queries";
import { Starship } from "@/types/starships";
import { getIdFromUrl } from "@/util/getIdFromUrl";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

interface Props {
  data: Starship["url"][];
}
function useStarships({ data }: Props) {
  const starshipsQueriesOptions = useMemo(
    () =>
      data.map((starship, idx) => ({
        queryKey: [`starship-${getIdFromUrl(starship)}-${idx}`],
        queryFn: () => getStarshipsById({ id: getIdFromUrl(starship) ?? "" }),
      })),
    [data]
  );

  const starshipsQueries = useQueries({
    queries: starshipsQueriesOptions,
    combine(result) {
      return {
        data: result.map((res) => res.data),
      };
    },
  });

  return starshipsQueries;
}

export { useStarships };
