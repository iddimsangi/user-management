import React,{ useState, useEffect } from "react";
import profile from "../img/prfile.png"
import { useUsersState } from "../context/users";
const User = () => {
  const { user, users } = useUsersState();
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    setUserDetails(users.find((el) => el.id === user));
  }, [user, users]);
  return (
    <div>
      <div class="card">
        <img src={profile} alt="Avatar" style={{width:"100%"}}/>
        <div class="container">
          <h4>
            <b>{userDetails?.firstName}</b>
          </h4>
          <p>{userDetails?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default User;
