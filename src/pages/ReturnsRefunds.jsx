
import {
  RotateCcw,
  PackageCheck,
  ClipboardList,
  Wallet,
  AlertCircle,
  Headphones,
} from "lucide-react";
import "./ReturnsRefunds.css";

function ReturnsRefunds() {
  const sections = [
    {
      icon: <PackageCheck size={27} />,
      title: "Return Eligibility",
      description:
        "Products may be eligible for return if they are damaged, defective, incorrect, or received in an unsatisfactory condition. The product should remain unused and include its original packaging where possible.",
    },
    {
      icon: <ClipboardList size={27} />,
      title: "How to Request a Return",
      description:
        "Contact our customer support team through the Contact Us page. Provide your Order ID, product details, and a description of the issue. Our team will guide you through the next steps.",
    },
    {
      icon: <Wallet size={27} />,
      title: "Refund Process",
      description:
        "Once a return request is reviewed and approved, the refund process will be communicated to the customer. The refund method and processing time may depend on the original payment method.",
    },
    {
      icon: <RotateCcw size={27} />,
      title: "Exchange Requests",
      description:
        "If you receive an incorrect or defective product, contact our support team to discuss the available exchange or replacement options.",
    },
    {
      icon: <AlertCircle size={27} />,
      title: "Non-Returnable Conditions",
      description:
        "Products that have been used, damaged after delivery, or returned without their original condition may not qualify for a return.",
    },
    {
      icon: <Headphones size={27} />,
      title: "Need Assistance?",
      description:
        "If you have questions about a return or refund request, our customer support team is available to help.",
    },
  ];

  return (
    <div className="returns-page">
      <section className="returns-banner">
        <RotateCcw size={45} />
        <span>CUSTOMER SUPPORT</span>
        <h1>Returns & Refunds</h1>
        <p>
          Learn about our return process, refund requests, and customer support.
        </p>
      </section>

      <div className="returns-container">
        <div className="returns-intro">
          <h2>Our Returns & Refunds Policy</h2>
          <p>
            At Sufi Online Store, customer satisfaction matters to us.
            If you experience an issue with your purchase, please review
            the information below to understand how to request assistance.
          </p>
        </div>

        <div className="returns-grid">
          {sections.map((section, index) => (
            <div className="returns-card" key={index}>
              <div className="returns-icon">{section.icon}</div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
          ))}
        </div>

        <div className="returns-note">
          <h2>Have a Return or Refund Question?</h2>
          <p>
            Contact our support team with your Order ID and details
            so we can help you with your request.
          </p>
          <a href="/contact" className="returns-contact-btn">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default ReturnsRefunds;
