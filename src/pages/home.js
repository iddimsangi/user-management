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
        <div>{user ? <div style={{width:'35rem',padding:'25px', backgroundColor:'#ccc', boxShadow:'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px'}}> 
            <span>
                name: {userDetails?.firstName} {userDetails?.lastName}
            </span><br />
            <span>
                email: {userDetails?.email}
            </span><br />
            <span>
                status: {userDetails?.active ? "Active" : "Inactive"}
            </span><br />
            <Link to={`/profile`}><span style={{border:'1px solid orange',backgroundColor:'orangered', color:'whitesmoke', padding:'1px 20px', marginTop:'50px', textDecoration:'none'}}>Edit</span></Link>
        </div> : "Please login/register"}</div>
      )}
    </div>
  );
};

export default Home;
// box-shadow: ;