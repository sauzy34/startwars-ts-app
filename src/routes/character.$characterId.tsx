import { getCharacterByIdOptions } from "@/api/queries";
import Error from "@/components/Error";
import NotFound from "@/components/NotFound";
import CharacterPage from "@/pages/Character";
import { createFileRoute } from "@tanstack/react-router";
import { AxiosError } from "axios";

export const Route = createFileRoute("/character/$characterId")({
  loader: async ({ context: { queryClient }, params: { characterId } }) => {
    await queryClient.ensureQueryData(
      getCharacterByIdOptions({ id: characterId })
    );
  },
  component: CharacterPage,
  notFoundComponent: () => {
    return <NotFound>Character not found</NotFound>;
  },
  errorComponent: ({ error }) => <Error error={error as AxiosError} />,
  wrapInSuspense: true,
});
