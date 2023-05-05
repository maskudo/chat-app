function Contact({ contact, selected, onClick }) {
  return (
    <div
      className={`${
        selected && 'bg-gray-900'
      } contact border-2 border-gray-900`}
      onClick={onClick}
    >
      <div>{contact.username}</div>
      <img src={contact.avatarImage} alt="" className="w-12" />
    </div>
  );
}

export default Contact;
