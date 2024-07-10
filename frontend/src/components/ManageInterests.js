import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageInterests = () => {
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/interests/')
      .then(response => {
        setInterests(response.data);
      })
      .catch(error => {
        console.error('Error fetching interests', error);
      });
  }, []);

  const handleAction = (id, action) => {
    axios.post(`http://localhost:8000/api/interests/${id}/${action}/`)
      .then(response => {
        console.log('Interest action completed', response.data);
        setInterests(interests.filter(interest => interest.id !== id));
      })
      .catch(error => {
        console.error('Error performing action', error);
      });
  };

  return (
    <div>
      <h1>Manage Interests</h1>
      <ul>
        {interests.map(interest => (
          <li key={interest.id}>
            {interest.sender} sent you an interest message.
            <button onClick={() => handleAction(interest.id, 'accept')}>Accept</button>
            <button onClick={() => handleAction(interest.id, 'reject')}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageInterests;
