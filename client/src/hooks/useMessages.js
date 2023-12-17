import { useSelector } from 'react-redux';

export default function useMessages() {
  const messages = useSelector((state) => state?.message?.messages);
  return { messages };
}
