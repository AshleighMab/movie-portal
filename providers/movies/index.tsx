import React, {
  PropsWithChildren,
  useReducer,
  useContext,
  useEffect,
  useState,
} from "react";
import { MovieReducer } from "./reducer";
import { useGet } from "restful-react";
import {
  INITIAL_STATE,
  MovieContext,
  MovieActionContext,
} from "./context";
import {
  GetMoviesRequestAction,
  FetchMovieRequestAction,
  SearchMovieRequestAction,

} from "./action";
import { message } from "antd";

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);
  const [isDispatched, setIsDispatched] = useState(false);

  const {refetch:getMovieById,error:movieByIDError,loading:isFetchingMovie,data:IMovie}=useGet({path:'/Movie/Get'})


  const fetchedMovie =  (movieId: string) => {
    getMovieById({queryParams:{id:movieId}}) 
    dispatch(SearchMovieRequestAction(IMovie?.result));           
  };


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

  // const {refetch:searchForMovie,error:searchError,loading:isSearchingMovie,data:SearchMovie}=useGet({path:'Movie/Search'})

  // useEffect(()=>{
  //     console.log("Searchresult::",SearchMovie)
  //       dispatch(SearchMovieRequestAction(SearchMovie));        
      
  // },[SearchMovie,isSearchingMovie,searchError])

  // const searchMovie =  (searchTerm: string) => {
  //   searchForMovie({queryParams:{searchTerm}})    
  // };


  // const searchMovie = async (searchItem: string) => {
  //   const url = `${localhost}/api/services/app/Movie/Search?searchTerm=${searchItem}`;
  //   const result = await callApi(url, 'GET');
  //   if (result) {
  //     dispatch(SearchMovieRequestAction(result));
  //     console.log("Searched:", result);
  //   }
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