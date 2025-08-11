import React, { useContext, useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { ProductContext } from "../context/ProductContext";
import "../css/ProductList.css";

const ProductList = () => {
  const { products, loading, error } = useContext(ProductContext);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false); 

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const highestPrice = useMemo(
    () => Math.max(...products.map((p) => p.price), 0),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      const matchPrice = maxPrice === 0 || p.price <= maxPrice;
      const matchSearch = p.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchCategory && matchPrice && matchSearch;
    });
  }, [products, selectedCategory, maxPrice, searchTerm]);

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="product-list-wrapper">
      {}
      <button
        className="filter-toggle-btn"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? "✖ Close Filters" : "🔍 Show Filters"}
      </button>

      {}
      <aside
        className={`sidebar glass-effect ${
          showFilters ? "sidebar-open" : ""
        }`}
      >
        <h2 className="sidebar-title">🔍 Filter Products</h2>

        {}
        <input
          type="text"
          placeholder="Search products..."
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {}
        <h3 className="filter-label">Categories</h3>
        <ul className="category-list">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`category-item ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>

        {}
        <h3 className="filter-label">Max Price</h3>
        <div className="price-filter">
          <span className="price-value">₹{maxPrice || highestPrice}</span>
          <input
            type="range"
            min="0"
            max={highestPrice}
            value={maxPrice || highestPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-slider"
          />
        </div>
      </aside>

      {}
      <main className="product-list-container">
        <h1 className="product-list-title">🛍 Featured Products</h1>
        <p className="product-list-subtitle">
          Find your perfect match from our curated collection
        </p>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="no-products">No products match your filters 😢</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProductList;
