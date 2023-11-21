import Login from "./Login";
import { AuthProvider } from "./Auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./route";
import { ProductForm } from "./ProductDetail";
import Products from "./Products";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<ProductForm />} />
            <Route path="/all" element={<Products />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
