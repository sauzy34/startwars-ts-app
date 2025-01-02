import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { ServerError } from "@/types/common";

export function useMyQuery<
  TQueryFnData = unknown,
  TError = ServerError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  return useQuery({
    ...options,
  });
}
