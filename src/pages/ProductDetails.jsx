
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Heart,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
} from "lucide-react";

import productsData from "../data/products";
import "./ProductDetails.css";

const PRODUCT_KEY = "sufiAdminProducts";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const [wishlist, setWishlist] = useState(() =>
    JSON.parse(localStorage.getItem("sufiWishlist") || "[]")
  );

  // Load latest product from LocalStorage
  useEffect(() => {
    const loadProduct = () => {
      try {
        const saved = localStorage.getItem(PRODUCT_KEY);

        const allProducts = saved
          ? JSON.parse(saved)
          : productsData;

        const found = allProducts.find(
          (item) => String(item.id) === String(id)
        );

        setProduct(found || null);
      } catch (error) {
        console.error("Product loading error:", error);
        setProduct(null);
      }
    };

    loadProduct();

    window.addEventListener(
      "adminProductsUpdated",
      loadProduct
    );

    window.addEventListener("storage", loadProduct);

    return () => {
      window.removeEventListener(
        "adminProductsUpdated",
        loadProduct
      );

      window.removeEventListener("storage", loadProduct);
    };
  }, [id]);

  // Refresh wishlist
  useEffect(() => {
    const updateWishlist = () => {
      setWishlist(
        JSON.parse(localStorage.getItem("sufiWishlist") || "[]")
      );
    };

    window.addEventListener("wishlistUpdated", updateWishlist);

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        updateWishlist
      );
    };
  }, []);

  if (!product) {
    return (
      <div className="details-not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, this product is not available.</p>
        <Link to="/shop">Back to Shop</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some(
    (item) => String(item) === String(product.id)
  );

  const price = Number(product.price || 0);
  const oldPrice = Number(product.oldPrice || 0);

  const discount =
    oldPrice > price && oldPrice > 0
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : 0;

  // Product image
  const productImage = product.image
    ? product.image.startsWith("http") ||
      product.image.startsWith("/")
      ? product.image
      : `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=1000&q=90`
    : "";

  // Add to cart
  function addToCart() {
    const cart = JSON.parse(
      localStorage.getItem("sufiCart") || "[]"
    );

    const existing = cart.find(
      (item) => String(item.id) === String(product.id)
    );

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        String(item.id) === String(product.id)
          ? {
              ...item,
              ...product,
              quantity: Number(item.quantity || 1) + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity,
        },
      ];
    }

    localStorage.setItem(
      "sufiCart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    setMessage("Product successfully added to your cart!");

    setTimeout(() => setMessage(""), 2500);
  }

  // Toggle wishlist
  function toggleWishlist() {
    const updated = isWishlisted
      ? wishlist.filter(
          (item) => String(item) !== String(product.id)
        )
      : [...wishlist, product.id];

    setWishlist(updated);

    localStorage.setItem(
      "sufiWishlist",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));
  }

  return (
    <div className="product-details-page">

      {/* Breadcrumb */}
      <div className="details-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="container details-container">

        <div className="details-image">
          {productImage && (
            <img
              src={productImage}
              alt={product.name}
            />
          )}

          {discount > 0 && (
            <span className="details-discount">
              {discount}% OFF
            </span>
          )}
        </div>

        <div className="details-info">

          <span className="details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="details-rating">
            <Star fill="#f5a623" color="#f5a623" size={18} />
            <strong>{product.rating || 5}</strong>
            <span>
              ({product.reviews || 0} customer reviews)
            </span>
          </div>

          {/* Dynamic Pricing */}
          <div className="details-pricing">
            <strong>
              Rs. {price.toLocaleString("en-PK")}
            </strong>

            {oldPrice > price && (
              <del>
                Rs. {oldPrice.toLocaleString("en-PK")}
              </del>
            )}

            {discount > 0 && (
              <span>Save {discount}%</span>
            )}
          </div>

          <p className="details-description">
            Discover quality and style with the {product.name}.
            Carefully selected for your everyday needs, this product
            offers excellent value, attractive design and a great
            shopping experience from Sufi Online Store.
          </p>

          <div className="details-meta">

            <p>
              <strong>Brand:</strong>{" "}
              {product.brand || "Sufi Store"}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {product.category}
            </p>

            <p>
              <strong>Availability:</strong>{" "}
              <span className="in-stock">In Stock</span>
            </p>

            <p>
              <strong>SKU:</strong>{" "}
              SUFI-{String(product.id).padStart(4, "0")}
            </p>

          </div>

          {/* Quantity */}
          <div className="quantity-section">
            <strong>Quantity:</strong>

            <div className="quantity-control">

              <button
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
              >
                <Minus size={15} />
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus size={15} />
              </button>

            </div>
          </div>

          {/* Actions */}
          <div className="details-actions">

            <button
              className="details-cart-btn"
              onClick={addToCart}
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <button
              className={`details-wishlist-btn ${
                isWishlisted ? "active" : ""
              }`}
              onClick={toggleWishlist}
              aria-label="Toggle wishlist"
            >
              <Heart
                size={20}
                fill={isWishlisted ? "currentColor" : "none"}
              />
            </button>

          </div>

          {/* Benefits */}
          <div className="details-benefits">

            <div>
              <Truck size={20} />
              <span>Free Shipping</span>
            </div>

            <div>
              <ShieldCheck size={20} />
              <span>Secure Shopping</span>
            </div>

            <div>
              <RotateCcw size={20} />
              <span>Easy Returns</span>
            </div>

          </div>

        </div>
      </div>

      {/* Product Information */}
      <div className="container details-extra">

        <h2>Product Information</h2>

        <p>
          Product: {product.name}
          <br />
          Brand: {product.brand || "Sufi Store"}
          <br />
          Category: {product.category}
          <br />
          Price: Rs. {price.toLocaleString("en-PK")}
          <br />
          Customer Rating: {product.rating || 5} / 5
          <br />
          Customer Reviews: {product.reviews || 0}
        </p>

      </div>

      {/* Toast Message */}
      {message && (
        <div className="details-toast">
          <Check size={18} />
          {message}
        </div>
      )}

    </div>
  );
}

export default ProductDetails;
