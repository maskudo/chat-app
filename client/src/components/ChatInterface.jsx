import { useRef, useEffect } from 'react';

export default function ChatInterface({ messages, sendMessage }) {
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
    <div className="chat-container" ref={messageContainerRef}>
      <div className="message-container">
        {messages &&
          messages.map((message) => (
            <div key={message._id} className="message">
              <div className="message-text">{message.text}</div>
              <div className="message-date">{message.createdAt}</div>
            </div>
          ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          ref={inputRef}
          className="text-black"
        />
        <button onClick={handleSendMessage} type="button">
          Send
        </button>
      </div>
    </div>
  );
}
