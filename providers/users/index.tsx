import React, { PropsWithChildren, useReducer, useContext, FC } from 'react';
import { UserReducer } from './reducer';
import { IUser, INITIAL_STATE, UserContext, UserActionContext, ILogin } from './context';
import { CreateUserRequestAction, LoginRequestAction } from './action';


const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

    const createUser = async (payload: IUser) => {
        await fetch('https://localhost:44311/api/services/app/Person/Create', {

            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(payload),
        }).then(res => {
            res.json().then(data => {
                dispatch(CreateUserRequestAction(data.request))
                if (res.status === 200) {
                    console.log(res.status)
                    window.location.href='/'
                }
            })
        })        
    }


    const login = async (payload: ILogin) => {
        await fetch('https://localhost:44311/api/TokenAuth/Authenticate', {

            method: 'POST',
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then(res => {
            res.json().then(data => {
                localStorage.setItem('token', data.result.accessToken);
                dispatch(LoginRequestAction(data.request))
                if (res.status ==  200) {
                    console.log(res.status)
                    window.location.href='/movies'
                }
            })
        })        
    }

    return (
        <UserContext.Provider value={state}>
            <UserActionContext.Provider value={{ createUser, login}}>      
                {children}
            </UserActionContext.Provider>
        </UserContext.Provider>

    )
}

function useUserState() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(`useAutheActions must be used within an AuthProvider`)
    }
    return context;
}

function useUserActionState() {
    const context = useContext(UserActionContext);
    if (!context) {
        throw new Error(`useAutheActions must be used within an AuthProvider`)
    }
    return context;
}

function useUsers() {
    return {
        ...useUserState(),
        ...useUserActionState(),
    }
}

export { useUsers, UserProvider }