import React from "react";
import { RestfulProvider } from "restful-react";
import { AppProps } from "next/app";
import { MovieProvider } from "../providers/movies";
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RestfulProvider base="https://localhost:44311/api/services/app/">
        <MovieProvider>
          <Component {...pageProps} />
        </MovieProvider>
      </RestfulProvider>
    </>
  );
}
export default MyApp;
