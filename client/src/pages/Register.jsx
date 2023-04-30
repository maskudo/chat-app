import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';

function isAlphaNumeric(str) {
  let code;
  let i;
  let len;

  for (i = 0, len = str.length; i < len; i += 1) {
    code = str.charCodeAt(i);
    if (
      !(code > 47 && code < 58) && // numeric (0-9)
      !(code > 64 && code < 91) && // upper alpha (A-Z)
      !(code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

export default function Register() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  };

  const handleValidation = () => {
    const { password, confirmPassword, username } = values;
    let isSuccess = true;
    if (username.length < 3) {
      toast.error(
        'Username should be longer than 3 characters in length',
        toastOptions
      );
      isSuccess = false;
    }
    if (!isAlphaNumeric(username)) {
      toast.error(
        'Username can only contain alphanumeric characters',
        toastOptions
      );
      isSuccess = false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.', toastOptions);
      isSuccess = false;
    }
    if (password.length < 7) {
      toast.error(
        'Password should be longer than 7 characters in length',
        toastOptions
      );
      isSuccess = false;
    }

    return isSuccess;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(
        registerRoute,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div id="register" className="w-full max-w-xs mx-auto my-24">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white shadow-md rounded px-8 pt-6 mb-4"
      >
        <label
          htmlFor="username"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Enter Username
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            placeholder="username"
            required
            id="username"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Enter Email
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            placeholder="email"
            required
            id="email"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Enter password
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            id="password"
            required
            placeholder="password"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Confirm password
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="confirmPassword"
            name="confirmPassword"
            required
            id="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register!
        </button>
        <div>
          Already have an account?{' '}
          <Link className="text-blue-600 visited:text-blue-600" to="/login">
            Login
          </Link>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}
