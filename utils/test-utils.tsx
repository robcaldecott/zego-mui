import { ReactElement, ReactNode } from "react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { en } from "make-plural/plurals";
import { ThemeProvider } from "@/providers";

i18n.loadLocaleData("en-GB", { plurals: en });
i18n.load("en-GB", {});
i18n.activate("en-GB");

const Providers = ({ children }: { children: ReactNode }) => (
  <I18nProvider i18n={i18n}>
    <ThemeProvider>{children}</ThemeProvider>
  </I18nProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

// export userEvent
export { userEvent };
