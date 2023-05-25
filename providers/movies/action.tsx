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
    getAllFromListRequest= 'GET_ALL_FROM_LIST',
    RateMovieRequest = 'RATE',
}

export const CreateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.CreateMovieRequest, (MovieCreated) => ({MovieCreated}));
export const GetMoviesRequestAction = createAction<IMovieStateContext, IMovie[]>(MovieActionEnum.GetMoviesRequest, (MoviesGotten) => ({MoviesGotten}));
export const UpdateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.UpdateMovieRequest, (MovieUpdated) => ({MovieUpdated}));
export const DeleteMovieRequestAction = createAction<IMovieStateContext, string>(MovieActionEnum.DeleteMovieRequest, (MovieDeletedId) => ({MovieDeletedId}));
export const SearchMovieRequestAction = createAction<IMovieStateContext, IMovie[]>(MovieActionEnum.SearchMovieRequest, (MoviesGotten) => ({MoviesGotten}));
export const FetchMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.FetchMovieRequest, (MovieFetched) => ({MovieFetched}));
export const RateMovieRequestAction = createAction<IMovieStateContext,IMovie>(MovieActionEnum.RateMovieRequest,(ratedMovie)=>({ratedMovie}));
export const addToListRequestAction = createAction<IMovieStateContext,boolean>(MovieActionEnum.addToListRequest,(MovieAddedToWatchList)=>({MovieAddedToWatchList}));
export const removeFromListRequestAction = createAction<IMovieStateContext,string>(MovieActionEnum.removeFromListRequest,(MovieDeletedFromWatchList)=>({MovieDeletedFromWatchList}));
export const getAllFromListRequestAction = createAction<IMovieStateContext,IMovie[]>(MovieActionEnum.getAllFromListRequest,(MoviesFromWatchList)=>({MoviesFromWatchList}));
