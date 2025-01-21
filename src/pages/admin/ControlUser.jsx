import { useState, useEffect } from "react";
import customApi from "../../api";

function ControlUser() {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await customApi.get("auth/users", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  // Delete a user
  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;

      await customApi.delete(`auth/users/${userId}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      alert("User deleted successfully");
      fetchUsers(); // Refresh user list
    } catch (err) {
      console.error(err.response?.data || "Error occurred");
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-5 rounded-xl">
      <h1 className="font-bold text-blue-700 text-xl">Hapus Akun</h1>
    <p className="mb-5">Anda bisa menghapus akun yang tidak sesuai</p>
    <div className="h-[1px] w-full bg-gray-200 mb-5"></div>
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead className="rounded-t-xl">
            <tr className="bg-[linear-gradient(to_right,_#1e3a8a,_#3b82f6,_#7d089b)] text-white text-sm rounded-xl">
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Peran</th>
              <th className="py-3 px-6 text-center">Hapus</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-sm text-gray-800">{user.name}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{user.email}</td>
                <td className="py-3 px-6 text-sm text-gray-800">{user.role}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 text-sm rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="text-gray-600 text-center py-4">No users found.</div>
        )}
      </div>
    </div>
  );
}

export default ControlUser;
