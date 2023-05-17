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
  GetMovieRequestAction,
  UpdateMovieRequestAction,
  DeleteMovieRequestAction,
} from "./action";
import { message } from "antd";

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);
  const [isDispatched, setIsDispatched] = useState(false);

  
  const getMovie = async () => {
    const { data: IMovie } = await useGet({
      path: "Movie/GetAll",
    });

    if (IMovie && !isDispatched) {
      console.log("index movies::", IMovie.result);
      dispatch(GetMovieRequestAction(IMovie.result));
      setIsDispatched(true);
    }
  };

  return (
    <MovieContext.Provider value={state}>
      <MovieActionContext.Provider value={{ getMovie }}>
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
