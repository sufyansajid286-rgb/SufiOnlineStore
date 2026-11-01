import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  UserRound,
  Menu,
  X,
  Package,
} from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="site-header">
      <div className="announcement">
        <p>Free shipping on orders above Rs. 5,000</p>
      </div>

      <div className="navbar container">
        <button
          className="icon-btn mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <Link to="/" className="brand">
          <span className="brand-mark">S</span>
          <span>
            SUFI<span className="brand-light"> STORE</span>
            <small>ONLINE SHOPPING</small>
          </span>
        </Link>
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => isActive ? "nav-active" : ""}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            aria-label="Search"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search />
          </button>

          <Link to="/wishlist" className="icon-btn desktop-action" aria-label="Wishlist">
            <Heart />
          </Link>
         
          <Link to="/track-order" className="icon-btn desktop-action">
  <Package size={20} />
</Link>
          <Link to="/cart" className="icon-btn cart-action" aria-label="Shopping cart">
            <ShoppingBag />
            <span className="cart-count">0</span>
          </Link>
          <Link to="/account" className="icon-btn desktop-action" aria-label="My Account">
  <UserRound size={20} />
  <span>My Account</span>
</Link>
        </div>
      </div>

      {searchOpen && (
        <div className="search-panel container">
          <input
            type="search"
            placeholder="Search products..."
            autoFocus
          />
          <button onClick={() => setSearchOpen(false)}>
            <X size={20} />
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;