
import { useEffect, useMemo, useState } from "react";
import "./Shop.css";
import { Link } from "react-router-dom";

import {
  Search,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
  Check,
} from "lucide-react";

import products from "../data/products";

// Get products saved by Admin, otherwise use default products
const getStoreProducts = () => {
  try {
    const savedProducts = localStorage.getItem("sufiAdminProducts");

    if (savedProducts !== null) {
      const parsedProducts = JSON.parse(savedProducts);
      return Array.isArray(parsedProducts) ? parsedProducts : products;
    }

    return products;
  } catch (error) {
    console.error("Error loading products:", error);
    return products;
  }
};

// Get wishlist safely
const getWishlist = () => {
  try {
    return JSON.parse(localStorage.getItem("sufiWishlist") || "[]");
  } catch {
    return [];
  }
};

function Shop() {
  const [allProducts, setAllProducts] = useState(getStoreProducts);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const [wishlist, setWishlist] = useState(getWishlist);
  const [message, setMessage] = useState("");

  // Listen for Admin product updates
  useEffect(() => {
    const updateProducts = () => {
      try {
        const savedProducts = localStorage.getItem("sufiAdminProducts");

        if (savedProducts !== null) {
          const parsedProducts = JSON.parse(savedProducts);

          setAllProducts(
            Array.isArray(parsedProducts) ? parsedProducts : products
          );
        } else {
          setAllProducts(products);
        }

        setPage(1);
      } catch (error) {
        console.error("Error updating products:", error);
      }
    };

    window.addEventListener("adminProductsUpdated", updateProducts);
    window.addEventListener("storage", updateProducts);

    // Load latest products when Shop opens
    updateProducts();

    return () => {
      window.removeEventListener("adminProductsUpdated", updateProducts);
      window.removeEventListener("storage", updateProducts);
    };
  }, []);

  // Listen for wishlist updates
  useEffect(() => {
    const updateWishlist = () => {
      setWishlist(getWishlist());
    };

    window.addEventListener("wishlistUpdated", updateWishlist);
    window.addEventListener("storage", updateWishlist);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlist);
      window.removeEventListener("storage", updateWishlist);
    };
  }, []);

  // Dynamic categories from Admin products
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        allProducts
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [allProducts]);

  // Dynamic brands from Admin products
  const brands = useMemo(() => {
    const uniqueBrands = [
      ...new Set(
        allProducts
          .map((item) => item.brand)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueBrands];
  }, [allProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      const productName = product.name || "";
      const productCategory = product.category || "";
      const productBrand = product.brand || "";

      const matchesSearch =
        productName.toLowerCase().includes(search.toLowerCase()) ||
        productCategory.toLowerCase().includes(search.toLowerCase()) ||
        productBrand.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || productCategory === category;

      const matchesBrand =
        brand === "All" || productBrand === brand;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        Number(product.price || 0) <= maxPrice &&
        Number(product.rating || 0) >= minRating
      );
    });

    if (sort === "low") {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sort === "high") {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
    }

    return result;
  }, [
    allProducts,
    search,
    category,
    brand,
    maxPrice,
    minRating,
    sort,
  ]);

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const displayedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  function changeFilter(callback, value) {
    callback(value);
    setPage(1);
  }

  // Wishlist
  function toggleWishlist(id) {
    const updated = wishlist.some(
      (item) => String(item) === String(id)
    )
      ? wishlist.filter((item) => String(item) !== String(id))
      : [...wishlist, id];

    setWishlist(updated);

    localStorage.setItem("sufiWishlist", JSON.stringify(updated));

    window.dispatchEvent(new Event("wishlistUpdated"));
  }

  // Add to Cart
  function addToCart(product) {
    try {
      const cart = JSON.parse(localStorage.getItem("sufiCart") || "[]");

      const existing = cart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existing) {
        existing.quantity = Number(existing.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("sufiCart", JSON.stringify(cart));

      window.dispatchEvent(new Event("cartUpdated"));

      setMessage(`${product.name} added to cart!`);

      setTimeout(() => setMessage(""), 2500);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setMessage("Unable to add product to cart.");
    }
  }

  // Reset Filters
  function resetFilters() {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setMaxPrice(1000000);
    setMinRating(0);
    setSort("featured");
    setPage(1);
  }

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-PK");

  return (
    <div className="shop-page">

      {/* Shop Banner */}
      <div className="shop-banner">
        <div className="container">
          <span className="eyebrow">SUFI ONLINE STORE</span>

          <h1>Explore Our Collection</h1>

          <p>Discover products you'll love, all in one place.</p>

          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>Shop</span>
          </div>
        </div>
      </div>

      <div className="container shop-layout">

        {/* Sidebar Filters */}
        <aside className="shop-sidebar">

          <div className="filter-heading">
            <h3>
              <SlidersHorizontal size={19} /> Filters
            </h3>

            <button onClick={resetFilters}>Reset</button>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <h4>Categories</h4>

            {categories.map((item) => (
              <label className="filter-option" key={item}>
                <input
                  type="radio"
                  name="category"
                  checked={category === item}
                  onChange={() => changeFilter(setCategory, item)}
                />

                {item}
              </label>
            ))}
          </div>

          {/* Brands */}
          <div className="filter-group">
            <h4>Brand</h4>

            {brands.map((item) => (
              <label className="filter-option" key={item}>
                <input
                  type="radio"
                  name="brand"
                  checked={brand === item}
                  onChange={() => changeFilter(setBrand, item)}
                />

                {item}
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <h4>Maximum Price</h4>

            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={maxPrice}
              onChange={(e) =>
                changeFilter(setMaxPrice, Number(e.target.value))
              }
            />

            <div className="price-range-label">
              <span>Rs. 1,000</span>

              <strong>
                Rs. {maxPrice.toLocaleString("en-PK")}
              </strong>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <h4>Customer Rating</h4>

            {[4, 3, 2, 1].map((rating) => (
              <label className="filter-option" key={rating}>
                <input
                  type="radio"
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => changeFilter(setMinRating, rating)}
                />

                {rating}+

                <Star
                  size={13}
                  fill="#f5a623"
                  color="#f5a623"
                />
              </label>
            ))}
          </div>

        </aside>

        {/* Shop Content */}
        <section className="shop-content">

          <div className="shop-topbar">
            <div>
              <h2>All Products</h2>
              <p>{filteredProducts.length} products found</p>
            </div>

            <select
              value={sort}
              onChange={(e) => changeFilter(setSort, e.target.value)}
            >
              <option value="featured">Sort: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {/* Search */}
          <div className="shop-search">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search products by name, brand or category..."
              value={search}
              onChange={(e) => changeFilter(setSearch, e.target.value)}
            />

            {search && (
              <button onClick={() => changeFilter(setSearch, "")}>
                <X size={18} />
              </button>
            )}
          </div>

          {/* Active Filters */}
          <div className="active-filters">
            {category !== "All" && <span>{category}</span>}
            {brand !== "All" && <span>{brand}</span>}
            {minRating > 0 && <span>{minRating}+ Stars</span>}

            {maxPrice < 1000000 && (
              <span>
                Under Rs. {maxPrice.toLocaleString("en-PK")}
              </span>
            )}
          </div>

          {/* Product Grid */}
          {displayedProducts.length > 0 ? (
            <div className="shop-product-grid">

              {displayedProducts.map((product) => {
                const discount =
                  Number(product.oldPrice) > Number(product.price) &&
                  Number(product.oldPrice) > 0
                    ? Math.round(
                        ((Number(product.oldPrice) -
                          Number(product.price)) /
                          Number(product.oldPrice)) *
                          100
                      )
                    : 0;

                const imageUrl = product.image?.startsWith("http")
                  ? product.image
                  : `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=600&q=85`;

                const isWishlisted = wishlist.some(
                  (item) => String(item) === String(product.id)
                );

                return (
                  <article
                    className="shop-product-card"
                    key={product.id}
                  >
                    <div className="product-image">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        loading="lazy"
                      />

                      {product.badge && (
                        <span className="product-badge">
                          {product.badge}
                        </span>
                      )}

                      {discount > 0 && (
                        <span className="discount-badge">
                          {discount}% OFF
                        </span>
                      )}

                      <button
                        className={`wishlist-btn ${
                          isWishlisted ? "wish-active" : ""
                        }`}
                        onClick={() => toggleWishlist(product.id)}
                        aria-label="Toggle wishlist"
                      >
                        <Heart
                          size={19}
                          fill={isWishlisted ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="product-info">
                      <span className="product-category">
                        {product.category}
                      </span>

                      <h3>{product.name}</h3>

                      <div className="product-rating">
                        <Star
                          size={14}
                          fill="#f5a623"
                          color="#f5a623"
                        />

                        <strong>{product.rating || 0}</strong>

                        <span>
                          ({product.reviews || 0} reviews)
                        </span>
                      </div>

                      <div className="product-pricing">
                        <strong>
                          Rs. {formatPrice(product.price)}
                        </strong>

                        {Number(product.oldPrice) >
                          Number(product.price) && (
                          <del>
                            Rs. {formatPrice(product.oldPrice)}
                          </del>
                        )}
                      </div>

                      <Link
                        to={`/product/${product.id}`}
                        className="view-details-btn"
                      >
                        View Details
                      </Link>

                      <button
                        className="add-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingBag size={16} /> Add to Cart
                      </button>
                    </div>
                  </article>
                );
              })}

            </div>
          ) : (
            <div className="no-products">
              <Search size={38} />

              <h3>No products found</h3>

              <p>Try changing your search or filters.</p>

              <button className="primary-btn" onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="shop-pagination">

              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, i) => i + 1
              ).map((number) => (
                <button
                  key={number}
                  className={page === number ? "page-active" : ""}
                  onClick={() => setPage(number)}
                >
                  {number}
                </button>
              ))}

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </button>

            </div>
          )}

        </section>
      </div>

      {/* Toast Message */}
      {message && (
        <div className="shop-toast">
          <Check size={18} /> {message}
        </div>
      )}

    </div>
  );
}

export default Shop;
