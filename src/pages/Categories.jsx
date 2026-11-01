import { Link } from "react-router-dom";
import {
  Shirt,
  Laptop,
  Sparkles,
  Armchair,
  ArrowRight,
} from "lucide-react";
import products from "../data/products";
import "./Categories.css";

const categories = [
  {
    name: "Fashion",
    number: "01",
    description: "Discover your everyday style.",
    image: "photo-1445205170230-053b83016050",
    icon: Shirt,
  },
  {
    name: "Electronics",
    number: "02",
    description: "Upgrade your lifestyle.",
    image: "photo-1498049794561-7780e7231661",
    icon: Laptop,
  },
  {
    name: "Beauty",
    number: "03",
    description: "Feel beautiful every day.",
    image: "photo-1596462502278-27bfdc403348",
    icon: Sparkles,
  },
  {
    name: "Home & Living",
    number: "04",
    description: "Make your home beautiful.",
    image: "photo-1600210492486-724fe5c67fb0",
    icon: Armchair,
  },
];

function Categories() {
  return (
    <div className="categories-page">
      <section className="categories-banner">
        <div className="container">
          <span>SUFI ONLINE STORE</span>
          <h1>Explore Our Categories</h1>
          <p>Discover products you'll love, all in one place.</p>
          <div className="categories-breadcrumb">
            <Link to="/">Home</Link> / Categories
          </div>
        </div>
      </section>

      <section className="container categories-section">
        <div className="categories-heading">
          <div>
            <span>SHOP YOUR WAY</span>
            <h2>Browse Collections</h2>
            <p>Find exactly what you're looking for.</p>
          </div>
          <span className="category-count">04 COLLECTIONS</span>
        </div>

        <div className="categories-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            const count = products.filter(
              (product) => product.category === category.name
            ).length;

            return (
              <Link
                to={`/shop?category=${encodeURIComponent(category.name)}`}
                className="category-card"
                key={category.name}
              >
                <img
                  src={`https://images.unsplash.com/${category.image}?auto=format&fit=crop&w=900&q=85`}
                  alt={category.name}
                />

                <div className="category-overlay">
                  <span className="category-number">
                    {category.number}
                  </span>

                  <div className="category-card-content">
                    <Icon size={24} />
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="category-products">
                      {count} Products
                    </span>
                  </div>

                  <span className="category-arrow">
                    <ArrowRight size={19} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container category-promo">
        <div>
          <span>YOUR SHOPPING DESTINATION</span>
          <h2>Everything You Need.<br />All in One Place.</h2>
          <p>Explore our growing collection of quality products.</p>
          <Link to="/shop">Explore Shop <ArrowRight size={16} /></Link>
        </div>
        <Sparkles size={90} strokeWidth={1.2} />
      </section>
    </div>
  );
}

export default Categories;