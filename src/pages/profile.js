import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { types } from "../context/types-actions";
import { useUsersDispatch, useUsersState } from "../context/users";

const Profile = ({ userDetails, userRole }) => {
  const [formData, setformData] = useState({
    firstName: userDetails?.firstName,
    lastName: userDetails?.lastName,
    email: userDetails?.email,
    password: userDetails?.password,
    active: userDetails?.active,
  });
  const navigate = useNavigate();
  const dispatch = useUsersDispatch();
  const { EDIT, DELETE } = types;
  const { message } = useUsersState();
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };
  const onSubmithandler = (e) => {
    e.preventDefault();
    dispatch({
      type: EDIT,
      payload: {
        data: {...formData, id: userDetails?.id},
        user: userDetails,
      },
    });
    navigate("/")
  };

  useEffect(() => {
    if (!userDetails) navigate("/login");
  }, []);
  return (
    <div>
      {userDetails && (
         <form onSubmit={onSubmithandler}>
         <h1>UPDATE</h1>
         <div className="icon">
           <i className="fas fa-user-circle"></i>
         </div>
         <div className="formcontainer">
         <div className="container">
         <label for="mail"><strong>First Name</strong></label>
           <input type="text"  onChange={onChangeHandler}  value={formData.firstName}  placeholder="Enter Your First Name" name="firstName" required/>
           <label for="mail"><strong>Last Name</strong></label>
           <input type="text"  onChange={onChangeHandler} value={formData.lastName}  placeholder="Enter Your Last Name" name="lastName" required/>
           <label for="mail"><strong>E-mail</strong></label>
           <input type="text"  onChange={onChangeHandler} value={formData.email}  placeholder="Enter E-mail" name="mail" required/>
           <label for="psw"><strong>Password</strong></label>
           <input type="password" onChange={onChangeHandler} value={formData.password} placeholder="Enter Password" name="psw" required/>

           <label for="#"><strong>active status:</strong></label>
           <input type="checkbox" />
         </div>
         {message&& <p style={{color:'green'}}>{message}</p>}
         <button type="submit"><strong>UPDATE</strong></button>
         </div>
       </form>

      )}
    </div>
  );
};

export default Profile;
