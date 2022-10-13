import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
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
          <ThemeProvider attribute="class" defaultTheme="light">
            <Component {...pageProps} />
          </ThemeProvider>
        </D3ContextProvider>
      </NameContextProvider>
    </ListContextProvider>
  );
}

export default MyApp;
