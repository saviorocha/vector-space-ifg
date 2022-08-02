import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ListContextProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ListContextProvider>
      <Component {...pageProps} />
    </ListContextProvider>
  );
}

export default MyApp;
