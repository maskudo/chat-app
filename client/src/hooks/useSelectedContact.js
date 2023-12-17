import { useSelector } from 'react-redux';

export default function useSelectedContact() {
  const selectedContact = useSelector((state) => state.user?.selectedContact);
  const selectedContactOnlineStatus = useSelector(
    (state) => state.user?.selectedContactOnlineStatus
  );
  return { selectedContact, selectedContactOnlineStatus };
}
