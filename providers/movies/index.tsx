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
} from "./context";
import {
  GetMoviesRequestAction,
  FetchMovieRequestAction,
  SearchMovieRequestAction,
  addToListRequestAction,
  removeFromListRequestAction,
  clearListRequestAction,
  RateMovieRequestAction

  //  setIsDefaultRequestAction,

} from "./action";
import { message } from "antd";

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);
  const [isDispatched, setIsDispatched] = useState(false);

  // const {refetch:getMovieById,error:movieByIDError,loading:isFetchingMovie,data:IMovie}=useGet({path:'/Movie/Get'})


  // const fetchMovie =  (movieId: string) => {
  //   getMovieById({queryParams:{id:movieId}}) 
  //    dispatch(FetchMovieRequestAction(IMovie?.result));           
  // };


  const getMovies = async () => {
    // dispatch(setIsDefaultRequestAction(true));
    const { data: IMovie } = await useGet({
      path: "Movie/GetAll",
    });

    if (IMovie && !isDispatched) {
      console.log("index movies::", IMovie.result);
      dispatch(GetMoviesRequestAction(IMovie.result));
      setIsDispatched(true);
    }
  };

  const {mutate: rateHttp} = useMutate({
    verb: 'POST',
    path: `Movie/AddRating`,
  });

const rateMovie = async (payload: IMovie) => {
    dispatch(RateMovieRequestAction(payload));
    rateHttp(payload)
  };
  
      const searchMovie = async (searchItem: string) => {
        //  dispatch(setIsDefaultRequestAction(false));
       await fetch(`https://localhost:44311/api/services/app/Movie/Search?searchTerm=${searchItem}`, {
                method: 'GET',
                cache: "no-cache",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => {
                res.json().then(data => {
                    dispatch(SearchMovieRequestAction(data.result));
                    console.log("Something::", data)
                })
            })
        };

        const addToList = (movie: IMovie) => {
      
          dispatch(addToListRequestAction(movie))          
      };
  
      const removeFromList = (movie: IMovie) => {
          dispatch(removeFromListRequestAction(movie))        
      }
  
      const clearList =()=>{
          dispatch(clearListRequestAction())
      }
    
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
      <MovieActionContext.Provider value={{ getMovies, searchMovie, addToList, removeFromList, clearList, rateMovie}}>
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