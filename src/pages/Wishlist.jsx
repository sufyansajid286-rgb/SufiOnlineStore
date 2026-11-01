
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart, ShoppingBag, Trash2, ArrowRight, HeartOff
} from "lucide-react";
import  products from "../data/products";
import "./Wishlist.css";

function Wishlist() {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("sufiWishlist") || "[]")
  );

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("sufiCart") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("sufiWishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existing = updatedCart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("sufiCart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
    alert("Product added to cart!");
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-banner">
        <span>YOUR FAVORITES</span>
        <h1>My Wishlist</h1>
        <p>All the products you love, saved in one place.</p>
      </div>

      <div className="wishlist-container">
        <div className="wishlist-heading">
          <div>
            <h2>Saved Items</h2>
            <p>{savedProducts.length} products saved</p>
          </div>

          {savedProducts.length > 0 && (
            <button
              className="clear-wishlist"
              onClick={() => setWishlist([])}
            >
              <Trash2 size={16} /> Clear Wishlist
            </button>
          )}
        </div>

        {savedProducts.length === 0 ? (
          <div className="wishlist-empty">
            <HeartOff size={55} />
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite products and find them here later.</p>
            <Link to="/shop" className="wishlist-shop-btn">
              Explore Products <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {savedProducts.map((product) => (
              <div className="wishlist-card" key={product.id}>
                <button
                  className="wishlist-remove"
                  onClick={() => removeItem(product.id)}
                  title="Remove from wishlist"
                >
                  <Heart size={18} fill="currentColor" />
                </button>

                <Link to={`/product/${product.id}`}>
                  <img
                    src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=600&q=80`}
                    alt={product.name}
                  />
                </Link>

                <div className="wishlist-card-info">
                  <span>{product.category}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3>{product.name}</h3>
                  </Link>

                  <div className="wishlist-price">
                    <strong>Rs. {product.price}</strong>
                    {product.oldPrice && (
                      <del>Rs. {product.oldPrice}</del>
                    )}
                  </div>

                  <button
                    className="wishlist-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingBag size={16} /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
