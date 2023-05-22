import { createAction } from 'redux-actions'
import {IUser, IUserStateContext , ILogin} from "./context";


export enum UserActionEnum{
    CreateUserRequest = 'CREATE',
    LoginRequest = 'LOGIN',
    UserInfoRequest = 'USER_INFORMATION'
}

export const CreateUserRequestAction = createAction<IUserStateContext, IUser>(UserActionEnum.CreateUserRequest, (UserCreated) => ({UserCreated}));

export const LoginRequestAction = createAction<IUserStateContext, ILogin>(UserActionEnum.LoginRequest, (Login) => ({Login}));
export const UserInfoRequestAction = createAction<IUserStateContext, IUser>(UserActionEnum.UserInfoRequest, (UserInfo) => ({UserInfo}));
