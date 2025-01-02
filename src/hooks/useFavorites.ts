import { getCharacterById } from "@/api/queries";
import { StaticKeys } from "@/constants";
import { Favorites } from "@/types/favorite";
import { localStorageHelper } from "@/util/localStorage";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

function useFavorites() {
  const favorites = localStorageHelper.get<Favorites>(
    StaticKeys.FavoriteCharacters
  );

  const favoriteQueries = useMemo(
    () =>
      favorites?.map((favorite) => ({
        queryKey: ["favorite", favorite],
        queryFn: () => getCharacterById({ id: favorite }),
      })) ?? [],
    [favorites]
  );

  return useQueries({
    queries: favoriteQueries,
    combine: (results) => {
      return {
        data: results.map((res) => res.data),
      };
    },
  });
}

export { useFavorites };
