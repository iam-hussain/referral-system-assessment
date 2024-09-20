import {
  createRouter,
  ErrorComponent,
  RouterProvider,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./components/query-provider";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <div>Loading...</div>,
  defaultErrorComponent: ({ error }) => (
    <div>
      <p>Error: Something went wrong...</p>
      {error && import.meta.env.DEV && <ErrorComponent error={error} />}
    </div>
  ),
  defaultNotFoundComponent: () => <div>Page not found...</div>,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

function Router() {
  return <RouterProvider router={router} />;
}
export default Router;
