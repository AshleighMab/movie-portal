import { MovieActionEnum } from "./action";
import { IMovie, IMovieStateContext } from "./context";

export function MovieReducer(
  incomingState: IMovieStateContext,
  action: ReduxActions.Action<IMovieStateContext>
): IMovieStateContext {
  const { type, payload } = action;

  switch (type) {
    case MovieActionEnum.CreateMovieRequest:
      return {
        ...incomingState,
        MoviesGotten: [...incomingState.MoviesGotten, payload.MovieCreated],
      };

    case MovieActionEnum.GetMoviesRequest:
      return { ...incomingState, ...payload };

    case MovieActionEnum.SearchMovieRequest:
      return { ...incomingState, ...payload };

    case MovieActionEnum.FetchMovieRequest:
      return { ...incomingState, ...payload };

    case MovieActionEnum.RateMovieRequest:
      return { ...incomingState, ...payload };

    case MovieActionEnum.UpdateMovieRequest:
      const { MovieUpdated } = payload;
      const filteredMovies = [...incomingState?.MoviesGotten].filter(
        ({ id }) => id != MovieUpdated?.id
      );
      return {
        ...incomingState,
        MoviesGotten: [...filteredMovies, MovieUpdated],
      };

    case MovieActionEnum.DeleteMovieRequest:
      const { MovieDeletedId } = payload;
      const filtered = [...incomingState?.MoviesGotten].filter(
        ({ id }) => id != MovieDeletedId
      );
      return { ...incomingState, MoviesGotten: [...filtered] };


    case MovieActionEnum.addToListRequest:
      return {
        ...incomingState,
        ...payload
      };


    case MovieActionEnum.removeFromListRequest:

    const movieToDelete = payload.MovieDeletedFromWatchList
    const updatedMovie = incomingState.MoviesFromWatchList.filter(
      (movie) => movie.id !== movieToDelete);
      return {
        ...incomingState,
        MoviesFromWatchList: updatedMovie,
    
      };

    case MovieActionEnum.getAllFromListRequest:
      return {
        ...incomingState,
        ...payload
      };


    default:
      return incomingState;
  }
}
