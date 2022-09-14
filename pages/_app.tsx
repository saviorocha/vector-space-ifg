import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  D3ContextProvider,
  ListContextProvider,
  NameContextProvider,
} from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ListContextProvider>
      <NameContextProvider>
        <D3ContextProvider>
          <Component {...pageProps} />
        </D3ContextProvider>
      </NameContextProvider>
    </ListContextProvider>
  );
}

export default MyApp;
