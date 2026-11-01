
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  Users,
  Award
} from "lucide-react";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      <section className="about-hero">
        <span>GET TO KNOW US</span>
        <h1>About Sufi Online Store</h1>
        <p>
          Your everyday shopping destination, bringing quality,
          style and convenience together.
        </p>
        <Link to="/shop" className="about-btn">
          Explore Our Store
        </Link>
      </section>

      <section className="about-story">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
            alt="Modern shopping store"
          />
        </div>

        <div className="about-content">
          <span>OUR STORY</span>
          <h2>Shopping Made Simple & Enjoyable</h2>
          <p>
            Sufi Online Store is designed to make online shopping
            easy, convenient and enjoyable. We bring different
            product categories together in one place so customers
            can explore and discover products with ease.
          </p>
          <p>
            From fashion and electronics to beauty and home essentials,
            our goal is to provide a smooth and user-friendly shopping
            experience.
          </p>
          <Link to="/categories" className="about-text-link">
            Browse Categories →
          </Link>
        </div>
      </section>

      <section className="about-values">
        <div className="about-section-heading">
          <span>WHY CHOOSE US</span>
          <h2>What Makes Us Different</h2>
          <p>We focus on making every shopping experience better.</p>
        </div>

        <div className="about-values-grid">
          <div className="about-value-card">
            <ShoppingBag />
            <h3>Wide Selection</h3>
            <p>Explore products across multiple shopping categories.</p>
          </div>

          <div className="about-value-card">
            <ShieldCheck />
            <h3>Quality Focus</h3>
            <p>Discover products selected with quality in mind.</p>
          </div>

          <div className="about-value-card">
            <Truck />
            <h3>Easy Shopping</h3>
            <p>Enjoy a simple and convenient online shopping journey.</p>
          </div>

          <div className="about-value-card">
            <Heart />
            <h3>Customer First</h3>
            <p>We aim to make shopping comfortable for everyone.</p>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div>
          <Users />
          <h3>Customer Focus</h3>
          <p>Designed Around You</p>
        </div>
        <div>
          <Award />
          <h3>Quality</h3>
          <p>Our Priority</p>
        </div>
        <div>
          <ShoppingBag />
          <h3>Multiple Categories</h3>
          <p>All in One Place</p>
        </div>
      </section>

      <section className="about-cta">
        <h2>Ready to Discover Something New?</h2>
        <p>Explore our collection and find products you'll love.</p>
        <Link to="/shop" className="about-btn">
          Start Shopping →
        </Link>
      </section>

    </div>
  );
}

export default About;
