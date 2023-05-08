import { useRef, useEffect } from 'react';
import Message from './Message';

export default function ChatInterface({ messages, sendMessage, currentUser }) {
  const messageContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message container whenever new messages are added
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    const inputValue = inputRef.current.value;
    if (!inputValue) return;

    sendMessage(inputValue);
    inputRef.current.value = '';
  };

  return (
    <div className="chat-container flex flex-col justify-between h-full">
      <div
        className="message-container overflow-auto"
        ref={messageContainerRef}
      >
        {messages &&
          messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              currentUser={currentUser}
            />
          ))}
      </div>
      <div className="input-container w-full">
        <input
          type="text"
          placeholder="Type your message..."
          ref={inputRef}
          className="text-black w-full"
        />
        <button onClick={handleSendMessage} type="button">
          Send
        </button>
      </div>
    </div>
  );
}
