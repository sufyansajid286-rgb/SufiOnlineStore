
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ShoppingBag } from "lucide-react";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("sufiUsers") || "[]");

    if (users.some((u) => u.email.toLowerCase() === form.email.toLowerCase())) {
      setError("This email is already registered.");
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      password: form.password
    };

    localStorage.setItem("sufiUsers", JSON.stringify([...users, newUser]));
    localStorage.setItem("sufiCurrentUser", JSON.stringify(newUser));

    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <ShoppingBag size={27} />
          <span>Sufi Online Store</span>
        </Link>

        <h1>Create Account</h1>
        <p className="auth-subtitle">Join us and start shopping today.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <div className="auth-input">
            <User />
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <label>Email Address</label>
          <div className="auth-input">
            <Mail />
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <label>Password</label>
          <div className="auth-input">
            <Lock />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <label>Confirm Password</label>
          <div className="auth-input">
            <Lock />
            <input
              type="password"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="auth-submit">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
