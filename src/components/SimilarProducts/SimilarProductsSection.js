import React from "react";
import Bestseller_itme from "@/components/bestseller/Bestseller_itme";
import Link from "next/link";
import Image from "next/image";

export default function SimilarProductsSection() {
  return (
    <div className="container">
      <div className="best-seller">
        <div className="title">
          <h2>Similar Products</h2>
          <div className="link">
            <Link href={"/"}>More</Link>
          </div>
        </div>

        <div className="row">
          <div
            className="col-lg-3 col-md-4 col-6  prodcut-itme"
            title="best-seller"
          >
            <Link href={"/products/5"}>
              <div className="best-seller-item">
                <Image
                  className="best-seller-image"
                  alt="best-seller"
                  src="/imges/p1.webp"
                  width={205}
                  height={225}
                />
                <h6>Art Deco</h6>
                <div className="price">
                  <p className="best-seller-price">150 SAR</p>
                  <p className="best-seller-old-price">
                    <del>100 SAR</del>
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <Bestseller_itme />
          <Bestseller_itme />
          <Bestseller_itme />
          <Bestseller_itme />
          {/* <Bestseller_itme /> */}
        </div>
      </div>
    </div>
  );
}
