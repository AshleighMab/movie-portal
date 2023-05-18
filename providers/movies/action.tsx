import { createAction } from 'redux-actions'
import { IMovieStateContext, IMovie } from "./context";

export enum MovieActionEnum{
    CreateMovieRequest = 'CREATE',
    GetMoviesRequest = 'GET_MOVIES',
    UpdateMovieRequest = 'UPDATE',
    DeleteMovieRequest = 'DELETE',
    SearchMovieRequest ='SEARCH',
    FetchMovieRequest = 'FETCH'
}

export const CreateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.CreateMovieRequest, (MovieCreated) => ({MovieCreated}));
export const GetMoviesRequestAction = createAction<IMovieStateContext, IMovie[]>(MovieActionEnum.GetMoviesRequest, (MoviesGotten) => ({MoviesGotten}));
export const UpdateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.UpdateMovieRequest, (MovieUpdated) => ({MovieUpdated}));
export const DeleteMovieRequestAction = createAction<IMovieStateContext, string>(MovieActionEnum.DeleteMovieRequest, (MovieDeletedId) => ({MovieDeletedId}));
export const SearchMovieRequestAction = createAction<IMovieStateContext, IMovie[]>(MovieActionEnum.SearchMovieRequest, (MoviesGotten) => ({MoviesGotten}));
export const FetchMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.FetchMovieRequest, (MovieFetched) => ({MovieFetched}));
