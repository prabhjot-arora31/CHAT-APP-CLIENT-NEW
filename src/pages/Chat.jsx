import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('https://chat-app-backend-f3lm.onrender.com'); // ✅ Backend URL

const Chat = () => {
  const location = useLocation();
const name = location.state?.name || 'Anonymous';
const roomId = location.state?.roomId || 'global-room'; // ✅ dynamic/ ✅ can be dynamic if needed
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

useEffect(() => {
  if (!roomId || !name) return;

  // ✅ Only send roomId — name is not needed by server
  socket.emit('join_the_room', roomId);

  // ✅ Listen for messages from server
  socket.on('get_message', (data) => {
    setMessages((prev) => [...prev, data]);
  });

  // ❌ Server doesn't send "user_joined", so remove this
  // socket.on('user_joined', ...) ❌

  return () => {
    // socket.disconnect();
  };
}, [roomId, name]);


  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        name,
        message,
        roomId,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit('send_the_message', msgData);
      setMessages((prev) => [...prev, msgData]);
      setMessage('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex max-w-[560px] mx-auto flex-col h-screen p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-4">Chat Room - ID:[{roomId}]</h2>

      <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow mb-4">
      {messages.map((msg, i) => {
 

  const isMe = msg.name === name;

  return (
    <div
      key={i}
      className={`mb-2 flex ${isMe ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`p-3 rounded-lg max-w-xs break-words ${
          isMe
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-black rounded-bl-none'
        }`}
      >
        <p className="text-sm font-semibold">{msg.name}</p>
        <p className='text-base '>{msg.message}</p>
        <p className={`text-xs mt-1 text-right ${isMe ? 'text-white' : 'text-gray-600'}`}>{msg.time}</p>
      </div>
    </div>
  );
})}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
