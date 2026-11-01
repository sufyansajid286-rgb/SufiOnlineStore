
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import "./FAQs.css";

const faqData = [
  {
    category: "Orders",
    questions: [
      {
        question: "How can I place an order?",
        answer:
          "Browse our shop, select your desired products, add them to your cart, and proceed to checkout. Enter your delivery details and confirm your order.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Visit the Track Order page and enter your Order ID to view your order status and details.",
      },
      {
        question: "Where can I see my previous orders?",
        answer:
          "Log in to your account and open the My Orders section to view your order history.",
      },
      {
        question: "Can I cancel my order?",
        answer:
          "Please contact our customer support as soon as possible to request an order cancellation. Cancellation depends on the current order status.",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        question: "Which payment methods are available?",
        answer:
          "Available payment methods are displayed during checkout. Select your preferred option before placing your order.",
      },
      {
        question: "Is Cash on Delivery available?",
        answer:
          "If Cash on Delivery is available for your order, you can select it during checkout.",
      },
    ],
  },
  {
    category: "Products",
    questions: [
      {
        question: "How can I find a specific product?",
        answer:
          "You can use the search bar or browse products through the Shop and Categories pages.",
      },
      {
        question: "Can I add products to my wishlist?",
        answer:
          "Yes! Click the wishlist icon on a product to save it. You can view your saved products from the Wishlist page.",
      },
    ],
  },
  {
    category: "Delivery & Returns",
    questions: [
      {
        question: "How much does shipping cost?",
        answer:
          "Shipping charges are calculated at checkout and displayed before you confirm your order.",
      },
      {
        question: "What if I receive a damaged or incorrect product?",
        answer:
          "Please contact our customer support with your order details so we can assist you with the issue.",
      },
      {
        question: "How can I request a return or refund?",
        answer:
          "Visit our Return & Refunds page to review the return process and available options.",
      },
    ],
  },
];

function FAQs() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="faqs-page">
      <section className="faqs-banner">
        <HelpCircle size={42} />
        <span>CUSTOMER SUPPORT</span>
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to common questions about shopping with Sufi Online Store.
        </p>
      </section>

      <div className="faqs-container">
        <div className="faqs-intro">
          <h2>How Can We Help You?</h2>
          <p>
            Explore the questions below to find the information you need.
          </p>
        </div>

        {faqData.map((section, sectionIndex) => (
          <section className="faq-category" key={section.category}>
            <h3>{section.category}</h3>

            <div className="faq-list">
              {section.questions.map((faq, questionIndex) => {
                const id = `${sectionIndex}-${questionIndex}`;
                const isOpen = activeQuestion === id;

                return (
                  <div
                    className={`faq-item ${isOpen ? "faq-open" : ""}`}
                    key={id}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleQuestion(id)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={20}
                        className={isOpen ? "faq-chevron-open" : ""}
                      />
                    </button>

                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div className="faqs-contact">
          <h2>Still Have Questions?</h2>
          <p>
            Our team is here to help. Get in touch with us for further assistance.
          </p>
          <a href="/contact" className="faqs-contact-btn">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
