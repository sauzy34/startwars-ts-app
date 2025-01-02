import FavoritesPage from "@/pages/Favorites";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
  wrapInSuspense: true,
});
