"use client";
import React, { useEffect, useState, useCallback } from "react";
import "./prodcutpage.css";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
import ListOfProdcut from "./ListOfProdcut";

export default function Prodcuts() {
  const globalValue = useSelector((state) => state.global.globalValue);

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("Highest Rate");
  const [isLoading, setIsLoading] = useState(false);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchData = useCallback(
    async (page = 1) => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://shehab.farmin.online/api/products?merchant_id=${globalValue}&page=${page}`
        );
        const result = await res.json();

        let records = result?.data?.records || [];
        const pagination = result?.data?.["pagination links"];

        setProducts(records);
        setOriginalProducts(records);
        setCurrentPage(pagination?.["current page"] || 1);
        const total = pagination?.total || records.length;
        const perPage = pagination?.["per page"] || 10;
        setTotalPages(Math.ceil(total / perPage));
      } catch (error) {
        // console.error("fetch error", error);
      } finally {
        setIsLoading(false);
      }
    },
    [globalValue]
  );

  const sortProducts = useCallback(
    (option) => {
      let sorted = [...originalProducts];
      switch (option) {
        case "Highest Price":
          sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case "Lowest Price":
          sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "Newest":
          sorted.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          break;
        case "Oldest":
          sorted.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );
          break;
        case "Highest Rate":
          break;
        default:
          break;
      }
      setProducts(sorted);
    },
    [originalProducts]
  );

  useEffect(() => {
    if (globalValue) {
      fetchData(currentPage);
    }
  }, [globalValue, currentPage, fetchData]);

  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption, sortProducts]);

  // ✅ لما يضغط أي زر صفحة، نغير الصفحة ونطلع لفوق
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage);
    scrollToTop();
  };

  return (
    <div className="product-bags">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="title">
            <h2>PRODUCTS</h2>
            <ListOfProdcut onChange={setSortOption} />
          </div>

          <div className="row">
            {products.map((product, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 75}
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

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="pagination mt-4 text-center">
              {/* السابق */}
              <button
                className="pagination-button"
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              >
                prev
              </button>

              {/* أرقام الصفحات */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(currentPage - page) <= 1
                )
                .map((page, i, arr) => {
                  const prevPage = arr[i - 1];
                  const showDots = prevPage && page - prevPage > 1;

                  return (
                    <React.Fragment key={page}>
                      {showDots && (
                        <span className="pagination-dots">...</span>
                      )}
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

              {/* التالي */}
              <button
                className="pagination-button"
                onClick={() =>
                  handlePageChange(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
