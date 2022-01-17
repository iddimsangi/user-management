import React from "react";
import profile from "../img/prfile.png"
const User = () => {
  return (
    <div>
      <div class="card">
        <img src={profile} alt="Avatar" style="width:100%" />
        <div class="container">
          <h4>
            <b>John Doe</b>
          </h4>
          <p>Architect & Engineer</p>
        </div>
      </div>
    </div>
  );
};

export default User;
