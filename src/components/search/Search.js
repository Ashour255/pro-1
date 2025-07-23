"use client";
import React, { useEffect, useState } from "react";
import "./Search.css";
import "../prodcutpage/prodcutpage.css";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";

export default function Search() {
  const globalValue = useSelector((state) => state.global.globalValue);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const perPage = 4;

  const fetchAllProducts = async () => {
    if (!globalValue) return;
    setIsLoading(true);

    try {
      let page = 1;
      let all = [];
      let hasMore = true;

      while (hasMore) {
        const res = await fetch(
          `https://shehab.farmin.online/api/products?merchant_id=${globalValue}&page=${page}`
        );
        const result = await res.json();
        const records = result?.data?.records || [];
        const total = result?.data?.["pagination links"]?.total || 0;
        const perPageAPI = result?.data?.["pagination links"]?.["per page"] || 10;

        all = [...all, ...records];
        page++;

        if (all.length >= total || records.length < perPageAPI) {
          hasMore = false;
        }
      }

      setAllProducts(all);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [globalValue]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(term)
    );

    setFilteredResults(filtered);
    setCurrentPage(1);
    setHasSearched(true);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    if (!hasSearched || !searchTerm.trim()) return;

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageItems = filteredResults.slice(start, end);

    setProducts(pageItems);
    setTotalPages(Math.ceil(filteredResults.length / perPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, filteredResults, hasSearched, searchTerm]);

  return (
    <main className="search-container">
      <div className="full-width">
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <label className="search-label">Search</label>
            <div className="input-container">
              <input
                type="text"
                className="global-input"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button className="search-button" onClick={handleSearchClick}>
            Search
          </button>
        </div>
      </div>

      <div className="product-bags">
        {isLoading && hasSearched && searchTerm.trim() !== "" ? (
          <Loading />
        ) : hasSearched && searchTerm.trim() !== "" && products.length === 0 ? (
          <p className="no-results-message">
            No products found for your search.
          </p>
        ) : hasSearched && searchTerm.trim() !== "" ? (
          <div className="container">
            <div className="row">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-4 col-6 prodcut-itme"
                  title={product.name}
                >
                  <Link href={`/prodcut/${product.slug}`}>
                    <div className="best-seller-item">
                      <Image
                        className="best-seller-image"
                        alt={product.name}
                        src={product.cover_Product || "/no-image.jpg"}
                        width={300}
                        height={300}
                        quality={100}
                      />
                      <h6>{product.name}</h6>
                      <div className="price">
                        <p className="best-seller-price">{product.price} SAR</p>
                        {product.price_before && (
                          <p className="best-seller-old-price">
                            <del>{product.price_before} SAR</del>
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination mt-4 text-center">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(currentPage - page) <= 1
                    );
                  })
                  .map((page, i, arr) => {
                    const prevPage = arr[i - 1];
                    const showDots = prevPage && page - prevPage > 1;

                    return (
                      <React.Fragment key={page}>
                        {showDots && <span className="pagination-dots">...</span>}
                        <button
                          className={`pagination-button ${
                            currentPage === page ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    );
                  })}

                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}
