import React from "react";
import ReactDOM from "react-dom";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { en } from "make-plural/plurals";
import { AuthProvider, FilterProvider, ThemeProvider } from "@/providers";
import { App } from "./App";
import "./main.css";

i18n.loadLocaleData("en-GB", { plurals: en });
i18n.load("en-GB", {});
i18n.activate("en-GB");

import("./mocks/browser").then(({ worker }) => {
  worker.start({ onUnhandledRequest: "bypass" });
  // Render the app
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider>
        <I18nProvider i18n={i18n}>
          <AuthProvider>
            <FilterProvider>
              <App />
            </FilterProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
