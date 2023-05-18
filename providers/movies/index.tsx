import React, {
  PropsWithChildren,
  useReducer,
  useContext,
  FC,
  useState,
} from "react";
import { MovieReducer } from "./reducer";
import { useGet } from "restful-react";
import {
  IMovie,
  INITIAL_STATE,
  MovieContext,
  MovieActionContext,
} from "./context";
import {
  CreateMovieRequestAction,
  SearchMovieRequestAction,
  GetMoviesRequestAction,
  UpdateMovieRequestAction,
  DeleteMovieRequestAction,
  FetchMovieRequestAction,
} from "./action";
import { message } from "antd";

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);
  const [isDispatched, setIsDispatched] = useState(false);

  
  const getMovies = async () => {
    const { data: IMovie } = await useGet({
      path: "Movie/GetAll",
    });

    if (IMovie && !isDispatched) {
      console.log("index movies::", IMovie.result);
      dispatch(GetMoviesRequestAction(IMovie.result));
      setIsDispatched(true);
    }
  };

  const fetchedMovie = async (payload: IMovie) => {
    await fetch(`https://localhost:44311/api/services/app/Movie/Get?id=${payload.id}`, {
    method: 'GET',
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                res.json().then(data => {
                    dispatch(FetchMovieRequestAction(data.result));
                    console.log("Something::", data)
                })
            })
        };



  // const fetchedMovie = async (id) => {
  //   const { data, loading, error } = useGet(`Movie/Get/${id}`);
  
  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }
  
  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   }
  
  //   return dispatch(FetchMovieRequestAction(data.result));
  // };

  return (
    <MovieContext.Provider value={state}>
      <MovieActionContext.Provider value={{ getMovies, fetchedMovie}}>
        {children}
      </MovieActionContext.Provider>
    </MovieContext.Provider>
  );
};

function useMovieState() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error(`useState must be used within an AuthProvider`);
  }
  return context;
}

function useMovieActionState() {
  const context = useContext(MovieActionContext);
  if (!context) {
    throw new Error(`useMovieActions must be used within an AuthProvider`);
  }
  return context;
}

function useMovies() {
  return {
    ...useMovieState(),
    ...useMovieActionState(),
  };
}

export { useMovies, MovieProvider };
