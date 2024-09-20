import { queryOptions } from "@tanstack/react-query";

import fetcher from "./fetcher";

const noRefetchConfigs = {};

export const fetchMe = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: () => fetcher("/user/me") as any,
    ...noRefetchConfigs,
  });

export const fetchUsers = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: () => fetcher("/user") as any,
    ...noRefetchConfigs,
  });

export const fetchLogout = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: () => fetcher("/auth/logout") as any,
    ...noRefetchConfigs,
    enabled: false,
  });
