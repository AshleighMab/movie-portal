import React from "react";
import { RestfulProvider } from "restful-react";
import { AppProps } from "next/app";
import { MovieProvider } from "../providers/movies";
import '../styles/globals.css';
import { UserProvider } from "../providers/users";
import BadgeIcon from "../components/BadgeIcon";


function MyApp({ Component, pageProps }: AppProps) {
  const token = () => {
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('token');
        return token;
    }
    return null;
}
  return (
    <>
      <RestfulProvider base="https://localhost:44311/api/"  
      requestOptions={{
        headers: {
            authorization: `Bearer ${token()}`,
        },
    }}
      >    
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