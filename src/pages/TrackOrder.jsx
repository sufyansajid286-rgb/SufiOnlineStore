
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Package,
  Search,
  CheckCircle,
  Truck,
  Clock,
} from "lucide-react";
import "./TrackOrder.css";

const stages = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

function TrackOrder() {
  const [searchParams] = useSearchParams();

  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  const findOrder = (id) => {
    const orders = JSON.parse(
      localStorage.getItem("sufiOrders") || "[]"
    );

    const found = orders.find(
      (item) =>
        item.orderId?.toLowerCase() === id.trim().toLowerCase()
    );

    setOrder(found || null);
    setSearched(true);
  };

  useEffect(() => {
    const id = searchParams.get("orderId");

    if (id) {
      setOrderId(id);
      findOrder(id);
    }
  }, [searchParams]);

  const trackOrder = (e) => {
    e.preventDefault();
    findOrder(orderId);
  };

  const currentStage = stages.indexOf(order?.status);

  return (
    <div className="track-page">
      <section className="track-banner">
        <span>ORDER UPDATES</span>
        <h1>Track Your Order</h1>
        <p>
          Stay updated on your order's journey to your doorstep.
        </p>
      </section>

      <div className="track-container">
        <div className="track-search-card">
          <Package size={38} />

          <h2>Where Is My Order?</h2>

          <p>
            Enter your Order ID to check its current status.
          </p>

          <form onSubmit={trackOrder} className="track-form">
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID (e.g. SUFI1234567)"
              required
            />

            <button type="submit">
              <Search size={18} />
              Track Order
            </button>
          </form>
        </div>

        {searched && !order && (
          <div className="track-not-found">
            <h3>Order Not Found</h3>
            <p>Please check your Order ID and try again.</p>
          </div>
        )}

        {order && (
          <div className="track-result">
            <div className="track-result-header">
              <div>
                <span>ORDER ID</span>
                <h2>{order.orderId}</h2>
                <p>Placed on: {order.date}</p>
              </div>

              <div className="track-status-badge">
                {order.status}
              </div>
            </div>

            <div className="track-progress">
              {stages.map((stage, index) => {
                const completed = index <= currentStage;

                return (
                  <div
                    className={`track-step ${
                      completed ? "completed" : ""
                    }`}
                    key={stage}
                  >
                    <div className="track-step-icon">
                      {index === 0 ? (
                        <CheckCircle />
                      ) : index === 1 ? (
                        <Clock />
                      ) : index === 2 ? (
                        <Package />
                      ) : (
                        <Truck />
                      )}
                    </div>

                    <div>
                      <h4>{stage}</h4>
                      <p>
                        {completed ? "Completed" : "Pending"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="track-order-details">
              <h3>Order Details</h3>

              {order.items.map((item, index) => (
                <div
                  className="track-item"
                  key={`${item.id}-${index}`}
                >
                  <span>
                    {item.name} × {Number(item.quantity) || 1}
                  </span>

                  <strong>
                    Rs. {(
                      Number(item.price) *
                      (Number(item.quantity) || 1)
                    ).toLocaleString("en-PK")}
                  </strong>
                </div>
              ))}

              <div className="track-item track-total">
                <span>Total Amount</span>
                <strong>
                  Rs. {Number(order.total).toLocaleString("en-PK")}
                </strong>
              </div>

              <p className="track-payment">
                Payment Method:{" "}
                {order.paymentMethod ||
                  order.customer?.payment ||
                  "Cash on Delivery"}
              </p>

              <p className="track-payment">
                Delivery Address:{" "}
                {order.customer?.address}, {order.customer?.city}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
