import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmileBeam } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';
import Message from './Message';

export default function ChatInterface({ sendMessage, selectedContact }) {
  const messageContainerRef = useRef(null);
  const [msg, setMsg] = useState('');
  const currentUser = useSelector((state) => state.user?.user?._id);
  const messages = useSelector((state) => state.message.messages);
  const [displayEmojiPicker, setDisplayEmojiPicker] = useState(false);

  useEffect(() => {
    // Scroll to the bottom of the message container whenever new messages are added
    messageContainerRef.current.scrollTop =
      messageContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const inputValue = msg;
    if (!inputValue) return;

    sendMessage(inputValue);
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
    <>
      <div className="h-full my-8 flex flex-col ">
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
          <div className="input-container relative w-full basis-1 ">
            {displayEmojiPicker && (
              <div className="absolute bottom-20 right-4">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <form
              onSubmit={(e) => handleSendMessage(e)}
              className="mx-4 flex justify-between"
            >
              <input
                type="text"
                placeholder="Type your message..."
                required
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
                className="text-black h-16 w-5/6 rounded-lg p-4 msg-input border border-1"
              />
              <button type="button" className="">
                <FontAwesomeIcon
                  icon={faFaceSmileBeam}
                  onClick={handleDisplayEmojiPicker}
                  className="h-10 w-10 text-orange-600"
                />
              </button>
              <button type="submit" className="">
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="h-10 w-10 text-orange-600"
                />
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
