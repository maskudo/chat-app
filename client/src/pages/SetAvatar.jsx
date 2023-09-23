import { useState } from 'react';
import { Form, Input, Button, message, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileUpload,
  faUpload,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { updateUser } from '../slices/userSlice';
import toastOptions from '../utils/toastOptions';
import { setAvatarRoute } from '../utils/APIRoutes';

export default function SetAvatar() {
  const [currentAvatar, setCurrentAvatar] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector((state) => state.user.user);
  const fallbackImage = user?.avatarImage;
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios.patch(
      `${setAvatarRoute}/${user?._id}/setavatar`,
      formData,
      config
    );
    setCurrentAvatar(res.data.user.avatarImage);
    dispatch(updateUser(res.data.user));
  };

  const handleChange = (e) => {
    const file = e.file.originFileObj;
    if (file.size > 4 * 1024 * 1024) {
      toast.error('File size should be smaller than 4 MB', toastOptions);
      e.target.value = '';
    } else {
      const url = URL.createObjectURL(file);
      setCurrentAvatar(url);
      setSelectedFile(file);
    }
  };
  return (
    <div className="header w-9/12 flex flex-col h-5/6 drop-shadow-sm my-4 shadow-md shadow-gray-300 mx-auto px-2 justify-center  gap-10">
      <div className="imageContainer flex justify-center">
        <img
          src={currentAvatar || fallbackImage}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = fallbackImage;
          }}
          className="h-36 w-36 rounded-full mx-5 bg-gray-300"
          alt="user-avatar"
        />
      </div>

      <Form className="w-1/6 mx-auto" layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={() => {}}
          noStyle
        >
          <Upload.Dragger
            name="files"
            action="/upload.do"
            showUploadList={false}
            accept="image/png, image/jpeg"
            onChange={handleChange}
          >
            <p className="ant-upload-drag-icon text-3xl">
              <FontAwesomeIcon icon={faUpload} />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="bg-blue-300 text-white my-4"
            // styles={{ color: 'white' }}
            block
            size="large"
            htmlType="submit"
          >
            Upload!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
