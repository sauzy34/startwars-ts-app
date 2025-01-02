import { getCharacterOptions } from "@/api/queries";
import { useCallback, useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { matchSorter } from "match-sorter";
import { useDebounce } from "./useDebounce";

interface Props {
  search?: string;
}

function useCharacter({ search = "" }: Props) {
  const [_search, setSearch] = useState(search);
  const debouncedSearch = useDebounce(_search, 500);
  const { data } = useSuspenseQuery(getCharacterOptions);
  const characterList = useMemo(() => {
    const list = data.map(({ name, gender, created, homeworld, url }) => ({
      name,
      gender,
      created,
      homeworld,
      url,
    }));

    return debouncedSearch
      ? matchSorter(list, debouncedSearch, { keys: ["name"] })
      : list;
  }, [data, debouncedSearch]);

  return {
    characterList,
    handleSearch: useCallback((value: string) => {
      setSearch(value);
    }, []),
  };
}

export { useCharacter };
