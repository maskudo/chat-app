import { useSelector } from 'react-redux';

function Contact({ contact, onClick }) {
  const selected =
    useSelector((state) => state.user?.selectedContact) === contact._id;
  const selectedContactOnlineStatus = useSelector(
    (state) => state.user?.selectedContactOnlineStatus
  );

  return (
    <div
      className={`${
        selected && 'selected'
      } contact flex gap-4 h-16 pt-2 border-b m-8`}
      onClick={onClick}
    >
      <img
        src={contact.avatarImage}
        alt=""
        className={`${
          selected && selectedContactOnlineStatus && 'border-2 border-green-500'
        } w-12 h-12 rounded-full ml-3`}
      />
      <div>{contact.username}</div>
    </div>
  );
}

export default Contact;
