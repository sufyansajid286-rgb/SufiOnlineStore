
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(
        localStorage.getItem("sufiOrders") || "[]"
      );

      setOrders([...savedOrders].reverse());
    };

    loadOrders();

    window.addEventListener("storage", loadOrders);

    return () => {
      window.removeEventListener("storage", loadOrders);
    };
  }, []);

  return (
    <div className="my-orders-page">
      <section className="my-orders-banner">
        <span>YOUR SHOPPING HISTORY</span>
        <h1>My Orders</h1>
        <p>View and track all your purchases in one place.</p>
      </section>

      <div className="my-orders-container">
        <div className="my-orders-heading">
          <div>
            <h2>Order History</h2>
            <p>{orders.length} order(s) found</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <Package size={55} />
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet.</p>

            <Link to="/shop" className="orders-shop-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="my-order-card" key={order.orderId}>
                <div className="my-order-header">
                  <div>
                    <span>ORDER ID</span>
                    <h3>{order.orderId}</h3>
                  </div>

                  <span className="my-order-status">
                    {order.status || "Order Placed"}
                  </span>
                </div>

                <div className="my-order-info">
                  <div>
                    <CalendarDays size={17} />
                    <span>{order.date}</span>
                  </div>

                  <div>
                    <Package size={17} />
                    <span>{order.items?.length || 0} product(s)</span>
                  </div>

                  <div>
                    <Truck size={17} />
                    <span>
                      {order.paymentMethod ||
                        order.customer?.payment ||
                        "Cash on Delivery"}
                    </span>
                  </div>
                </div>

                <div className="my-order-products">
                  {(order.items || []).map((item, index) => (
                    <div
                      className="my-order-product"
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
                </div>

                <div className="my-order-footer">
                  <div>
                    <span>Total Amount</span>
                    <strong>
                      Rs. {Number(order.total).toLocaleString("en-PK")}
                    </strong>
                  </div>

                  <Link
                    to={`/track-order?orderId=${encodeURIComponent(
                      order.orderId
                    )}`}
                    className="track-my-order-btn"
                  >
                    Track Order <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
