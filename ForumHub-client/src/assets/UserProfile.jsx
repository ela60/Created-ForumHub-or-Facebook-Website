// src/UserProfile.js
import React from "react";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="user-profile">
      <h2>{user.username}'s Profile</h2>
      <p>Membership Status: {user.isMember ? `Member (${user.badge} Badge)` : "Not a member"}</p>
    </div>
  );
};

export default UserProfile;
