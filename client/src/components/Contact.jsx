function Contact({ contact, selected, onClick }) {
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
        className="w-12 h-12 rounded-full ml-3"
      />
      <div>{contact.username}</div>
    </div>
  );
}

export default Contact;
