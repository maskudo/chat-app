export default function Message({ message }) {
  return (
    <div className="message">
      {message.text}
      from {message.sender.username} to {message.receiver.username} at{' '}
      {message.createdAt}
    </div>
  );
}
