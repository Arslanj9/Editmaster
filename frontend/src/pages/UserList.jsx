import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../utils/api';
import './UserList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getAllUsers(token);
        setUsers(response);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="user-list-container ">
      <h2>All Users</h2>
      <ul className="user-list list-group mt-4 w-75 m-auto">
        {users.map((user, index) => (
          <li key={user._id} className={`text-start list-group-item ${index % 2 === 0 ? 'list-group-item-primary' : ''}`}>
            {user.name} - {user.email}
            {user.role === 'admin' && <span> (Admin)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
