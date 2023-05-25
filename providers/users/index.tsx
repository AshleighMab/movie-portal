import React, { useReducer, useContext, useEffect } from "react";
import { UserReducer } from "./reducer";
import {
  IUser,
  INITIAL_STATE,
  UserContext,
  UserActionContext,
  ILogin,
} from "./context";
import { CreateUserRequestAction, LoginRequestAction } from "./action";
import { useGet, useMutate } from "restful-react";
import { message } from "antd";

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const { mutate: loginUserHttp } = useMutate({
    path: "/TokenAuth/Authenticate",
    verb: "POST",
  });

  const login = (payload: ILogin) => {
    loginUserHttp(payload)
      .then((res) => {
        localStorage.setItem("token", res.result.accessToken);
        getUserInfo(res.result.userId);
        dispatch(LoginRequestAction(res.request));
        window.location.href = "/home";
      })
      .catch(({ message: Error }) => {
        message.error(Error, 2);
      });
  };

  const {
    refetch: getPersonById,
    error: personByIdError,
    loading: isLoadingPerson,
    data: person,
  } = useGet({
    path: "services/app/Person/Get",
  });

  useEffect(() => {
    if (!isLoadingPerson && person?.id) {
      console.log("person::", person);
    } else if (personByIdError) {
      console.log("Error person::", personByIdError);
    }
  }, [getPersonById, personByIdError, isLoadingPerson]);

  const getUserInfo = (id: number) => {
    getPersonById({ queryParams: { id: id } }).then((data) => {
      console.log("userD::", data.result);
      localStorage.setItem("userDetails", JSON.stringify(data.result));
    });
  };

  const createUser = async (payload: IUser) => {
    await fetch("https://localhost:44311/api/services/app/Person/Create", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      res.json().then((data) => {
        dispatch(CreateUserRequestAction(data.request));
        if (res.status === 200) {
          console.log(res.status);
          window.location.href = "/";
        }
      });
    });
  };
  // const { mutate: createUserHttp } = useMutate({
  //     path: "services/app/Person/Create",
  //     verb: "POST",
  //   });

  //   const createUser = (payload: IUser) => {
  //     createUserHttp(payload)
  //       .then(res => {
  //             dispatch(CreateUserRequestAction(res.request))
  //         window.location.href='/'
  //       })
  //       .catch(({ message: Error }) => {
  //         message.error(Error, 2);
  //       });
  //   };

  //   https://localhost:44311/api/services/app/Person/Create

  return (
    <UserContext.Provider value={state}>
      <UserActionContext.Provider value={{ createUser, login, getUserInfo }}>
        {children}
      </UserActionContext.Provider>
    </UserContext.Provider>
  );
};

function useUserState() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useAutheActions must be used within an AuthProvider`);
  }
  return context;
}

function useUserActionState() {
  const context = useContext(UserActionContext);
  if (!context) {
    throw new Error(`useAutheActions must be used within an AuthProvider`);
  }
  return context;
}

function useUsers() {
  return {
    ...useUserState(),
    ...useUserActionState(),
  };
}

export { useUsers, UserProvider };
