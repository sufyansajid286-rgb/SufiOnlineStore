
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShoppingBag } from "lucide-react";
import "./Auth.css";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("sufiUsers") || "[]");

    const user = users.find(
      (u) => u.email.toLowerCase() === form.email.toLowerCase() &&
        u.password === form.password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("sufiCurrentUser", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          <ShoppingBag size={27} />
          <span>Sufi Online Store</span>
        </Link>

        <h1>Welcome Back!</h1>
        <p className="auth-subtitle">Login to your account to continue.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button type="submit" className="auth-submit">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
