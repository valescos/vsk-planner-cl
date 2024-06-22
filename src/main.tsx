import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ModalContextProvider from "./contexts/ModalContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
