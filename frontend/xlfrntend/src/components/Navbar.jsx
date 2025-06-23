import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../app/slices/authSlice';

export default function Navbar() {
  const { token } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-3">
        <Link to="/" className="font-bold text-lg">Excel‑Analytics</Link>
        <div className="space-x-4">
          {token && (
            <>
              <Link to="/upload">Upload</Link>
              <Link to="/analysis">Analysis</Link>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={() => dispatch(logout())}>Logout</button>
            </>
          )}
          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
