import { useEffect, useState } from "react";
import API from "../axios/api.js";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  //  Fetch users
  const fetchUsers = async () => {
    const { data } = await API.get("/admin/users");
    console.log(data);
    setUsers(data);
  };

  //  Approve
  const approve = async (id) => {
    await API.put(`/admin/approve/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>

            <div className="mt-3">
              {user.isApproved ? (
                <span className="text-green-600 font-semibold">
                   Approved
                </span>
              ) : (
                <button
                  onClick={() => approve(user._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Approve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;