"use client";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function Nav() {
  let [show, setshow] = useState("");
  function notshow() {
    if (show) {
      setshow("");
    } else {
    }
  }
  // console.log(window.scrollY)
  let [scrollY, setScrollY] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`nav-navbar nav-bar`}
      style={{
        position: scrollY ? "sticky" : "",
        top: scrollY ? "0" : "",
        width: "100%",
        zIndex: "999999999999999999999999999",
        backgroundColor: "white",
        boxShadow: scrollY ? "0 2px 5px rgba(0, 0, 0, 0.1)" : "",
        transition: "all 0.3s ease",
      }}
    >
      <nav className="container sticky-top  default-header-container">
        <div>
          <div className="header-bar">
            {/* زر القائمة (للأجهزة الصغيرة) */}
            <div className="menu-button">
              <Link
                className="menu-bar"
                href="/"
                onClick={() => {
                  setshow("show");
                }}
              >
                <FontAwesomeIcon className="menu-icon i" icon={faBars} />
              </Link>
              <div>
                <Sidebar show={show} notshow={notshow} />
              </div>
            </div>

            {/* شعار */}
            <div className="logo mb-2">
              <Link href="?">
                <Image
                  width={100}
                  height={0}
                  className="logo-image"
                  src="/imges/1734867857871947837.webp"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* عناصر القائمة (يمين) */}
            <div className="header-right">
              <div className="search-button">
                <Link
                  style={{ display: "flex", fontSize: "20px" }}
                  className="search-link"
                  href="/search"
                >
                  <FontAwesomeIcon
                    className="search-icon i"
                    icon={faMagnifyingGlass}
                  />
                </Link>
              </div>
              <div className="cart-button">
                <Link className="cart-link" href="/cart">
                  <span className="cart-count">0</span>
                  {/* <FontAwesomeIcon className="cart-icon i" icon={faBagShopping} />{" "} */}
                  <Image
                    src={"/imges/shopping-bag-svgrepo-com.svg"}
                    className="cart-icon i"
                    width={20}
                    height={20}
                    alt="shopping-bag"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* روابط إضافية */}
          <div className="header-links">
            <Link href="/collections/BAGS">BAGS</Link>
            <Link href="/collections/SHOES">SHOES</Link>
            <Link href="/collections/CLOTHES">CLOTHES</Link>
            <Link href="/pages/shipping-policy">Shipping policy</Link>
            <Link href="/pages/refund-policy">Refund policy</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
