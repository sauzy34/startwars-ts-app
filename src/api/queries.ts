import { Character, Id } from "@/types/character";
import { Film } from "@/types/film";
import { Planet } from "@/types/planet";
import { Starship } from "@/types/starships";
import { axiosInstance } from "@/util/axios";
import { queryOptions } from "@tanstack/react-query";

export async function getCharacter() {
  const { data } = await axiosInstance.get<Character[]>(`/people`);

  return data;
}

export const getCharacterOptions = queryOptions({
  queryKey: ["character"],
  queryFn: () => getCharacter(),
});

export async function getCharacterById({ id }: Id) {
  const { data } = await axiosInstance.get<Character>(`/people/${id}`);

  return data;
}

export const getCharacterByIdOptions = ({ id }: Id) =>
  queryOptions({
    queryKey: ["characterById", { id }],
    queryFn: () => getCharacterById({ id }),
  });

export async function getPlanetById({ id }: Id) {
  const { data } = await axiosInstance.get<Planet>(`/planets/${id}`);

  return data;
}

export const getPlanetByIdOptions = ({ id }: Id) =>
  queryOptions({
    queryKey: ["getPlanetById", { id }],
    queryFn: () => getPlanetById({ id }),
  });

export async function getFilmsById({ id }: Id) {
  const { data } = await axiosInstance.get<Film>(`/films/${id}`);

  return data;
}

export const getFilmsByIdOptions = ({ id }: Id) =>
  queryOptions({
    queryKey: ["getFilmsById", { id }],
    queryFn: () => getFilmsById({ id }),
  });

export async function getStarshipsById({ id }: Id) {
  const { data } = await axiosInstance.get<Starship>(`/starships/${id}`);

  return data;
}

export const getStarshipsByIdOptions = ({ id }: Id) =>
  queryOptions({
    queryKey: ["getStarshipsById", { id }],
    queryFn: () => getStarshipsById({ id }),
  });
