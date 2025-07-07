"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "./default_product.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";

export default function Default_product() {
  
  const globalValue = useSelector((state) => state.global.globalValue);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://altamyouzkw.com/api/products_best_rival?merchant_id=${globalValue}`,
        {
          revalidate: 0,
        }
      );
      const result = await res.json();
      setData(result?.data);
    };
    fetchData();
  }, []);

  return (
    <div className="default-product">
      {!data && <Loading /> }
      <div className="container">
        <div className="title">
          <h2>.</h2>
          <div>
            <Link href={"/product"}>More</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-6 default-itme">
            <div className="default-product-itme-1" title="Art Deco">
              <Link href={`prodcut/${data[0]?.slug}`}>
                <div className="img">
                  <span className="span">{data[0]?.discount_percentage}%</span>
                  <Image
                    src={data[0]?.cover_Product ||  "/imges/p2.webp"}
                    alt=".."
                    className="img-fluid"
                    width={300}
                    height={300}
                    quality={100}
                  />
                </div>
                <div className="content">
                  <h6>{data[0]?.name}</h6>
                  <div className="price">
                    <p className="price-1">{data[0]?.price} SAR</p>
                    <p className="price-2">
                      <del>{data[0]?.price_before} SAR</del>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-lg-3 default-itme">
            <div className="default-product-itme-2" title="Art Deco">
              <Link href={`prodcut/${data[1]?.slug}`}>
                <div className="img">
                  <span className="span">{data[1]?.discount_percentage}%</span>
                  <Image
                    src={data[1]?.cover_Product ||  "/imges/p2.webp"}
                    alt=".."
                    className="img-fluid"
                    width={300}
                    height={300}
                    quality={100}
                  />
                </div>
                <div className="content">
                  <h6>{data[1]?.name}</h6>
                  <div className="price">
                    <p className="price-1">{data[1]?.price} SAR</p>
                    <p className="price-2">
                      <del>{data[1]?.price_before} SAR</del>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="default-product-itme-2" title="Art Deco">
              <Link href={`prodcut/${data[2]?.slug}`}>
                <div className="img">
                  <span className="span">{data[2]?.discount_percentage}%</span>
                  <Image
                    src={data[2]?.cover_Product ||  "/imges/p2.webp"}
                    alt=".."
                    className="img-fluid"
                    width={300}
                    height={300}
                    quality={100}
                  />
                </div>
                <div className="content">
                  <h6>{data[2]?.name}</h6>
                  <div className="price">
                    <p className="price-1">{data[2]?.price} SAR</p>
                    <p className="price-2">
                      <del>{data[2]?.price_before} SAR</del>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6 col-lg-3 default-itme">
            <div className="default-product-itme-2" title="Art Deco">
              <Link href={`prodcut/${data[3]?.slug}`}>
                <div className="img">
                  <span className="span">{data[3]?.discount_percentage}%</span>
                  <Image
                    src={data[3]?.cover_Product ||  "/imges/p2.webp"}
                    alt=".."
                    className="img-fluid"
                    width={300}
                    height={300}
                    quality={100}
                  />
                </div>
                <div className="content">
                  <h6>{data[3]?.name}</h6>
                  <div className="price">
                    <p className="price-1">{data[3]?.price} SAR</p>
                    <p className="price-2">
                      <del>{data[3]?.price_before} SAR</del>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="default-product-itme-2" title="Art Deco">
              <Link href={`prodcut/${data[4]?.slug}`}>
                <div className="img">
                  <span className="span">{data[4]?.discount_percentage}%</span>
                  <Image
                    src={data[4]?.cover_Product ||  "/imges/p2.webp"}
                    alt=".."
                    className="img-fluid"
                    width={300}
                    height={300}
                    quality={100}
                  />
                </div>
                <div className="content">
                  <h6>{data[4]?.name}</h6>
                  <div className="price">
                    <p className="price-1">{data[4]?.price} SAR</p>
                    <p className="price-2">
                      <del>{data[4]?.price_before} SAR</del>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
