'use client';
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';
import './bestseller.css';
import { useSelector } from 'react-redux';

export default function Bestseller() {
  const globalValue = useSelector((state) => state.global.globalValue);
  const [data, setData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // ✅ تفعيل AOS بعد التأكد من الكلاينت
  useEffect(() => {
    setIsClient(true);
    AOS.init({ duration: 800, once: true });
  }, []);

  // ✅ جلب بيانات best seller من الـ API
  useEffect(() => {
    if (!globalValue) return;

    fetch(
      `https://shehab.farmin.online/api/products_best_seller?merchant_id=${globalValue}`
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setTimeout(() => AOS.refresh(), 100);
      })
      .catch((err) => console.error(err));
  }, [globalValue]);

  // ✅ منع الريندر على السيرفر لحل مشكلة hydration mismatch
  if (!isClient || !data) return null;

  return (
    <div className="container">
      <div className="best-seller">
        <div className="title">
          <h2>Best Seller</h2>
          <div className="link">
            <Link href="/prodcut">More</Link>
          </div>
        </div>
        <div className="row">
          {data?.data?.map((item, index) => (
            <div
              key={item.slug || index}
              className="aos-init col-lg-3 col-md-4 col-6 prodcut-itme"
              data-aos="fade-up"
              data-aos-delay={index * 75}
            >
              <Link href={`/prodcut/${item.slug}`}>
                <div className="best-seller-item">
                  <Image
                    src={item.cover_Product || '/imges/p2.webp'}
                    width={205}
                    height={225}
                    alt={item.name || 'best-seller'}
                  />
                  <h6>{item.name}</h6>
                  <div className="price">
                    <p className="best-seller-price">{item.price} SAR</p>
                    {item.price_before && (
                      <p className="best-seller-old-price">
                        <del>{item.price_before} SAR</del>
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
