import React from "react";
import { RestfulProvider } from "restful-react";
import { AppProps } from "next/app";
import { MovieProvider } from "../providers/movies";
import '../styles/globals.css';
import { UserProvider } from "../providers/users";
import { Layout } from "antd";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RestfulProvider base="https://localhost:44311/api/services/app/">    
        <UserProvider>        
        <MovieProvider>
          <Component {...pageProps} />
        </MovieProvider>
        </UserProvider>
      </RestfulProvider>
    </>
  );
}

export default MyApp;
