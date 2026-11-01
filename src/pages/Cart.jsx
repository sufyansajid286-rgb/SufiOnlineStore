
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingCart,
  Truck,
  ShieldCheck,
} from "lucide-react";
import productsData from "../data/products";
import "./Cart.css";

const CART_KEY = "sufiCart";
const PRODUCT_KEY = "sufiAdminProducts";

function getImageUrl(image) {
  if (!image) return "https://placehold.co/200x200?text=Product";

  // Complete image URL
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Local public folder image
  if (image.startsWith("/")) {
    return image;
  }

  // Unsplash image ID
  return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=200&q=80`;
}

function Cart() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  function saveCart(updatedCart) {
    setCart(updatedCart);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function syncCart() {
    const savedCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    setCart(savedCart);
  }

  function updateQuantity(id, amount) {
    const updated = cart.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            quantity: Math.max(1, (Number(item.quantity) || 1) + amount),
          }
        : item
    );

    saveCart(updated);
  }

  function removeItem(id) {
    saveCart(cart.filter((item) => String(item.id) !== String(id)));
  }

  function clearCart() {
    saveCart([]);
    setDiscount(0);
    setCoupon("");
    setCouponMessage("");
  }

  useEffect(() => {
    window.addEventListener("cartUpdated", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("cartUpdated", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  // Get latest product information from Admin products
  useEffect(() => {
    function syncProductPrices() {
      const adminProducts = JSON.parse(
        localStorage.getItem(PRODUCT_KEY) || "[]"
      );

      const allProducts = [...productsData];

      adminProducts.forEach((adminProduct) => {
        const index = allProducts.findIndex(
          (product) => String(product.id) === String(adminProduct.id)
        );

        if (index >= 0) {
          allProducts[index] = adminProduct;
        } else {
          allProducts.push(adminProduct);
        }
      });

      const updatedCart = cart.map((item) => {
        const latestProduct = allProducts.find(
          (product) => String(product.id) === String(item.id)
        );

        return latestProduct
          ? {
              ...item,
              name: latestProduct.name,
              price: Number(latestProduct.price),
              image: latestProduct.image,
              category: latestProduct.category,
              brand: latestProduct.brand,
            }
          : item;
      });

      if (JSON.stringify(updatedCart) !== JSON.stringify(cart)) {
        saveCart(updatedCart);
      }
    }

    window.addEventListener("adminProductsUpdated", syncProductPrices);

    return () => {
      window.removeEventListener("adminProductsUpdated", syncProductPrices);
    };
  }, [cart]);

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * (Number(item.quantity) || 1),
    0
  );

  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 250;
  const discountAmount = Math.round((subtotal * discount) / 100);
  const total = Math.max(0, subtotal + shipping - discountAmount);

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === "SUFI10") {
      setDiscount(10);
      setCouponMessage("10% discount applied successfully!");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code. Try SUFI10.");
    }
  }

  const itemCount = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 1),
    0
  );

  return (
    <div className="cart-page">
      <section className="cart-banner">
        <div className="cart-container">
          <span>SUFI ONLINE STORE</span>
          <h1>Shopping Cart</h1>
          <p>Review your selected products before checkout.</p>

          <div className="cart-breadcrumb">
            <Link to="/">Home</Link> / Shopping Cart
          </div>
        </div>
      </section>

      <div className="cart-container cart-main">
        <div className="cart-heading">
          <div>
            <h2>Your Cart</h2>
            <p>{itemCount} items in your cart</p>
          </div>

          {cart.length > 0 && (
            <button className="clear-cart" onClick={clearCart}>
              <Trash2 size={15} /> Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={65} strokeWidth={1.2} />
            <h2>Your cart is empty</h2>
            <p>You haven't added any products to your cart yet.</p>

            <Link to="/shop">
              Start Shopping <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <section className="cart-items">
              <div className="cart-table-heading">
                <span>PRODUCT</span>
                <span>PRICE</span>
                <span>QUANTITY</span>
                <span>TOTAL</span>
              </div>

              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-product">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://placehold.co/200x200?text=Product";
                      }}
                    />

                    <div>
                      <Link to={`/product/${item.id}`}>
                        {item.name}
                      </Link>

                      <span>{item.category || "General"}</span>

                      <button
                        className="mobile-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <span className="cart-price">
                    Rs. {Number(item.price).toLocaleString("en-PK")}
                  </span>

                  <div className="cart-quantity">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={Number(item.quantity) <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>

                    <span>{Number(item.quantity) || 1}</span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  <div className="cart-item-total">
                    <strong>
                      Rs.{" "}
                      {(
                        Number(item.price) *
                        (Number(item.quantity) || 1)
                      ).toLocaleString("en-PK")}
                    </strong>

                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </article>
              ))}

              <div className="continue-shopping">
                <Link to="/shop">
                  <ArrowRight size={16} /> Continue Shopping
                </Link>
              </div>
            </section>

            <aside className="cart-summary">
              <h3>Order Summary</h3>

              <div className="coupon-box">
                <label>Coupon Code</label>

                <div>
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon"
                  />

                  <button onClick={applyCoupon}>Apply</button>
                </div>

                {couponMessage && (
                  <p className={discount ? "coupon-success" : "coupon-error"}>
                    {couponMessage}
                  </p>
                )}

                <small>Try demo code: SUFI10</small>
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>Rs. {subtotal.toLocaleString("en-PK")}</strong>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <strong>
                  {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                </strong>
              </div>

              {discountAmount > 0 && (
                <div className="summary-row discount-row">
                  <span>Discount (10%)</span>
                  <strong>
                    - Rs. {discountAmount.toLocaleString("en-PK")}
                  </strong>
                </div>
              )}

              <div className="summary-total">
                <span>Total</span>
                <strong>Rs. {total.toLocaleString("en-PK")}</strong>
              </div>

              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout <ArrowRight size={17} />
              </Link>

              <div className="cart-promises">
                <p>
                  <Truck size={17} /> Free shipping over Rs. 5,000
                </p>

                <p>
                  <ShieldCheck size={17} /> Secure checkout experience
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
