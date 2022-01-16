import { createContext, useContext, useReducer } from "react";
import { types } from "./types-actions";
const UserContext = createContext();
const DispatchContext = createContext();

const reducer = (state, { type, payload }) => {
  const { LOGIN, REGISTER, LOGOUT, EDIT, DELETE } = types;
  let usersCopy;
  let userData
  let data
  let role
  switch (type) {
    case LOGIN:
      let user = state.users.find(
        ({ email, password, active }) =>
          email === payload.email && password === payload.password && active
      );
      return {
        ...state,
        user: user ? user.id : null,
        message: user ? "" : "Invalid credentials",
      };
    case REGISTER:
      if (state.users.find(({ email }) => email === payload.email)) {
        return {
          ...state,
          message: "Email already regisered",
        };
      } else {
          usersCopy = [payload, ...state.users]
        return {
            ...state,
            users: usersCopy,
            message: "",
            user: payload?.id
        }
      }
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    case DELETE:
      userData = payload.user
      data = payload.data
      role = payload.role
      if(userData?.id === data?.id || role === "admin" || role === "moderator" ) {
        usersCopy = [...state.users]
        usersCopy = usersCopy.filter(el => el.id !== data.id)
        return {
          ...state,
          user: userData.id === data.id ? null : state.user,
          users: usersCopy,
          message: "user deleted successfully"
        }
      } else {
        return {
          ...state,
          message: "unauthorized"
        }
      }
    case EDIT:
      userData = payload.user
      data = payload.data
      role = payload?.role
      usersCopy = [...state.users]
      let userIndex = usersCopy?.findIndex(el => el.id === data.id)
      let userObj = usersCopy?.find(el => el.id === data.id)
      if(userData?.id === data?.id && userIndex >= 0  ) {
        usersCopy[userIndex] = {
          ...data,
          role: userObj?.role
        }
        return {
          ...state,
          users: usersCopy,
          message: "user updated successfully"
        }
      } else if((role === "admin" || role === "moderator") && userIndex >= 0) {
        usersCopy[userIndex] = {
          ...userObj,
          role: data?.role
        }
        return {
          ...state,
          users: usersCopy,
          message: "user updated successfully"
        }
      } else {
        return {
          ...state,
          message: "unauthorized"
        }
      }
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    message: "",
    users: [
      {
        id: new Date().getTime(),
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@email.com",
        password: "admin",
        active: true,
        role: 1,
      },
    ],
    roles: [
      { id: 1, name: "admin" },
      { id: 2, name: "moderator" },
    ],
  });
  return (
    <DispatchContext.Provider value={dispatch}>
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useUsersDispatch = () => useContext(DispatchContext);
export const useUsersState = () => useContext(UserContext);
