import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
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
      <div className="chat-container my-0 flex flex-col h-full">
        <div
          className="message-container basis-5/6 overflow-auto"
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
          <div className="input-container w-full basis-1/6 pt-4">
            <form
              onSubmit={(e) => handleSendMessage(e)}
              className="mx-4 flex justify-between"
            >
              <input
                type="text"
                placeholder="Type your message..."
                ref={inputRef}
                className="text-black h-16 w-5/6 rounded-lg p-4 msg-input"
              />
              <button
                type="submit"
                className="h-14 w-14 mx-2 text-2xl rounded-full bg-green-400 hover:bg-green-500"
              >
                <div className="button h-auto w-auto rounded-full">
                  <FontAwesomeIcon icon={faPaperPlane} className="" />
                </div>
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
