
import {
  Truck,
  Package,
  Clock,
  MapPin,
  CreditCard,
  Headphones,
} from "lucide-react";
import "./ShippingPolicy.css";

function ShippingPolicy() {
  const policies = [
    {
      icon: <Package size={27} />,
      title: "Order Processing",
      description:
        "Orders are processed after successful confirmation. Processing time may vary depending on product availability.",
    },
    {
      icon: <Clock size={27} />,
      title: "Delivery Time",
      description:
        "Estimated delivery time depends on your location and product availability. Delivery updates can be checked through our Track Order page.",
    },
    {
      icon: <Truck size={27} />,
      title: "Shipping Charges",
      description:
        "Shipping charges are calculated at checkout and displayed before you confirm your order.",
    },
    {
      icon: <MapPin size={27} />,
      title: "Delivery Address",
      description:
        "Please provide a complete and accurate delivery address, including your city and contact number, when placing an order.",
    },
    {
      icon: <CreditCard size={27} />,
      title: "Payment",
      description:
        "Available payment methods are displayed during checkout. Please select your preferred payment option before confirming your order.",
    },
    {
      icon: <Headphones size={27} />,
      title: "Delivery Support",
      description:
        "If you experience any delivery issues, contact our customer support team through the Contact Us page.",
    },
  ];

  return (
    <div className="shipping-page">
      <section className="shipping-banner">
        <Truck size={45} />
        <span>CUSTOMER INFORMATION</span>
        <h1>Shipping Policy</h1>
        <p>
          Everything you need to know about order processing and delivery.
        </p>
      </section>

      <div className="shipping-container">
        <div className="shipping-intro">
          <h2>Our Shipping & Delivery Policy</h2>
          <p>
            At Sufi Online Store, we aim to make your shopping experience
            simple and convenient. Please review our shipping information
            before placing your order.
          </p>
        </div>

        <div className="shipping-grid">
          {policies.map((policy, index) => (
            <div className="shipping-card" key={index}>
              <div className="shipping-icon">{policy.icon}</div>
              <h3>{policy.title}</h3>
              <p>{policy.description}</p>
            </div>
          ))}
        </div>

        <div className="shipping-note">
          <h2>Need Help With Your Delivery?</h2>
          <p>
            For questions about shipping or an existing order, our support
            team is ready to assist you.
          </p>
          <a href="/contact" className="shipping-contact-btn">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;
