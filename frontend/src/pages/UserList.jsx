import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../utils/api';
import './UserList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user-list-container">
      <h2>All Users</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            {user.role === 'admin' && <span> (Admin)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
