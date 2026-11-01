import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Admin from "./admin/Admin";
import MyOrders from "./pages/MyOrders";
import FAQs from "./pages/FAQs";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnsRefunds from "./pages/ReturnsRefunds";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/admin" element={<Admin />} />
<Route path="/admin/dashboard" element={<Admin />} />
<Route path="/admin/products" element={<Admin />} />
<Route path="/admin/orders" element={<Admin />} />
<Route path="/admin/customers" element={<Admin />} />
<Route path="/admin/reviews" element={<Admin />} />
<Route path="/my-orders" element={<MyOrders />} />
<Route path="/faqs" element={<FAQs />} />
<Route path="/shipping-policy" element={<ShippingPolicy />} />
<Route path="/returns" element={<ReturnsRefunds />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
<Route path="/signup" element={<Signup />} />
          <Route
            path="*"
            element={
              <div className="not-found">
                <h1>404</h1>
                <p>Page not found.</p>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;