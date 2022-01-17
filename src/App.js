import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// pages
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import User from "./pages/user";
import Profile from "./pages/profile";

// state
import { useUsersState, useUsersDispatch } from "./context/users";
import { types } from "./context/types-actions";

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [userRole, setuserRole] = useState(null);
  const { user, users, roles } = useUsersState();
  const dispatch = useUsersDispatch();
  const { LOGOUT } = types;
  useEffect(() => {
    setUserDetails(users.find((el) => el.id === user));
  }, [user, users]);
  useEffect(() => {
    if (userDetails)
      setuserRole(roles.find((el) => el.id === userDetails?.role));
  }, [userDetails]);
  return (
    <div>
      <BrowserRouter>
        {user ? (
          <h1>
            {userDetails && (
              <span>
                Hello <Link to="/users">{userDetails?.firstName}</Link>
              </span>
            )}
            
            &nbsp;
            <button
              onClick={() => {
                dispatch({
                  type: LOGOUT,
                });
                setUserDetails(null);
              }}
            >
              Logout
            </button>
          </h1>
        ) : (
          <div>
            <Link to="/login">Login</Link>&nbsp;
            <Link to="/register">Register</Link>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            exact
            element={<Home userRole={userRole} userDetails={userDetails} />}
          />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/users" exact element={<User />} />
          <Route
            path="/profile"
            exact
            element={<Profile userDetails={userDetails} userRole={userRole} />}
          />
          <Route element={<div>404 ERROR page</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
