// components/UserCard.jsx
import React from 'react';
import './UserCard.css';

const UserCard = ({ name, role, location }) => {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{location}</p>
      <button>Contact</button>
    </div>
  );
};

export default UserCard;
