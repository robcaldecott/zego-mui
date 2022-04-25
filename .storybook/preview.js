import "../styles/globals.css";
import { useEffect } from "react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { ThemeProvider, useThemeMode, AuthProvider } from "@/providers";
import { en } from "make-plural/plurals";
import { useDarkMode } from "storybook-dark-mode";

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
  nextRouter: {
    Provider: RouterContext.Provider,
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
    <AuthProvider>
      <I18nProvider i18n={i18n}>
        <ThemeProvider initialMode={useDarkMode() ? "dark" : "light"}>
          <ThemeWrapper>
            <Story />
          </ThemeWrapper>
        </ThemeProvider>
      </I18nProvider>
    </AuthProvider>
  ),
];
