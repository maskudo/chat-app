import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// TODO: get currentUser from useContext

export default function Message({ message, currentUser }) {
  const isCurrentUser = currentUser === message.sender._id;
  return (
    <div
      className={`flex items-start mb-4 ${isCurrentUser ? 'justify-end' : ''}`}
    >
      {!isCurrentUser && (
        <img
          src={message.receiver.avatarImage}
          alt="Contact Avatar"
          className="h-8 w-8 rounded-full mr-3"
        />
      )}
      <div
        className={`rounded-lg p-3 ${
          isCurrentUser ? 'ml-4 bg-blue-300' : 'mr-4 bg-red-600'
        }`}
      >
        <p className="text-sm">{message.text}</p>
      </div>
      {isCurrentUser && (
        <img
          src={message.sender.avatarImage}
          alt="Current User Avatar"
          className="h-8 w-8 rounded-full ml-3"
        />
      )}
    </div>
  );
}
