"use client";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "./config/theme";
import createEmotionCache from "./config/createEmotionCache";
import Home from "./pages/home";
import { FipeProvider } from "./store/FipeStore";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();


export default function Page() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <FipeProvider>
          <CssBaseline />
          <Home />
        </FipeProvider>
      </ThemeProvider>
    </>
  );
}
