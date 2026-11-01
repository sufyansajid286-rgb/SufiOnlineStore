
import { useState } from "react";
import {
  Mail, Phone, MapPin, Clock, Send, MessageCircle
} from "lucide-react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been submitted.");
    setForm({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <span>WE'RE HERE TO HELP</span>
        <h1>Contact Us</h1>
        <p>Have a question or need assistance? We'd love to hear from you.</p>
      </section>

      <section className="contact-container">

        <div className="contact-info">
          <span className="contact-label">GET IN TOUCH</span>
          <h2>Let's Start a Conversation</h2>
          <p className="contact-description">
            Whether you have questions about products, orders or anything
            else, our team is ready to help.
          </p>

          <div className="contact-info-item">
            <div className="contact-icon"><Mail /></div>
            <div>
              <h3>Email Us</h3>
              <p>support@sufionlinestore.com</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon"><Phone /></div>
            <div>
              <h3>Call Us</h3>
              <p>+92 300 1234567</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon"><MapPin /></div>
            <div>
              <h3>Our Location</h3>
              <p>Pakistan</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon"><Clock /></div>
            <div>
              <h3>Working Hours</h3>
              <p>Monday – Saturday, 9 AM – 6 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <div className="contact-form-heading">
            <MessageCircle />
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you.</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">

            <div className="contact-input-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="How can we help?"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Your Message</label>
              <textarea
                name="message"
                placeholder="Write your message here..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              Send Message <Send size={17} />
            </button>

          </form>
        </div>

      </section>
    </div>
  );
}

export default Contact;
