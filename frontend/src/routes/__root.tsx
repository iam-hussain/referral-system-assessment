import { queryClient } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import React, { Suspense } from "react";


const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    );

export const Route = createRootRouteWithContext<{
  queryClient: typeof queryClient;
}>()({
  component: () => (
    <Suspense>
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster />
    </Suspense>
  ),
});
