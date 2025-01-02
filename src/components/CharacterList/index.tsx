import { Character } from "@/types/character";
import { memo, useCallback, useMemo } from "react";
import s from "./CharacterList.module.scss";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "@/routes";
import { getIdFromUrl } from "@/util/getIdFromUrl";
import Card from "../ui/Card";
import PaginatedList from "../PaginatedList";
import { usePagination } from "@/hooks/usePagination";
import { useQueries } from "@tanstack/react-query";
import { getPlanetById } from "@/api/queries";
import LabelValuePair from "../ui/LabelValuePair";

type CharacterDetail = Pick<
  Character,
  "name" | "gender" | "homeworld" | "created" | "url"
>;

interface Props {
  list: CharacterDetail[];
}

function CharacterList({ list = [] }: Props) {
  const navigate = useNavigate({ from: Route.fullPath });
  const { page } = useSearch({ from: Route.fullPath });
  const { currentItems } = usePagination({
    data: list,
    currentPage: page,
    itemsPerPage: 6,
  });
  const planetQueriesOptions = useMemo(
    () =>
      currentItems.map((item) => {
        const planetId = getIdFromUrl(item.homeworld);

        return {
          queryKey: ["planet", planetId],
          queryFn: () => getPlanetById({ id: planetId ?? "" }),
          select: (result: Awaited<ReturnType<typeof getPlanetById>>) => {
            return {
              [result.url]: result.name,
            };
          },
        };
      }),
    [currentItems]
  );

  const planetQueries = useQueries({
    queries: planetQueriesOptions,
    combine(result) {
      return {
        mapped: result.reduce((acc, item) => ({ ...acc, ...item.data }), {}),
      };
    },
  });

  const navigateToCharacter = useCallback(
    (item: CharacterDetail) => {
      navigate({
        to: "/character/$characterId",
        params: {
          characterId: getIdFromUrl(item.url) ?? "",
        },
      });
    },
    [navigate]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      navigate({
        search: (old) => ({ ...old, page, search: "" }),
      });
    },
    [navigate]
  );

  return (
    <>
      <PaginatedList<CharacterDetail>
        data={list}
        onPageChange={handlePageChange}
        currentPage={page}
        renderItem={(item) => (
          <Card
            key={item.created}
            className={s.gridItem}
            onClick={() => navigateToCharacter(item)}
          >
            <LabelValuePair label="Name" value={item.name} />
            <LabelValuePair label="Gender" value={item.gender} />
            <LabelValuePair
              label="Home planet"
              value={
                planetQueries.mapped[
                  item.homeworld as keyof typeof planetQueries.mapped
                ]
              }
            />
          </Card>
        )}
      />
    </>
  );
}

export default memo(CharacterList);
