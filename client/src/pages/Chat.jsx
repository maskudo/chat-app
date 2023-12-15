import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ChatInterface from '../components/ChatInterface';
import Contact from '../components/Contact';
import {
  addNewMessage,
  getAllMessages,
  sendNewMessage,
} from '../slices/messageSlice';
import { setSelectedContact } from '../slices/userSlice';
import { allUsersRoute } from '../utils/APIRoutes';
import toastOptions from '../utils/toastOptions';

export default function Chat() {
  const [contacts, setContacts] = useState(undefined);
  const currentUserId = useSelector((state) => state.user?.user?.id);
  const selectedContact = useSelector((state) => state.user?.selectedContact);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fn() {
      let data = [];
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        data = await axios.get(`${allUsersRoute}`, config);
      } catch (error) {
        const errorMsg = error.message;
        toast.error(errorMsg, {
          ...toastOptions,
          toastId: errorMsg,
        });
      }
      let contacts = data.data.filter((usr) => usr.id !== currentUserId);
      setContacts(contacts);
    }
    fn();
  }, []);

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
      dispatch(addNewMessage(data));
    },
    [currentUserId, selectedContact]
  );

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
                handleContactClick(contact.id);
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
