import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUsersState } from "../context/users";
import User from "../components/user";

const Home = ({ userRole, userDetails }) => {
  const { user, users } = useUsersState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);
  return (
    <div>
      {user && userRole?.name === "admin" ? (
        users?.map((userData) => <User key={userData.id} user={userData} />)
      ) : (
        <div>{user ? <div>
            <span>
                name: {userDetails?.firstName} {userDetails?.lastName}
            </span><br />
            <span>
                email: {userDetails?.email}
            </span><br />
            <span>
                status: {userDetails?.active ? "Active" : "Inactive"}
            </span><br />
            <Link to={`/profile`}>Edit</Link>
        </div> : "Please login/register"}</div>
      )}
    </div>
  );
};

export default Home;
