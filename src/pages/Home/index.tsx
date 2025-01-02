import CharacterGrid from "@/components/CharacterList";
import Search from "@/components/ui/Search";
import { useCharacter } from "@/hooks/useCharacter";
import { Route } from "@/routes";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import s from "./HomePage.module.scss";
import Container from "@/components/ui/Container";

function HomePage() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { search } = Route.useSearch();
  const { characterList, handleSearch } = useCharacter({ search });

  const handleOnChange = useCallback(
    (event: { target: { value: string } }) => {
      handleSearch(event.target.value);
      navigate({
        search: (old) => ({
          ...old,
          search: event.target.value,
        }),
      });
    },
    [handleSearch, navigate]
  );

  return (
    <Container className={s.section}>
      <Search
        placeholder="Search character by name"
        value={search}
        onChange={handleOnChange}
      />
      <CharacterGrid list={characterList} />
    </Container>
  );
}

export default HomePage;
