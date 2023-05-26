import React, {
  PropsWithChildren,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { MovieReducer } from "./reducer";
import { useGet, useMutate } from "restful-react";
import {
  INITIAL_STATE,
  MovieContext,
  MovieActionContext,
  IMovie,
  IMovieIdDto,
} from "./context";
import {
  GetMoviesRequestAction,
  FetchMovieRequestAction,
  SearchMovieRequestAction,
  addToListRequestAction,
  removeFromListRequestAction,
  RateMovieRequestAction,
  DeleteMovieRequestAction,
  getAllFromListRequestAction,
} from "./action";
import { message } from "antd";

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);
  const [isDispatched, setIsDispatched] = useState(false);
  const [watchlist, setWatchlist] = useState<IMovie[]>([]);

  const {
    refetch: getAllMoviesIndex,
    error: allMoviesError,
    loading: isLoadingMovies,
    data: movies,
  } = useGet({
    path: "services/app/Movie/GetAll",
    lazy: true,
  });

  useEffect(() => {
    if (!isLoadingMovies && movies) {
      console.log("all movies::", movies.result);
      dispatch(GetMoviesRequestAction(movies.result));
    } else if (allMoviesError) {
      console.log("Error all movies::", allMoviesError);
    }
  }, [getAllMoviesIndex, allMoviesError, isLoadingMovies]);

  const getMovies = () => {
    getAllMoviesIndex();
  };

  // const { refetch: getAllMovies, data: IMovie } = useGet({
  //   path: "services/app/Movie/GetAll",
  // });

  // const getMovies = () => {
  //   if (IMovie && !isDispatched) {
  //     console.log("index movies::", IMovie.result);

  //     setIsDispatched(true);
  //   }
  // };

  const { mutate: rateHttp } = useMutate({
    verb: "POST",
    path: `services/app/Movie/AddRating`,
  });

  const rateMovie = async (payload: IMovie) => {
    dispatch(RateMovieRequestAction(payload));
    rateHttp(payload);
  };

  // const {refetch:getMovieById,error:movieByIDError,loading:isFetchingMovie,data:IMovie}=useGet({path:'/Movie/Get'})

  // const fetchMovie =  (movieId: string) => {
  //   getMovieById({queryParams:{id:movieId}})
  //    dispatch(FetchMovieRequestAction(IMovie?.result));
  // };

  const searchMovie = async (searchItem: string) => {
    await fetch(
      `https://localhost:44311/api/services/app/Movie/Search?searchTerm=${searchItem}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        dispatch(SearchMovieRequestAction(data.result));
        console.log("Something::", data);
      });
    });
  };

  //gettting all the movies from a watchlist
  const {
    refetch: getAllMovies,
    error: allMoviesErrors,
    loading: isLoadingWatchListMovies,
    data: watchlistMovies,
  } = useGet({
    path: "services/app/WatchList/GetAllMoviesFromUserList",
    lazy: true,
  });

  useEffect(() => {
    if (!isLoadingWatchListMovies && watchlistMovies) {
      console.log("watchlistMovies::", watchlistMovies);
      dispatch(getAllFromListRequestAction(watchlistMovies.result));
    } else if (allMoviesErrors) {
      console.log("Error person::", allMoviesErrors);
    }
  }, [getAllMovies, allMoviesErrors, isLoadingWatchListMovies]);

  const getAllFromList = () => {
    getAllMovies();
  };

  //add a movie to the watchlist
  const { mutate: addMovietoList, error: addMovieError } = useMutate({
    verb: "POST",
    path: "services/app/WatchList/AddMovieToPersonUsingToken",
  });

  const addToList = (payload: IMovieIdDto) => {
    console.log("watchlist create::", payload);
    addMovietoList(payload).then((res) => {
      if (res.success) {
        console.log("add to watchlist::", res);
        dispatch(addToListRequestAction(payload.movieId));
        message.success("Movie added to the watchlist");
      } else if (addMovieError) {
        message.error("Can't add to watchlist");
      }
    });
  };

  const removeFromList = async (payload: string) => {
    await fetch(
      `https://localhost:44311/api/services/app/WatchList/DeleteMovieFromWatchlist?movieId=${payload}`,
      {
        method: "DELETE",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      res.json().then((data) => {
        if (data.success) {
          console.log('DeleteMovieRequestAction', payload)
          dispatch(removeFromListRequestAction(payload));
          message.success("Movie deleted from watchlist");
          console.log("Something::", data);
        } else if (!data.success) {
          message.error("Can't remove movie");
        }
      });
    });
  };

  return (
    <MovieContext.Provider value={state}>
      <MovieActionContext.Provider
        value={{
          getMovies,
          searchMovie,
          addToList,
          getAllFromList,
          rateMovie,
          removeFromList,
        }}
      >
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
