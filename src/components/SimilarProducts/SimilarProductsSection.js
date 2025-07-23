"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import "./SimilarProducts.css";

export default function SimilarProductsSection({ sectionId }) {
  const globalValue = useSelector((state) => state.global.globalValue);

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(
        `https://shehab.farmin.online/api/products-section/${sectionId}?merchant_id=${globalValue}`
      );
      if (!res.ok) {
        throw new Error(`فشل الطلب: ${res.status} - ${res.statusText}`);
      }
      const result = await res.json();

      let records = result?.data?.records || result?.data || [];
      if (!Array.isArray(records)) {
        records = [];
      }
      setOriginalProducts(records);
      setProducts(records);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (globalValue && sectionId) {
      fetchData();
    } else {
      setError("globalValue أو sectionId غير موجود");
    }
  }, [globalValue, sectionId]);

  return (
    <div className="container">
      <div className="product-bags">
        <div className="title">
          <h2>Similar Products</h2>
          <div className="link">
            <Link
              href={`/prodcutsection/${sectionId}`}
              style={{ color: "black" }}
            >
              More
            </Link>
          </div>
        </div>

        {isLoading ? (
          <p>جاري التحميل...</p>
        ) : error ? (
          <p style={{ color: "red" }}>خطأ: {error}</p>
        ) : (
          <div className="row">
            {Array.isArray(products) && products.length > 0 ? (
              products.slice(0, 8).map((product, index) => (
                <div
                  key={product.slug || index}
                  className="col-lg-3 col-md-4 col-6 prodcut-itme"
                  title={product.name}
                  data-aos="fade-up"
                  data-aos-delay={index * 75}
                >
                  <Link href={`/prodcut/${product.slug}`}>
                    <div className="best-seller-item">
                      <Image
                        className="best-seller-image"
                        alt={product.name || "منتج"}
                        src={product.cover_Product}
                        width={205}
                        height={225}
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
              ))
            ) : (
              <p>لا توجد منتجات مشابهة متاحة</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
