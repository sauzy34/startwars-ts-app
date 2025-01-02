import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/Home";
import { getCharacterOptions } from "@/api/queries";
import { z } from "zod";

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    search: z.string().optional(),
    page: z.number().optional(),
  }).parse,
  loader: async ({ context: { queryClient } }) =>
    await queryClient.ensureQueryData(getCharacterOptions),
  component: HomePage,
  wrapInSuspense: true,
});
