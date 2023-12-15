import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user?.user);

  return user && token ? <Outlet /> : <Navigate to="/login" />;
}
