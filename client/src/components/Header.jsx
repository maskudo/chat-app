import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Header({ currentUser, handleSignOut }) {
  return (
    <header className="flex w-9/12 justify-end drop-shadow-sm py-2">
      <img
        src={currentUser.avatarImage}
        alt="Current User Avatar"
        className="h-10 w-10 rounded-full mx-5 bg-orange-300"
      />
      <button onClick={handleSignOut} type="button" className="text-xl">
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </header>
  );
}
