import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendInterest = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users', error);
      });
  }, []);

  const handleSendInterest = () => {
    axios.post('http://localhost:8000/api/interests/', { recipient: selectedUser })
      .then(response => {
        console.log('Interest sent', response.data);
      })
      .catch(error => {
        console.error('Error sending interest', error);
      });
  };

  return (
    <div>
      <h1>Send Interest</h1>
      <select onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select a user</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.username}</option>
        ))}
      </select>
      <button onClick={handleSendInterest}>Send Interest</button>
    </div>
  );
};

export default SendInterest;
