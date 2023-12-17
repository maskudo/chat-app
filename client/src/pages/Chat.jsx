import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import ChatInterface from '../components/ChatInterface';
import Contact from '../components/Contact';
import {
  addNewMessage,
  getAllMessages,
  sendNewMessage,
} from '../slices/messageSlice';
import {
  setSelectedContact,
  setSelectedContactOnlineStatus,
} from '../slices/userSlice';
import { allUsersRoute, host } from '../utils/APIRoutes';
import toastOptions from '../utils/toastOptions';
import useUser from '../hooks/useUser';
import useSelectedContact from '../hooks/useSelectedContact';

export default function Chat() {
  const [contacts, setContacts] = useState(undefined);
  const [arrivalMsg, setArrivalMsg] = useState(undefined);
  const { user } = useUser();
  const currentUserId = user?._id;
  const { selectedContact } = useSelectedContact();
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    async function fn() {
      let data = [];
      try {
        data = await axios.get(`${allUsersRoute}/${currentUserId}`);
      } catch (error) {
        const errorMsg = error.message;
        toast.error(errorMsg, {
          ...toastOptions,
          toastId: errorMsg,
        });
      }
      setContacts(data.data);
    }
    fn();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUserId);
    }
  }, [currentUserId]);

  useEffect(() => {
    async function getMessages() {
      let data = await dispatch(
        getAllMessages({ currentUserId, selectedContact })
      );
      if (!data.payload) {
        const errorMsg = data.error.message;
        toast.error(errorMsg, { ...toastOptions, toastId: errorMsg });
        return;
      }
      data = data.payload;
    }

    if (selectedContact) {
      getMessages();
      socket.current.emit('req-contact-status', {
        senderId: currentUserId,
        contactId: selectedContact,
      });
    }
  }, [selectedContact]);

  const sendMessage = useCallback(
    async (text) => {
      const message = {
        text,
        sender: currentUserId,
        receiver: selectedContact,
      };
      let data = await dispatch(sendNewMessage({ message }));
      if (!data.payload) {
        const errorMsg = data.error.message;
        toast.error(errorMsg, {
          ...toastOptions,
          toastId: errorMsg,
        });
        return;
      }
      data = data.payload;
      // console.log(data.data);
      socket.current.emit('send-msg', data.data);
      dispatch(addNewMessage(data.data));
    },
    [currentUserId, selectedContact]
  );

  useEffect(() => {
    // console.log('checking socket.current', socket.current);
    if (socket.current) {
      socket.current.on('msg-receive', (msg) => {
        dispatch(setSelectedContactOnlineStatus(true));
        setArrivalMsg({ fromSelf: false, message: msg });
      });
      socket.current.on('contact-status', (msg) => {
        dispatch(setSelectedContactOnlineStatus(msg.status));
      });
    }
  }, [socket, selectedContact]);

  useEffect(() => {
    if (arrivalMsg) {
      dispatch(addNewMessage(arrivalMsg.message));
    }
  }, [arrivalMsg]);

  const handleContactClick = (contact) => {
    dispatch(setSelectedContact(contact));
  };

  return (
    <div className="h-full min-h-[80vh] chat-app grow flex justify-center w-[80%] mx-auto my-2 text-white">
      <div className="contacts basis-2/6 rounded-lg overflow-auto mr-8">
        {!!contacts?.length &&
          contacts.map((contact) => (
            <Contact
              key={contact.username}
              contact={contact}
              onClick={() => {
                handleContactClick(contact._id);
              }}
            />
          ))}
        {!contacts?.length && (
          <div className="text-white h-full flex items-center justify-center text-2xl text-center">
            No contacts to chat with :(
          </div>
        )}
      </div>
      <div className="chat-main basis-4/6  rounded-lg">
        {selectedContact ? (
          <ChatInterface
            sendMessage={sendMessage}
            currentUser={currentUserId}
            selectedContact={selectedContact}
          />
        ) : (
          <div className="text-2xl text-center flex flex-col justify-center h-full">
            <div className="my-64 border-2 border-orange-300 rounded-lg mx-32 p-2">
              Select a contact to start chatting.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
