import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { HausThemeProvider } from "@daohaus/ui";
import { Routes } from "./Routes";
import { SearchContextProvider } from "./contexts/SearchContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <HausThemeProvider>
        <SearchContextProvider>
          <Routes />
        </SearchContextProvider>
      </HausThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
