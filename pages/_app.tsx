import { CacheProvider, EmotionCache } from "@emotion/react";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { en } from "make-plural/plurals";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { AppShell } from "@/components";
import { AuthProvider, FilterProvider, ThemeProvider } from "@/providers";
import { createEmotionCache } from "@/utils";
import "../styles/globals.css";

// Mock the API
require("../mocks");

i18n.loadLocaleData("en-GB", { plurals: en });
i18n.load("en-GB", {});
i18n.activate("en-GB");

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  Component: NextPage & { useLayout: boolean };
  emotionCache?: EmotionCache;
}

const Myapp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  const getAppShell = Component.useLayout ?? true;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider>
        <I18nProvider i18n={i18n}>
          <AuthProvider>
            <FilterProvider>
              {getAppShell ? (
                <AppShell>
                  <Component {...pageProps} />
                </AppShell>
              ) : (
                <Component {...pageProps} />
              )}
            </FilterProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default Myapp;
