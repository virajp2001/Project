import React, { useState } from "react";
import UserCard from "./components/UserCard";
import { users as userData } from "./users";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");

  const filteredUsers = userData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>User Directory</h1>

      <input
        type="text"
        placeholder="Search by name or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              name={user.name}
              role={user.role}
              location={user.location}
            />
          ))
        ) : (
          <p>No users to display.</p>
        )}
      </div>
    </div>
  );
}

export default App;
