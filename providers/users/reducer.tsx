import { UserActionEnum } from "./action";
import { IUserStateContext } from "./context";


export function UserReducer(incomingState: IUserStateContext, action:ReduxActions.Action<IUserStateContext>): IUserStateContext{
    const{type, payload} =action;

    switch(type){
case UserActionEnum.CreateUserRequest:
    return{...incomingState, ...payload};


    case UserActionEnum.LoginRequest:
        return{...incomingState, ...payload}
    default:
        return incomingState
    }
}
