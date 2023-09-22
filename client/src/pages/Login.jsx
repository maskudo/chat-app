import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { loginUser, updateUser } from '../slices/userSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user?._id);

  const handleSubmit = async (values) => {
    const { password, username } = values;
    let data = await dispatch(loginUser({ username, password }));
    data = data.payload;
    if (data.status === false) {
      message.error(data.msg);
    } else {
      await dispatch(updateUser(data.user));
      navigate('/');
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div id="login" className="">
      <div className="w-1/5 mx-auto p-4 mt-16 shadow-md shadow-gray-300">
        <header className="my-4 flex flex-col">
          <div className="logo flex justify-center align-middle">
            <img src="../../assets/images/logo.png" alt="company-logo" />
          </div>
          <h1 className="text-center text-3xl text-gray-700">Welcome Back!</h1>
        </header>
        <Form className=" m-auto" layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Username" name="username">
            <Input required addonBefore={<FontAwesomeIcon icon={faUser} />} />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password
              required
              addonBefore={<FontAwesomeIcon icon={faKey} />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="bg-blue-400 text-white my-2"
              // styles={{ color: 'white' }}
              block
              size="large"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <nav className="">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-400">
            Sign Up
          </Link>
        </nav>
      </div>
    </div>
  );
}
