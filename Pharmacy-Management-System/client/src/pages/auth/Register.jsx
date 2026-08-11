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
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await registerService(form);

      navigate("/login", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <input
          className="w-full border p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-3 rounded-lg mb-3 outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="w-full border p-3 rounded-lg mb-4 outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          minLength={6}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;