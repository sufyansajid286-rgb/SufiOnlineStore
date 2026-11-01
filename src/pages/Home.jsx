import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    name: "Fashion",
    description: "Style for every day",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
  },
  {
    name: "Electronics",
    description: "Upgrade your lifestyle",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
  },
  {
    name: "Beauty",
    description: "Feel your best",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600",
  },
  {
    name: "Home & Living",
    description: "Make home beautiful",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600",
  },
];

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above Rs. 5,000",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Safe shopping experience",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Here to help you",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free return policy",
  },
];

function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-content">
          <span className="eyebrow">
            <Sparkles size={15} /> YOUR EVERYDAY SHOPPING DESTINATION
          </span>

          <h1>
            Discover More.
            <br />
            <span>Shop Better.</span>
          </h1>

          <p>
            Explore a world of quality products, exciting collections
            and incredible deals. Everything you need, just a click away.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="primary-btn">
              Explore Collection <ArrowRight size={18} />
            </Link>

            <Link to="/categories" className="secondary-btn">
              Browse Categories
            </Link>
          </div>

          <div className="hero-note">
            <span>✦</span> A better way to shop, every day.
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200"
            alt="Shopping bags and online shopping"
          />
          <div className="hero-image-tag">
            <span>NEW COLLECTION</span>
            <strong>Made for You.</strong>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container benefits-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div className="benefit-item" key={benefit.title}>
                <div className="benefit-icon">
                  <Icon size={23} />
                </div>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="categories-section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE OUR COLLECTIONS</span>
            <h2>Shop by Category</h2>
            <p>Find something you'll love in every collection.</p>
          </div>

          <Link to="/categories" className="text-link">
            View All <ArrowRight size={17} />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              to="/shop"
              className="category-card"
              key={category.name}
            >
              <img src={category.image} alt={category.name} />

              <div className="category-overlay">
                <span>0{index + 1}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="category-arrow">
                  <ArrowRight size={19} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="promo-section container">
        <div className="promo-content">
          <span className="eyebrow">A LITTLE SOMETHING FOR YOU</span>
          <h2>Good Finds.<br />Great Prices.</h2>
          <p>
            Discover your next favourite product from our growing
            collection.
          </p>
          <Link to="/shop" className="primary-btn">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </div>

        <div className="promo-decoration">
          <Sparkles size={90} />
          <span>SUFI<br />STORE</span>
        </div>
      </section>
    </>
  );
}

export default Home;