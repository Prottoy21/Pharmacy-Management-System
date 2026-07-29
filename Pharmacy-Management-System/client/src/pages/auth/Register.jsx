import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerService } from "../../features/auth/authService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "staff",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await registerService(form);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Phone"
          name="phone"
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleChange}
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <button
          className="w-full bg-green-600 text-white py-3 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-600">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;