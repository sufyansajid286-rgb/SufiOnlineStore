
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Star,
  Plus,
  Pencil,
  Trash2,
  Search,
  Menu,
  X,
  DollarSign,
  ShoppingBag,
  UserRound,
  LogOut,
  Store,
} from "lucide-react";

import productsData from "../data/products";
import "./Admin.css";

const PRODUCT_KEY = "sufiAdminProducts";
const ORDER_KEY = "sufiOrders";
const REVIEW_KEY = "sufiReviews";
const USER_KEY = "sufiUsers";

// Safely read LocalStorage
const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
};

// Save products and notify other pages
const saveProductsToStorage = (updatedProducts) => {
  localStorage.setItem(PRODUCT_KEY, JSON.stringify(updatedProducts));

  window.dispatchEvent(new Event("adminProductsUpdated"));
};

function Admin() {
  const location = useLocation();

  const [section, setSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState(() =>
    readStorage(PRODUCT_KEY, productsData)
  );

  const [orders, setOrders] = useState(() =>
    readStorage(ORDER_KEY, [])
  );

  const [customers] = useState(() =>
    readStorage(USER_KEY, [])
  );

  const [reviews, setReviews] = useState(() =>
    readStorage(REVIEW_KEY, [])
  );

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyProduct = {
    name: "",
    category: "Fashion",
    brand: "",
    price: "",
    oldPrice: "",
    rating: 5,
    reviews: 0,
    image: "",
    badge: "",
  };

  const [form, setForm] = useState(emptyProduct);

  // Change active admin section
  useEffect(() => {
    const path = location.pathname.split("/")[2] || "dashboard";
    setSection(path);
    setSidebarOpen(false);
    setSearch("");
  }, [location.pathname]);

  // Save orders
  useEffect(() => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event("ordersUpdated"));
  }, [orders]);

  // Save reviews
  useEffect(() => {
    localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews));
  }, [reviews]);

  // Navigation items
  const navItems = [
    { name: "Dashboard", path: "dashboard", icon: LayoutDashboard },
    { name: "Products", path: "products", icon: Package },
    { name: "Orders", path: "orders", icon: ShoppingCart },
    { name: "Customers", path: "customers", icon: Users },
    { name: "Reviews", path: "reviews", icon: Star },
  ];

  const goTo = (path) => `/admin/${path}`;

  // Dashboard calculations
  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  // Search filters
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.category} ${product.brand || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredOrders = orders.filter((order) =>
    `${order.orderId} ${order.customer?.name || ""} ${order.customer?.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name || ""} ${customer.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Open add product form
  const openAddForm = () => {
    setForm({ ...emptyProduct });
    setEditingId(null);
    setShowForm(true);
  };

  // Open edit product form
  const openEditForm = (product) => {
    setForm({
      ...emptyProduct,
      ...product,
      price: product.price ?? "",
      oldPrice: product.oldPrice ?? "",
    });

    setEditingId(product.id);
    setShowForm(true);
  };

  // Add or update product
  const saveProduct = (e) => {
    e.preventDefault();

    const product = {
      ...form,
      id: editingId ?? Date.now(),
      price: Number(form.price),
      oldPrice: Number(form.oldPrice || 0),
      rating: Number(form.rating || 5),
      reviews: Number(form.reviews || 0),
    };

    let updatedProducts;

    if (editingId !== null) {
      updatedProducts = products.map((item) =>
        String(item.id) === String(editingId)
          ? product
          : item
      );
    } else {
      updatedProducts = [product, ...products];
    }

    // Save immediately to LocalStorage
    saveProductsToStorage(updatedProducts);

    // Update React state
    setProducts(updatedProducts);

    setShowForm(false);
    setForm({ ...emptyProduct });
    setEditingId(null);
  };

  // Delete product
  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    const updatedProducts = products.filter(
      (product) => String(product.id) !== String(id)
    );

    saveProductsToStorage(updatedProducts);
    setProducts(updatedProducts);
  };

  // Update order status
  const updateOrderStatus = (orderId, status) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.orderId === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  // Delete review
  const deleteReview = (id) => {
    if (!window.confirm("Delete this review?")) {
      return;
    }

    setReviews((previousReviews) =>
      previousReviews.filter(
        (review) => String(review.id) !== String(id)
      )
    );
  };

  // Format price
  const formatPrice = (amount) =>
    `Rs. ${Number(amount || 0).toLocaleString("en-PK")}`;

  const pageTitle = {
    dashboard: "Dashboard",
    products: "Products Management",
    orders: "Orders Management",
    customers: "Customers Management",
    reviews: "Reviews Management",
  }[section] || "Dashboard";

  return (
    <div className="admin-panel">

      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${
          sidebarOpen ? "admin-sidebar-open" : ""
        }`}
      >
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <Store size={23} />
          </div>

          <div>
            <h2>Sufi Store</h2>
            <span>ADMIN PANEL</span>
          </div>

          <button
            className="admin-close-sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <p className="admin-nav-label">MENU</p>

        <nav className="admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={goTo(item.path)}
                className={
                  section === item.path ? "admin-nav-active" : ""
                }
              >
                <Icon size={19} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/">
            <Store size={18} />
            View Store
          </Link>

          <Link to="/login">
            <LogOut size={18} />
            Customer Login
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">

        {/* Topbar */}
        <header className="admin-topbar">
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div>
            <h1>{pageTitle}</h1>
            <p>Welcome to Sufi Online Store administration</p>
          </div>

          <div className="admin-profile">
            <div className="admin-profile-icon">
              <UserRound size={20} />
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Store Manager</span>
            </div>
          </div>
        </header>

        <div className="admin-content">

          {/* Dashboard */}
          {section === "dashboard" && (
            <>
              <div className="admin-welcome">
                <div>
                  <span>STORE OVERVIEW</span>
                  <h2>Welcome to your dashboard!</h2>
                  <p>
                    Here is what's happening with your store today.
                  </p>
                </div>

                <ShoppingBag size={52} />
              </div>

              <div className="admin-stats-grid">

                <div className="admin-stat-card">
                  <div className="admin-stat-icon blue">
                    <DollarSign />
                  </div>
                  <span>Total Revenue</span>
                  <h2>{formatPrice(totalRevenue)}</h2>
                  <small>Based on saved orders</small>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon purple">
                    <ShoppingCart />
                  </div>
                  <span>Total Orders</span>
                  <h2>{orders.length}</h2>
                  <small>All recorded orders</small>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon green">
                    <Package />
                  </div>
                  <span>Total Products</span>
                  <h2>{products.length}</h2>
                  <small>Products in admin list</small>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon orange">
                    <Users />
                  </div>
                  <span>Total Customers</span>
                  <h2>{customers.length}</h2>
                  <small>Registered demo users</small>
                </div>

              </div>

              <div className="admin-panel-card">
                <div className="admin-card-heading">
                  <div>
                    <h3>Recent Orders</h3>
                    <p>Latest customer orders</p>
                  </div>

                  <Link to={goTo("orders")}>View All</Link>
                </div>

                {orders.length === 0 ? (
                  <div className="admin-empty">
                    No orders have been placed yet.
                  </div>
                ) : (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orders.slice(-5).reverse().map((order) => (
                          <tr key={order.orderId}>
                            <td>#{order.orderId}</td>
                            <td>
                              {order.customer?.name || "Customer"}
                            </td>
                            <td>{order.date || "—"}</td>
                            <td>{formatPrice(order.total)}</td>
                            <td>
                              <span className="admin-status">
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Products Management */}
          {section === "products" && (
            <div className="admin-panel-card">

              <div className="admin-card-heading">
                <div>
                  <h3>All Products</h3>
                  <p>Add, edit and manage store products</p>
                </div>

                <button
                  className="admin-primary-btn"
                  onClick={openAddForm}
                >
                  <Plus size={17} />
                  Add Product
                </button>
              </div>

              <div className="admin-search">
                <Search size={18} />

                <input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map((product) => {
                      const imageUrl = product.image?.startsWith("http")
                        ? product.image
                        : `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=100&q=80`;

                      return (
                        <tr key={product.id}>
                          <td>
                            <div className="admin-product-cell">
                              <img
                                src={imageUrl}
                                alt={product.name}
                              />
                              <strong>{product.name}</strong>
                            </div>
                          </td>

                          <td>{product.category}</td>

                          <td>{formatPrice(product.price)}</td>

                          <td>
                            <div className="admin-actions">
                              <button
                                onClick={() => openEditForm(product)}
                                title="Edit"
                              >
                                <Pencil size={17} />
                              </button>

                              <button
                                className="admin-delete"
                                onClick={() => deleteProduct(product.id)}
                                title="Delete"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="admin-empty">
                    No products found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders Management */}
          {section === "orders" && (
            <div className="admin-panel-card">

              <div className="admin-card-heading">
                <div>
                  <h3>All Orders</h3>
                  <p>Manage customer orders and delivery status</p>
                </div>
              </div>

              <div className="admin-search">
                <Search size={18} />

                <input
                  placeholder="Search order or customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.orderId}>
                        <td>#{order.orderId}</td>

                        <td>
                          <strong>
                            {order.customer?.name || "Customer"}
                          </strong>
                          <small className="admin-subtext">
                            {order.customer?.email}
                          </small>
                        </td>

                        <td>{order.date || "—"}</td>
                        <td>{formatPrice(order.total)}</td>

                        <td>
                          <select
                            className="admin-status-select"
                            value={order.status || "Order Placed"}
                            onChange={(e) =>
                              updateOrderStatus(
                                order.orderId,
                                e.target.value
                              )
                            }
                          >
                            {[
                              "Order Placed",
                              "Processing",
                              "Shipped",
                              "Out for Delivery",
                              "Delivered",
                              "Cancelled",
                            ].map((status) => (
                              <option key={status}>{status}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredOrders.length === 0 && (
                  <div className="admin-empty">
                    No orders found.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Customers Management */}
          {section === "customers" && (
            <div className="admin-panel-card">

              <div className="admin-card-heading">
                <div>
                  <h3>Registered Customers</h3>
                  <p>View customer accounts</p>
                </div>
              </div>

              <div className="admin-search">
                <Search size={18} />

                <input
                  placeholder="Search customers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredCustomers.map((customer, index) => (
                      <tr key={customer.email || index}>
                        <td>
                          <div className="admin-customer-cell">
                            <div>
                              <UserRound size={18} />
                            </div>
                            <strong>{customer.name}</strong>
                          </div>
                        </td>

                        <td>{customer.email}</td>
                        <td>{customer.phone || "Not provided"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredCustomers.length === 0 && (
                  <div className="admin-empty">
                    No customers registered yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reviews Management */}
          {section === "reviews" && (
            <div className="admin-panel-card">

              <div className="admin-card-heading">
                <div>
                  <h3>Customer Reviews</h3>
                  <p>Manage reviews submitted by customers</p>
                </div>
              </div>

              {reviews.length === 0 ? (
                <div className="admin-empty">
                  No reviews available yet. Reviews will appear here
                  when added to the store.
                </div>
              ) : (
                <div className="admin-reviews-list">
                  {reviews.map((review) => (
                    <div className="admin-review" key={review.id}>
                      <div>
                        <strong>
                          {review.name || "Customer"}
                        </strong>

                        <div className="admin-stars">
                          {"★".repeat(
                            Math.max(
                              0,
                              Math.min(5, Number(review.rating) || 0)
                            )
                          )}
                        </div>

                        <p>{review.comment || review.text}</p>
                      </div>

                      <button
                        className="admin-delete"
                        onClick={() => deleteReview(review.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Add / Edit Product Modal */}
      {showForm && (
        <div className="admin-modal-backdrop">

          <form
            className="admin-product-form"
            onSubmit={saveProduct}
          >

            <div className="admin-modal-heading">
              <div>
                <h2>
                  {editingId !== null ? "Edit Product" : "Add New Product"}
                </h2>
                <p>Enter product information below</p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
              >
                <X size={21} />
              </button>
            </div>

            <label>Product Name</label>
            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Enter product name"
            />

            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            >
              {[
                "Fashion",
                "Electronics",
                "Beauty",
                "Home & Living",
                "Accessories",
              ].map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <label>Brand</label>
            <input
              value={form.brand}
              onChange={(e) =>
                setForm({ ...form, brand: e.target.value })
              }
              placeholder="Brand name"
            />

            <div className="admin-form-row">
              <div>
                <label>Price (Rs.)</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: e.target.value })
                  }
                  placeholder="Price"
                />
              </div>

              <div>
                <label>Old Price (Rs.)</label>
                <input
                  type="number"
                  min="0"
                  value={form.oldPrice}
                  onChange={(e) =>
                    setForm({ ...form, oldPrice: e.target.value })
                  }
                  placeholder="Old price"
                />
              </div>
            </div>

            <label>Image URL or Unsplash Photo ID</label>
            <input
              value={form.image}
              onChange={(e) =>
                setForm({ ...form, image: e.target.value })
              }
              placeholder="Paste image URL or photo ID"
            />

            <label>Badge (optional)</label>
            <input
              value={form.badge}
              onChange={(e) =>
                setForm({ ...form, badge: e.target.value })
              }
              placeholder="e.g. New, Sale, Best Seller"
            />

            <div className="admin-modal-actions">
              <button
                type="button"
                className="admin-cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="admin-primary-btn"
              >
                <Plus size={17} />
                {editingId !== null ? "Save Changes" : "Add Product"}
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}

export default Admin;
