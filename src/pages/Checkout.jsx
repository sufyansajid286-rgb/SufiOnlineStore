
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, ArrowLeft, CheckCircle } from "lucide-react";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart] = useState(() =>
    JSON.parse(localStorage.getItem("sufiCart") || "[]")
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    payment: "Cash on Delivery"
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + Number(item.price) * (item.quantity || 1),
    0
  );

  const shipping = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderId = "SUFI" + Date.now().toString().slice(-7);

    const order = {
      orderId,
      customer: form,
      items: cart,
      subtotal,
      shipping,
      total,
      date: new Date().toLocaleString(),
      status: "Order Placed"
    };

    const orders = JSON.parse(localStorage.getItem("sufiOrders") || "[]");
    localStorage.setItem("sufiOrders", JSON.stringify([...orders, order]));

    localStorage.removeItem("sufiCart");
    window.dispatchEvent(new Event("cartUpdated"));

    setOrderNumber(orderId);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <CheckCircle size={65} />
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for shopping with Sufi Online Store.</p>
        <h3>Order ID: {orderNumber}</h3>
        <p>Your order has been saved successfully.</p>
        <Link to="/shop" className="checkout-btn">Continue Shopping</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add products before proceeding to checkout.</p>
        <Link to="/shop" className="checkout-btn">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      <div className="checkout-banner">
        <span>ALMOST THERE</span>
        <h1>Checkout</h1>
        <p>Complete your details to place your order.</p>
      </div>

      <div className="checkout-container">

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Information</h2>
          <p className="checkout-muted">Where should we deliver your order?</p>

          <div className="checkout-fields">
            <div className="checkout-field">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange}
                placeholder="Enter your full name" required />
            </div>

            <div className="checkout-field">
              <label>Email Address</label>
              <input type="email" name="email" value={form.email}
                onChange={handleChange} placeholder="Enter your email" required />
            </div>

            <div className="checkout-field">
              <label>Phone Number</label>
              <input type="tel" name="phone" value={form.phone}
                onChange={handleChange} placeholder="03XXXXXXXXX"
                pattern="[0-9+ -]{10,15}" required />
            </div>

            <div className="checkout-field">
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange}
                placeholder="Enter your city" required />
            </div>

            <div className="checkout-field full-field">
              <label>Complete Address</label>
              <textarea name="address" value={form.address}
                onChange={handleChange} placeholder="House number, street, area..."
                rows="3" required />
            </div>

            <div className="checkout-field">
              <label>Postal Code</label>
              <input name="postalCode" value={form.postalCode}
                onChange={handleChange} placeholder="Postal code" required />
            </div>
          </div>

          <h2 className="payment-title">Payment Method</h2>

          <label className="payment-option">
            <input type="radio" name="payment" value="Cash on Delivery"
              checked={form.payment === "Cash on Delivery"}
              onChange={handleChange} />
            <span>Cash on Delivery</span>
          </label>

          <label className="payment-option">
            <input type="radio" name="payment" value="Bank Transfer"
              checked={form.payment === "Bank Transfer"}
              onChange={handleChange} />
            <span>Bank Transfer (Demo)</span>
          </label>

          <button type="submit" className="place-order-btn">
            Place Order — Rs. {total.toLocaleString("en-PK")}
          </button>

          <Link to="/cart" className="back-to-cart">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="checkout-product" key={item.id}>
              <div>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
              <strong>
                Rs. {(Number(item.price) * (item.quantity || 1)).toLocaleString("en-PK")}
              </strong>
            </div>
          ))}

          <div className="checkout-total-row">
            <span>Subtotal</span>
            <strong>Rs. {subtotal.toLocaleString("en-PK")}</strong>
          </div>

          <div className="checkout-total-row">
            <span>Shipping</span>
            <strong>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</strong>
          </div>

          <div className="checkout-grand-total">
            <span>Total</span>
            <strong>Rs. {total.toLocaleString("en-PK")}</strong>
          </div>

          <div className="checkout-trust">
            <ShieldCheck />
            <span>Secure Checkout</span>
          </div>

          <div className="checkout-trust">
            <Truck />
            <span>Free delivery on orders above Rs. 5,000</span>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default Checkout;
