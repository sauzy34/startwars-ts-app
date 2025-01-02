import { memo, useCallback, useEffect, useState } from "react";
import s from "./FavoriteActions.module.scss";
import Button from "../ui/Button";
import { Link } from "@tanstack/react-router";
import { localStorageHelper } from "@/util/localStorage";
import { Favorites } from "@/types/favorite";
import { StaticKeys } from "@/constants";
import { Route } from "@/routes/character.$characterId";
import { xor } from "lodash";

function FavoriteActions() {
  const params = Route.useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const existingFavorites = localStorageHelper.get<Favorites>(
    StaticKeys.FavoriteCharacters
  );
  const handleClickFavorite = useCallback(() => {
    let value;
    setIsFavorite((prev) => !prev);

    // when the favorites are empty
    if (!existingFavorites?.length) {
      value = [params.characterId];
    } else if (isFavorite) {
      value = xor(existingFavorites, [params.characterId]);
    } else {
      value = [...existingFavorites, params.characterId];
    }

    localStorageHelper.set(StaticKeys.FavoriteCharacters, value);
  }, [existingFavorites, isFavorite, params.characterId]);

  useEffect(
    function updateIsFavorite() {
      setIsFavorite(existingFavorites?.includes(params.characterId) || false);
    },
    [existingFavorites, params.characterId]
  );

  return (
    <div className={s.btnGroup}>
      <Button onClick={handleClickFavorite}>
        {isFavorite ? "Unfavorite" : "Favorite"}
      </Button>
      <Link to="/favorites">My Favorites</Link>
    </div>
  );
}

export default memo(FavoriteActions);
