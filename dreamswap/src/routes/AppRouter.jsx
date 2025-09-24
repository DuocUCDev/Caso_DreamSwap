
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home.jsx';
import Catalog from '../pages/Catalog.jsx';
import DreamDetail from '../pages/DreamDetail.jsx';
import Cart from '../pages/Cart.jsx';
import Profile from '../pages/Profile.jsx';
import Reviews from '../pages/Reviews.jsx';
import Blog from '../pages/Blog.jsx';
import Loyalty from '../pages/Loyalty.jsx';
import Tracking from '../pages/Tracking.jsx';

export default function AppRouter(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/dream/:id" element={<DreamDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/loyalty" element={<Loyalty />} />
      <Route path="/tracking" element={<Tracking />} />
    </Routes>
  );
}