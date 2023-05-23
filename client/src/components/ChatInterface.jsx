import { useRef, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Message from './Message';

export default function ChatInterface({
  messages,
  sendMessage,
  selectedContact,
}) {
  const messageContainerRef = useRef(null);
  const inputRef = useRef(null);
  const currentUser = useSelector((state) => state.user?.user?._id);

  useEffect(() => {
    // Scroll to the bottom of the message container whenever new messages are added
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    if (!inputValue) return;

    sendMessage(inputValue);
    inputRef.current.value = '';
  };

  return (
    <>
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
        {!!selectedContact && (
          <div className="input-container w-full">
            <form onSubmit={(e) => handleSendMessage(e)}>
              <input
                type="text"
                placeholder="Type your message..."
                ref={inputRef}
                className="text-black w-full"
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
