import { useEffect } from "react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import {
  createMemoryHistory,
  ReactLocation,
  Router,
} from "@tanstack/react-location";
import { en } from "make-plural/plurals";
import { useDarkMode } from "storybook-dark-mode";
import { ThemeProvider, useThemeMode } from "@/providers";
import "./fonts.css";

i18n.loadLocaleData("en-GB", { plurals: en });
i18n.load("en-GB", {});
i18n.activate("en-GB");

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    stylePreview: true,
  },
};

const ThemeWrapper = ({ children }) => {
  const dark = useDarkMode();
  const { setMode } = useThemeMode();
  useEffect(() => void setMode(dark ? "dark" : "light"), [dark, setMode]);
  return <>{children}</>;
};

export const decorators = [
  (Story) => (
    <I18nProvider i18n={i18n}>
      <ThemeProvider initialMode={useDarkMode() ? "dark" : "light"}>
        <ThemeWrapper>
          <Router
            location={
              new ReactLocation({
                history: createMemoryHistory(),
              })
            }
            routes={[]}
          >
            <Story />
          </Router>
        </ThemeWrapper>
      </ThemeProvider>
    </I18nProvider>
  ),
];
