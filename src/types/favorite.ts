import { z } from "zod";

export const FavoritesSchema = z.array(z.string());

export type Favorites = z.infer<typeof FavoritesSchema>;
