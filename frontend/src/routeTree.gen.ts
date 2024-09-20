/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SignupImport } from "./routes/signup";
import { Route as SignoutImport } from "./routes/signout";
import { Route as HomeImport } from "./routes/home";
import { Route as DashboardImport } from "./routes/dashboard";
import { Route as IndexImport } from "./routes/index";

// Create/Update Routes

const SignupRoute = SignupImport.update({
  path: "/signup",
  getParentRoute: () => rootRoute,
} as any);

const SignoutRoute = SignoutImport.update({
  path: "/signout",
  getParentRoute: () => rootRoute,
} as any);

const HomeRoute = HomeImport.update({
  path: "/home",
  getParentRoute: () => rootRoute,
} as any);

const DashboardRoute = DashboardImport.update({
  path: "/dashboard",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/dashboard": {
      id: "/dashboard";
      path: "/dashboard";
      fullPath: "/dashboard";
      preLoaderRoute: typeof DashboardImport;
      parentRoute: typeof rootRoute;
    };
    "/home": {
      id: "/home";
      path: "/home";
      fullPath: "/home";
      preLoaderRoute: typeof HomeImport;
      parentRoute: typeof rootRoute;
    };
    "/signout": {
      id: "/signout";
      path: "/signout";
      fullPath: "/signout";
      preLoaderRoute: typeof SignoutImport;
      parentRoute: typeof rootRoute;
    };
    "/signup": {
      id: "/signup";
      path: "/signup";
      fullPath: "/signup";
      preLoaderRoute: typeof SignupImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/dashboard": typeof DashboardRoute;
  "/home": typeof HomeRoute;
  "/signout": typeof SignoutRoute;
  "/signup": typeof SignupRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/dashboard": typeof DashboardRoute;
  "/home": typeof HomeRoute;
  "/signout": typeof SignoutRoute;
  "/signup": typeof SignupRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/dashboard": typeof DashboardRoute;
  "/home": typeof HomeRoute;
  "/signout": typeof SignoutRoute;
  "/signup": typeof SignupRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/dashboard" | "/home" | "/signout" | "/signup";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/dashboard" | "/home" | "/signout" | "/signup";
  id: "__root__" | "/" | "/dashboard" | "/home" | "/signout" | "/signup";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  DashboardRoute: typeof DashboardRoute;
  HomeRoute: typeof HomeRoute;
  SignoutRoute: typeof SignoutRoute;
  SignupRoute: typeof SignupRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  DashboardRoute: DashboardRoute,
  HomeRoute: HomeRoute,
  SignoutRoute: SignoutRoute,
  SignupRoute: SignupRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/dashboard",
        "/home",
        "/signout",
        "/signup"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/home": {
      "filePath": "home.tsx"
    },
    "/signout": {
      "filePath": "signout.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
