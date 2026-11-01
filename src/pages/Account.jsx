
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  UserRound, Mail, Phone, MapPin, Package,
  Pencil, Save, X, LogOut
} from "lucide-react";
import "./Account.css";

function Account() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("sufiCurrentUser")
    );

    if (!currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);
    setForm({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      address: currentUser.address || "",
      city: currentUser.city || ""
    });
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = { ...user, ...form };

    const users = JSON.parse(
      localStorage.getItem("sufiUsers") || "[]"
    );

    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem("sufiUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("sufiCurrentUser", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("sufiCurrentUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="account-container">

        <div className="account-heading">
          <div>
            <span className="account-tag">MY ACCOUNT</span>
            <h1>Welcome, {user.name}</h1>
            <p>Manage your personal information and orders.</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="account-layout">

          <aside className="account-sidebar">
            <div className="profile-avatar">
              <UserRound size={48} />
            </div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>

            <div className="account-menu">
              <Link to="/account" className="account-menu-active">
                <UserRound size={18} /> My Profile
              </Link>
              <Link to="/my-orders">
  <Package size={18} /> My Orders
</Link>
            </div>
          </aside>

          <section className="account-details">
            <div className="account-details-header">
              <div>
                <h2>Personal Information</h2>
                <p>Your profile details</p>
              </div>

              {!editing && (
                <button
                  className="edit-profile-btn"
                  onClick={() => setEditing(true)}
                >
                  <Pencil size={16} /> Edit Profile
                </button>
              )}
            </div>

            <form onSubmit={handleSave}>
              <div className="account-form-grid">

                <div className="account-field">
                  <label>Full Name</label>
                  <div className="account-input">
                    <UserRound size={18} />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={!editing}
                      required
                    />
                  </div>
                </div>

                <div className="account-field">
                  <label>Email Address</label>
                  <div className="account-input">
                    <Mail size={18} />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="account-field">
                  <label>Phone Number</label>
                  <div className="account-input">
                    <Phone size={18} />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="account-field">
                  <label>City</label>
                  <div className="account-input">
                    <MapPin size={18} />
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                <div className="account-field full-field">
                  <label>Delivery Address</label>
                  <div className="account-input">
                    <MapPin size={18} />
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Enter your complete address"
                    />
                  </div>
                </div>

              </div>

              {editing && (
                <div className="account-form-actions">
                  <button type="button" className="cancel-btn"
                    onClick={() => {
                      setForm({
                        name: user.name || "",
                        email: user.email || "",
                        phone: user.phone || "",
                        address: user.address || "",
                        city: user.city || ""
                      });
                      setEditing(false);
                    }}>
                    <X size={17} /> Cancel
                  </button>

                  <button type="submit" className="save-profile-btn">
                    <Save size={17} /> Save Changes
                  </button>
                </div>
              )}
            </form>
          </section>

        </div>
      </div>
    </div>
  );
}

export default Account;
