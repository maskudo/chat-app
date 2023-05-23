import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Message({ message }) {
  const currentUser = useSelector((state) => state.user?.user?._id);
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
          isCurrentUser ? 'ml-4 sender' : 'mr-4 receiver'
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
