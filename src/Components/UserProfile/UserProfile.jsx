import React from 'react';
import './UserProfile.css'; // Ensure you have the corresponding styles

const UserProfile = ({ user, onSignOut }) => {
  return (
    <div className="userProfileDrawer">
      <h1>{user.username}</h1>
      {/* Display more user details here if needed */}
      <button className="signOutBtn" onClick={onSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;
