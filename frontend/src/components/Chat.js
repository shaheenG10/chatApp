import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { recipient } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/chat/');
    setWs(socket);

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({ recipient, content: message }));
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat with {recipient}</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.sender}: {msg.content}</li>
        ))}
      </ul>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
