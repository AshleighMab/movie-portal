import {createContext} from 'react';

export interface IUser{
Username :string;
Name: string;
LastName: string;
Password: string;
PhoneNumber: string;
EmailAddress: string;
Gender: string;    
}

export interface ILogin{  
    Password: string; 
    EmailAddress: string;   
}

export interface IUserStateContext{
    readonly UserCreated?: IUser;
    readonly Login?: ILogin;
    readonly UserInfo?:IUser;
}


export const INITIAL_STATE: IUserStateContext = {}

export interface IUserActionContext{
    createUser?:(payload:IUser)=> void;
    login?:(payload:ILogin)=>void;
    getUserInfo?: (payload:number) => void;
}

const UserContext = createContext<IUserStateContext>(INITIAL_STATE);

const UserActionContext = createContext<IUserActionContext>({});

export {UserContext, UserActionContext}; 