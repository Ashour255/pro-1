"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./bestseller.css";
import { useSelector } from "react-redux";

export default function Bestseller() {
  const globalValue = useSelector((state) => state.global.globalValue);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://altamyouzkw.com/api/products_best_seller?merchant_id=${globalValue}`,
        {
          revalidate: 0,
        }
      );
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  let bestSeller = data?.data.map((item, index) => {
    return (
      <div
        key={item.slug || index}
        className="col-lg-3 col-md-4 col-6  prodcut-itme"
        title="best-seller"
      >
        <Link href={`prodcut/${item.slug}`}>
          <div className="best-seller-item">
            <Image
              className="best-seller-image"
              alt="best-seller"
              src={item.cover_Product || "/imges/p2.webp"}
              width={205}
              height={225}
            />
            <h6>{item.name}</h6>
            <div className="price">
              <p className="best-seller-price">{item.price} SAR</p>
              <p className="best-seller-old-price">
                <del>{item.price_before} SAR</del>
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="best-seller">
        <div className="title">
          <h2>.Best Seller</h2>
          <div className="link">
            <Link href={"/prodcut"}>More</Link>
          </div>
        </div>
        <div className="row">{bestSeller}</div>
      </div>
    </div>
  );
}
