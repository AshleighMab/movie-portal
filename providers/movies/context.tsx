import { createContext } from 'react'

export interface IMovie {
    id?:string
    title: string
    duration: string
    description: string
    starring: string
    category: string
    image:string
    link:string
}

export interface IMovieStateContext{
  readonly MovieCreated?: IMovie
  readonly MoviesGotten?: IMovie[]
  readonly MovieUpdated?: IMovie
  readonly MovieFetched?: IMovie
  readonly MovieDeletedId?: string
  readonly MovieSearched?: IMovie[]
 
}

export const INITIAL_STATE: IMovieStateContext = {
  MoviesGotten:[]
}

export interface IMovieActionContext{
    createMovie?:(payload:IMovie)=>void;
    getMovies?: () => void;
    updateMovie?: (payload:IMovie) => void;
    deleteMovie?: (payload:string) => void;
    searchMovie?: (payload:string) => void;
    fetchedMovie?: (payload:IMovie) => void;
}

const MovieContext = createContext<IMovieStateContext>(INITIAL_STATE);
const MovieActionContext = createContext<IMovieActionContext>({});

export {MovieContext, MovieActionContext}