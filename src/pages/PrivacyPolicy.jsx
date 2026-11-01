
import {
  ShieldCheck,
  UserRound,
  Database,
  LockKeyhole,
  Cookie,
  Mail,
} from "lucide-react";
import "./PrivacyPolicy.css";

function PrivacyPolicy() {
  const sections = [
    {
      icon: <UserRound size={27} />,
      title: "Information We Collect",
      description:
        "When you create an account or place an order, we may collect information such as your name, email address, phone number, delivery address, and order details.",
    },
    {
      icon: <Database size={27} />,
      title: "How We Use Your Information",
      description:
        "Your information is used to manage your account, process orders, arrange deliveries, provide customer support, and improve your shopping experience.",
    },
    {
      icon: <LockKeyhole size={27} />,
      title: "Data Protection",
      description:
        "We take reasonable measures to protect customer information from unauthorized access, misuse, alteration, or disclosure.",
    },
    {
      icon: <ShieldCheck size={27} />,
      title: "Information Sharing",
      description:
        "Customer information may be shared with relevant service providers when necessary to process orders, facilitate deliveries, or provide requested services. We do not sell personal information.",
    },
    {
      icon: <Cookie size={27} />,
      title: "Cookies & Local Storage",
      description:
        "Our website may use browser storage to remember account information, shopping cart items, wishlist products, and order details to support website functionality.",
    },
    {
      icon: <Mail size={27} />,
      title: "Your Privacy & Contact",
      description:
        "If you have questions about your personal information or this Privacy Policy, please contact us through our Contact Us page.",
    },
  ];

  return (
    <div className="privacy-page">
      <section className="privacy-banner">
        <ShieldCheck size={45} />
        <span>YOUR PRIVACY MATTERS</span>
        <h1>Privacy Policy</h1>
        <p>
          Learn how Sufi Online Store collects, uses, and protects your information.
        </p>
      </section>

      <div className="privacy-container">
        <div className="privacy-intro">
          <h2>Your Privacy Is Important to Us</h2>
          <p>
            At Sufi Online Store, we respect your privacy and are committed
            to handling your personal information responsibly. This policy
            explains what information we collect and how it is used when
            you visit or shop through our website.
          </p>
        </div>

        <div className="privacy-grid">
          {sections.map((section, index) => (
            <div className="privacy-card" key={index}>
              <div className="privacy-icon">{section.icon}</div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </div>
          ))}
        </div>

        <div className="privacy-note">
          <h2>Questions About Your Privacy?</h2>
          <p>
            If you need more information about how your data is handled,
            feel free to contact our support team.
          </p>
          <a href="/contact" className="privacy-contact-btn">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
