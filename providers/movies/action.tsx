import { createAction } from 'redux-actions'
import { IMovieStateContext, IMovie } from "./context";

export enum MovieActionEnum{
    CreateMovieRequest = 'CREATE',
    GetMovieRequest = 'GET',
    UpdateMovieRequest = 'UPDATE',
    DeleteMovieRequest = 'DELETE',
    SearchMovieRequest ='SEARCH'
}

export const CreateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.CreateMovieRequest, (MovieCreated) => ({MovieCreated}));
export const GetMovieRequestAction = createAction<IMovieStateContext, IMovie[]>(MovieActionEnum.GetMovieRequest, (MovieGotten) => ({MovieGotten}));
export const UpdateMovieRequestAction = createAction<IMovieStateContext, IMovie>(MovieActionEnum.UpdateMovieRequest, (MovieUpdated) => ({MovieUpdated}));
export const DeleteMovieRequestAction = createAction<IMovieStateContext, string>(MovieActionEnum.DeleteMovieRequest, (MovieDeletedId) => ({MovieDeletedId}));
export const SearchMovieRequestAction = createAction<IMovieStateContext, IMovie[]>(MovieActionEnum.SearchMovieRequest, (MovieGotten) => ({MovieGotten}));
