import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { ServerError } from "@/types/common";

export function useMyMutation<
  TData = unknown,
  TError = ServerError,
  TVariables = void,
  TContext = unknown
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  return useMutation({
    ...options,
  });
}
