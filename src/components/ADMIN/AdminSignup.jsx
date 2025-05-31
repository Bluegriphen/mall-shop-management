import { useState } from "react";
import { db } from "../../firebase/firebaseconsole";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const [adminID, setAdminID] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");

  const [error, setError] = useState({});
  const navigate = useNavigate();

  const adminCollection = collection(db, "admin");

  const handleSignup = async () => {
    const newError = {};
    if (!adminID) newError.adminID = "Admin ID is required";
    if (!password) newError.password = "Password is required";
    if (!name) newError.name = "Name is required";
    if (!email) newError.email = "Email is required";

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    try {
      await addDoc(adminCollection, {
        adminUserID: adminID,
        adminPassword: password, // ⚠️ You can hash this later using bcrypt for security
        name,
        email,
        role,
      });
      alert("Admin account created successfully!");
      navigate("/admin_login");
    } catch (err) {
      console.error("Error creating admin:", err);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md p-10 rounded-md w-[400px]">
        <h2 className="text-xl font-bold mb-5">Admin Signup</h2>

        <input
          className="border w-full p-2 mb-2 rounded"
          type="text"
          placeholder="Admin ID"
          value={adminID}
          onChange={(e) => setAdminID(e.target.value)}
        />
        {error.adminID && <p className="text-red-500 text-sm">{error.adminID}</p>}

        <input
          className="border w-full p-2 mb-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && <p className="text-red-500 text-sm">{error.password}</p>}

        <input
          className="border w-full p-2 mb-2 rounded"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error.name && <p className="text-red-500 text-sm">{error.name}</p>}

        <input
          className="border w-full p-2 mb-4 rounded"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <p className="text-red-500 text-sm">{error.email}</p>}

        <button
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          onClick={handleSignup}
        >
          Create Admin Account
        </button>
      </div>
    </div>
  );
};

export default AdminSignup;