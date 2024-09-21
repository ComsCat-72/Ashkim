import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { groupId } = useParams();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('join_group', groupId);

    newSocket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, [groupId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/group/${groupId}/messages`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [groupId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      const response = await axios.post(`http://localhost:5000/api/group/${groupId}/message`, 
        { content: newMessage, messageType: 'text' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      socket.emit('send_message', response.data);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>{message.content}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message" 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
