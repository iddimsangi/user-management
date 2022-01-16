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
  };

  useEffect(() => {
    if (!userDetails) navigate("/login");
  }, []);
  return (
    <div>
      {userDetails && (
        <form onSubmit={onSubmithandler}>
          first name:{" "}
          <input
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={formData.firstName}
          />{" "}
          <br />
          last name:{" "}
          <input
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={formData.lastName}
          />{" "}
          <br />
          email:{" "}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={formData.email}
          />{" "}
          <br />
          password:{" "}
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={formData.password}
          />{" "}
          <br />
          active status: <input type="checkbox" /> <br />
          {message && <p>{message}</p>}
          <button>Update</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
