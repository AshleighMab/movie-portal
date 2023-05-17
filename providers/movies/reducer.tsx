import { MovieActionEnum } from "./action";
import { IMovieStateContext } from "./context";

export function MovieReducer(incomingState: IMovieStateContext, action: ReduxActions.Action<IMovieStateContext>): IMovieStateContext {

    const { type, payload } = action;

    switch (type) {
        case MovieActionEnum.CreateMovieRequest:
            return { ...incomingState, MovieGotten:[...incomingState.MovieGotten, payload.MovieCreated] };

        case MovieActionEnum.GetMovieRequest:
            return { ...incomingState, ...payload };

            case MovieActionEnum.SearchMovieRequest:
                return { ...incomingState, ...payload };

        case MovieActionEnum.UpdateMovieRequest:
            const {MovieUpdated}=payload;
            const filteredMovies=[...incomingState?.MovieGotten].filter(({id})=>id!=MovieUpdated?.id)
            return { ...incomingState, MovieGotten:[...filteredMovies, MovieUpdated]};

        case MovieActionEnum.DeleteMovieRequest:
            const {MovieDeletedId}=payload;
            const filtered=[...incomingState?.MovieGotten].filter(({id})=>id!=MovieDeletedId)
            return { ...incomingState, MovieGotten:[...filtered]};
          
        default:
            return incomingState
    }
}



