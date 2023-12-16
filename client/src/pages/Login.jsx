import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, updateUser } from '../slices/userSlice';
import toastOptions from '../utils/toastOptions';

export default function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user?.id);

  const handleValidation = () => {
    const { password, username } = values;
    let isSuccess = true;
    if (password === '') {
      toast.error('Username and password required.', toastOptions);
      isSuccess = false;
    } else if (username === '') {
      toast.error('Username and password required.', toastOptions);
      isSuccess = false;
    }
    return isSuccess;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      let data = await dispatch(loginUser({ username, password }));
      data = data?.payload;
      if (!data) {
        toast.error(
          data?.msg || 'Error logging in. Check your username and passord',
          toastOptions
        );
      } else {
        await dispatch(updateUser(data.user));
        navigate('/');
      }
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div
      id="login"
      className="login w-full max-w-xs mx-auto my-36 p-5 shadow-md rounded-lg"
    >
      <form onSubmit={(e) => handleSubmit(e)} className=" mb-4 text-white">
        <label htmlFor="username" className="block  text-sm font-normal mb-2">
          Enter Username
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            type="text"
            name="username"
            placeholder="Username"
            required
            id="username"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label htmlFor="password" className="block text-sm  mb-2">
          Enter password
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            type="password"
            name="password"
            id="password"
            required
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
        </label>

        <button
          type="submit"
          className="bg-orange-400 hover:bg-orange-300 text-white  my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Login!
        </button>
        <div className="py-2">
          Don&apos;t have an account?
          <Link
            className="text-orange-200 visited:text-orange-200 hover:text-orange-300 mx-1"
            to="/register"
          >
            Register
          </Link>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}
