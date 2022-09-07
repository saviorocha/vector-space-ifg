import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ListContextProvider } from "../context";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [total, setTotal] = useState(0);
  return (
      <ListContextProvider>
        <Component {...pageProps} />
      </ListContextProvider>
  );
}

export default MyApp;
