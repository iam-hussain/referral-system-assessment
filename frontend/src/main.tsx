import "./global.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./components/query-provider";
import { Toaster } from "@/components/ui/sonner";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </StrictMode>,
  );
}
