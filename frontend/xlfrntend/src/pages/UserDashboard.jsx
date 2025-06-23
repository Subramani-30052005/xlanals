import { useSelector } from 'react-redux';

export default function UserDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-3xl mx-auto mt-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Excel Analytics</h1>
      <p className="text-gray-700 text-lg mb-2">
        Logged in as: <span className="font-semibold">{user?.email}</span>
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">What would you like to do?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white">
          <a href="/upload" className="bg-blue-600 hover:bg-blue-700 p-6 rounded shadow">
            Upload Excel
          </a>
          <a href="/analysis" className="bg-green-600 hover:bg-green-700 p-6 rounded shadow">
            Analyze Charts
          </a>
          <a href="/" className="bg-purple-600 hover:bg-purple-700 p-6 rounded shadow">
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
