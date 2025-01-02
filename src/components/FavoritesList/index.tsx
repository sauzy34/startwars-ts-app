import { useFavorites } from "@/hooks/useFavorites";
import { memo, useCallback, useEffect, useState } from "react";
import Card from "../ui/Card";
import { getIdFromUrl } from "@/util/getIdFromUrl";
import { localStorageHelper } from "@/util/localStorage";
import { StaticKeys } from "@/constants";
import { Favorites } from "@/types/favorite";
import { xor, xorBy } from "lodash";
import { Character } from "@/types/character";
import Empty from "../Empty";
import Container from "../ui/Container";
import LabelValuePair from "../ui/LabelValuePair";
import s from "./FavoritesList.module.scss";

function FavoritesList() {
  const [list, setList] = useState([]);
  const favQueries = useFavorites();

  useEffect(() => {
    setList(favQueries.data);
  }, [favQueries.data]);

  const handleRemove = useCallback(
    (fav: Character) => {
      const id = getIdFromUrl(fav.url ?? "");
      const favorites = localStorageHelper.get<Favorites>(
        StaticKeys.FavoriteCharacters
      );

      const _favorites = xor(favorites, [id]);
      localStorageHelper.set(StaticKeys.FavoriteCharacters, _favorites);

      // update the list state
      setList(xorBy(list, [fav], "url"));
    },
    [list]
  );

  if (favQueries.data.length === 0) return <Empty />;

  return (
    <Container>
      <h3>My Favorites</h3>
      <div className={s.list}>
        {favQueries.data.map((fav, idx) => (
          <Card className={s.card} key={idx}>
            <span className={s.cross} onClick={() => handleRemove(fav)}>
              X
            </span>
            <LabelValuePair label="Name" value={fav?.name} />
            <LabelValuePair label="Height" value={fav?.height} />
            <LabelValuePair label="Gender" value={fav?.gender} />
            <LabelValuePair label="Home planet" value={fav?.homeworld} />
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default memo(FavoritesList);
