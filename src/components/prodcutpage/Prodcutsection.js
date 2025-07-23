"use client";
import React, { useEffect, useState } from "react";
import "./prodcutpage.css";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
import ListOfProdcut from "./ListOfProdcut";

export default function Prodcutsection({ id }) {
  const globalValue = useSelector((state) => state.global.globalValue);

  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortOption, setSortOption] = useState("Highest Price");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // لتتبع الأخطاء

  // دالة ترتيب المنتجات
  const sortProducts = (option) => {
    let sorted = [...originalProducts];
    if (sorted.length === 0) {
      setProducts([]);
      return;
    }
    try {
      switch (option) {
        case "Highest Price":
          sorted.sort((a, b) => {
            const priceA = parseFloat(a.price) || 0;
            const priceB = parseFloat(b.price) || 0;
            if (isNaN(priceA) || isNaN(priceB)) {
              return 0;
            }
            return priceB - priceA;
          });
          break;
        case "Lowest Price":
          sorted.sort((a, b) => {
            const priceA = parseFloat(a.price) || 0;
            const priceB = parseFloat(b.price) || 0;
            if (isNaN(priceA) || isNaN(priceB)) {
              return 0;
            }
            return priceA - priceB;
          });
          break;
        case "Newest":
          sorted.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
              return 0;
            }
            return dateB - dateA;
          });
          break;
        case "Oldest":
          sorted.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
              return 0;
            }
            return dateA - dateB;
          });
          break;
        default:
          break;
      }
      setProducts(sorted);
    } catch (error) {}
  };

  // جلب البيانات
  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null); // مسح أي أخطاء سابقة
      const res = await fetch(
        `https://shehab.farmin.online/api/products-section/${id}?merchant_id=${globalValue}`
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
      setProducts(records); // عرض البيانات الأصلية فورًا دون ترتيب
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (globalValue && id) {
      fetchData();
    } else {
      setError("globalValue أو id غير موجود");
    }
  }, [globalValue, id]);

  useEffect(() => {
    sortProducts(sortOption); // ترتيب عند تغيير sortOption
  }, [sortOption]);

  return (
    <div className="product-bags">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p style={{ color: "red" }}>خطأ: {error}</p>
      ) : (
        <div className="container">
          <div className="title">
            <h2>{products[0]?.category_name}</h2>
            <ListOfProdcut
              onChange={(option) => {
                setSortOption(option);
              }}
            />
          </div>

          <div className="row">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 75}
                  key={product.slug || index}
                  className="col-lg-3 col-md-4 col-6 prodcut-itme"
                  title={product.name}
                >
                  <Link href={`/prodcut/${product.slug}`}>
                    <div className="best-seller-item">
                      <Image
                        className="best-seller-image"
                        alt={product.name}
                        src={product.cover_Product || "/placeholder-image.jpg"}
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
              ))
            ) : (
              <p>لا توجد منتجات متاحة</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
