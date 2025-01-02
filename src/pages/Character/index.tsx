import { getCharacterByIdOptions, getPlanetByIdOptions } from "@/api/queries";
import Card from "@/components/ui/Card";
import LabelValuePair from "@/components/ui/LabelValuePair";
import { useMyQuery } from "@/hooks/useMyQuery";
import { Route } from "@/routes/character.$characterId";
import { useSuspenseQuery } from "@tanstack/react-query";
import s from "./Character.module.scss";
import Container from "@/components/ui/Container";
import OrderedList from "@/components/ui/OrderedList";
import { useFilms } from "@/hooks/useFilms";
import { useStarships } from "@/hooks/useStarships";
import FavoriteActions from "@/components/FavoriteActions";

function CharacterPage() {
  const params = Route.useParams();
  const characterByIdQuery = useSuspenseQuery(
    getCharacterByIdOptions({ id: params.characterId })
  );
  const filmQueries = useFilms({ data: characterByIdQuery.data.films });
  const starshipsQueries = useStarships({
    data: characterByIdQuery.data.starships,
  });
  const planetByIdQuery = useMyQuery(
    getPlanetByIdOptions({ id: params.characterId })
  );

  return (
    <Container>
      <FavoriteActions />
      <div className={s.cardGroup}>
        <Card>
          <LabelValuePair label="Name" value={characterByIdQuery.data.name} />
          <LabelValuePair
            label="Hair color"
            value={characterByIdQuery.data.hair_color}
          />
          <LabelValuePair
            label="Eye color"
            value={characterByIdQuery.data.eye_color}
          />
          <LabelValuePair
            label="Gender"
            value={characterByIdQuery.data.gender}
          />
          <LabelValuePair
            label="Home planet"
            value={planetByIdQuery.data?.name ?? "NA"}
          />
        </Card>
        <OrderedList
          title="Films"
          data={filmQueries.data}
          renderItem={(film, idx) => <p key={idx}>{film?.title}</p>}
        />
        <OrderedList
          title="Starships"
          data={starshipsQueries.data}
          renderItem={(startship, idx) => <p key={idx}>{startship?.name}</p>}
        />
      </div>
    </Container>
  );
}

export default CharacterPage;
