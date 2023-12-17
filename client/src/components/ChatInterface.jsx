import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';
import Message from './Message';
import useUser from '../hooks/useUser';
import useMessages from '../hooks/useMessages';

export default function ChatInterface({ sendMessage, selectedContact }) {
  const messageContainerRef = useRef(null);
  const [msg, setMsg] = useState('');
  const { user } = useUser();
  const currentUser = user?._id;
  const { messages } = useMessages();
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);

  useEffect(() => {
    // Scroll to the bottom of the message container whenever new messages are added
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!msg) return;

    sendMessage(msg);
    setMsg('');
  };
  const handleEmojiClick = (emojiObject, event) => {
    setMsg(`${msg}${emojiObject.emoji}`);
    setDisplayEmojiPicker(false);
  };
  const handleDisplayEmojiPicker = () => {
    setDisplayEmojiPicker(!displayEmojiPicker);
  };
  return (
    <div className="h-full">
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
          <div className="input-container relative w-full basis-1/6 pt-4">
            {displayEmojiPicker && (
              <div className="absolute bottom-28 left-4">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <form
              onSubmit={(e) => handleSendMessage(e)}
              className="mx-4 flex justify-between"
            >
              <button
                type="button"
                className="h-14 w-14 mx-2 text-2xl rounded-full text-white bg-yellow-500"
              >
                <div className="button h-auto w-auto rounded-full">
                  <FontAwesomeIcon
                    icon={faFaceSmile}
                    onClick={handleDisplayEmojiPicker}
                  />
                </div>
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
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
    </div>
  );
}
