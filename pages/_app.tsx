import "../styles/globals.css";
import type { AppProps } from "next/app";
import { D3ContextProvider, ListContextProvider } from "../context";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ListContextProvider>
      <D3ContextProvider>
        <Component {...pageProps} />
      </D3ContextProvider>
    </ListContextProvider>
  );
}

export default MyApp;
