export function Header({ currentUser, handleSignOut }) {
  return (
    <header className="flex justify-end drop-shadow-sm">
      <button onClick={handleSignOut} type="button">
        Sign Out{' '}
      </button>
      <img
        src={currentUser.avatarImage}
        alt="Current User Avatar"
        className="h-8 w-8 rounded-full ml-3"
      />
    </header>
  );
}
