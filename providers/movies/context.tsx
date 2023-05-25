import { createContext } from 'react'

export interface IMovie {
    find?: any
    id?:string
    title?: string
    duration?: string
    description?: string
    starring?: string
    category?: string
    image?:string
    link?:string
    trailer?:string
    rating?:number
    totalpeople?:number
    creationTime?:Date
}

export interface IMovieStateContext{
  readonly MovieCreated?: IMovie
  readonly MoviesGotten?: IMovie[]
  readonly MovieUpdated?: IMovie
  readonly MovieFetched?: IMovie
  readonly MovieDeletedId?: string
  readonly MovieSearched?: IMovie[]
  readonly isDefault?: boolean
  readonly ratedMovie?: IMovie
  readonly WatchListMovie?: IMovie
  readonly WatchList?: IMovie[]
 
}

export const INITIAL_STATE: IMovieStateContext = {
  MoviesGotten:[],
  WatchListMovie:{},
  WatchList:[],
}

export interface IMovieActionContext{
    createMovie?:(payload:IMovie)=>void;
    getMovies?: () => void;
    updateMovie?: (payload:IMovie) => void;
    deleteMovie?: (payload:string) => void;
    searchMovie?: (payload:string) => void;
    fetchMovie?: (payload:string) => void;
    addToList?: (payload:IMovie) => void;
    removeFromList?: (payload:IMovie) => void;
    clearList?: () => void;
    rateMovie?: (payload:IMovie) => void;
}

const MovieContext = createContext<IMovieStateContext>({});
const MovieActionContext = createContext<IMovieActionContext>({});

export {MovieContext, MovieActionContext}