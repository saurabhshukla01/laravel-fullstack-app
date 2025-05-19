import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Order from "./pages/Order";
import UserList from "./components/users/UserList";
import PostList from "./components/posts/PostList";
import CommentList from "./components/comments/CommentList";
import ProductList from "./components/products/ProductList";
import CategoryList from "./components/categories/CategoryList";
import SubCategoryList from "./components/subcategories/SubCategoryList";

function PrivateRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("loggedIn");
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><Order /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
        <Route path="/posts" element={<PrivateRoute><PostList /></PrivateRoute>} />
        <Route path="/comments" element={<PrivateRoute><CommentList /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/categories" element={<PrivateRoute><CategoryList /></PrivateRoute>} />
        <Route path="/subcategories" element={<PrivateRoute><SubCategoryList /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
