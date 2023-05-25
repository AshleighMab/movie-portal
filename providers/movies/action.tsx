import { createAction } from 'redux-actions'
import { IMovieStateContext, IMovie } from "./context";

export enum MovieActionEnum{
    CreateMovieRequest = 'CREATE',
    GetMoviesRequest = 'GET_MOVIES',
    UpdateMovieRequest = 'UPDATE',
    DeleteMovieRequest = 'DELETE',   
    SearchMovieRequest ='SEARCH',
    FetchMovieRequest = 'FETCH',
    addToListRequest= 'ADD_TO_LIST',
    removeFromListRequest= 'REMOVE_FROM_LIST',
    clearListRequest= 'CLEAR_LIST',
    RateMovieRequest = 'RATE',
}

export const CreateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.CreateMovieRequest, (MovieCreated) => ({MovieCreated}));
export const GetMoviesRequestAction = createAction<IMovieStateContext, IMovie[]>(MovieActionEnum.GetMoviesRequest, (MoviesGotten) => ({MoviesGotten}));
export const UpdateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.UpdateMovieRequest, (MovieUpdated) => ({MovieUpdated}));
export const DeleteMovieRequestAction = createAction<IMovieStateContext, string>(MovieActionEnum.DeleteMovieRequest, (MovieDeletedId) => ({MovieDeletedId}));
export const SearchMovieRequestAction = createAction<IMovieStateContext, IMovie[]>(MovieActionEnum.SearchMovieRequest, (MoviesGotten) => ({MoviesGotten}));
export const FetchMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.FetchMovieRequest, (MovieFetched) => ({MovieFetched}));
export const addToListRequestAction = createAction<IMovieStateContext,IMovie>(MovieActionEnum.addToListRequest,(WatchListMovie)=>({WatchListMovie}));
export const removeFromListRequestAction = createAction<IMovieStateContext,IMovie>(MovieActionEnum.removeFromListRequest,(WatchListMovie)=>({WatchListMovie}));
export const clearListRequestAction = createAction<IMovieStateContext>(MovieActionEnum.clearListRequest,()=>({WatchListMovie: {}}));
export const RateMovieRequestAction = createAction<IMovieStateContext,IMovie>(MovieActionEnum.RateMovieRequest,(ratedMovie)=>({ratedMovie}));
