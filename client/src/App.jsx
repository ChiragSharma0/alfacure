import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import Support from './pages/Support';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('about');
  const [selectedProductId, setSelectedProductId] = useState(1); // Default to first product

  // Handle deep-linking via URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['about', 'products', 'detail', 'gallery', 'support'];
      if (hash && validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        // Default route
        setCurrentPage('about');
      }
    };

    // Run on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'products':
        return <Products setCurrentPage={setCurrentPage} setSelectedProductId={setSelectedProductId} />;
      case 'detail':
        return <ProductDetail selectedProductId={selectedProductId} setCurrentPage={setCurrentPage} setSelectedProductId={setSelectedProductId} />;
      case 'gallery':
        return <Gallery setCurrentPage={setCurrentPage} />;
      case 'support':
        return <Support setCurrentPage={setCurrentPage} />;
      default:
        return <About setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}

export default App;
