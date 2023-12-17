import useUser from '../hooks/useUser';
import useSelectedContact from '../hooks/useSelectedContact';

export default function Message({ message }) {
  const { user } = useUser();
  const currentUser = user?._id;
  const { selectedContact, selectedContactOnlineStatus } = useSelectedContact();
  const isCurrentUser = currentUser === message.sender._id;
  return (
    <div
      className={`flex items-start m-4  ${isCurrentUser ? 'justify-end' : ''}`}
    >
      {!isCurrentUser && (
        <img
          src={message.sender.avatarImage}
          alt="Contact Avatar"
          className={`${
            selectedContact &&
            selectedContactOnlineStatus &&
            'border border-green-500'
          } h-8 w-8 rounded-full mr-3`}
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
