import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Home = () => {
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Please enter your name');
    if (!roomId.trim()) return toast.error('Please enter a room ID');
    localStorage.setItem('roomId', roomId);
    
    navigate('/chat', { state: { name, roomId } });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-5 bg-gray-100'>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center justify-center"
      >
        <h4 className="text-2xl font-bold text-center mb-5">Join Chat Room</h4>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border border-gray-300 p-3 rounded w-64"
        />

        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
          className="border border-gray-300 p-3 rounded w-64"
        />

        <button
          type="submit"
          className="bg-blue-700 px-6 py-3 text-white rounded hover:bg-blue-800 transition"
        >
          Start Chatting
        </button>
      </form>
      <p className='max-w-md text-center text-gray-600'>
        Note: You can use any room ID to create or join a chat room. Share the room ID
        with others to chat together.
        You cannot use the same name in the same room.
      </p>
    </div>
  );
};

export default Home;
