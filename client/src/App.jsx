import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Gallery from "./pages/Gallery";
import Support from "./pages/Support";
import Certifications from "./pages/Certifications";
import TermsPolicy from "./pages/TermsPolicy";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/support" element={<Support />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/legal" element={<TermsPolicy />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;