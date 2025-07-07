"use client";
import {
  faAngleDown,
  faBars,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../siedbar/Sidebar";
import Sidecart from "@/components/sideCart/Sidecart";
import { useSelector, useDispatch } from "react-redux";
import { setCartOpen } from "@/rit/slices/Cart-slice";

export default function Navbar() {
  const dispatch = useDispatch();
  const [show, setShow] = useState("");
  const cartOpen = useSelector((state) => state.cart.isCartOpen);
  const cartItems = useSelector((state) => state.cart.items) || [];
  const [cartCount, setCartCount] = useState(0); // حالة محلية لـ cartCount
  const globalValue = useSelector((state) => state.global.globalValue);
  const [data, setData] = useState(null);

  // تحديث cartCount بعد الـ Hydration على العميل
  useEffect(() => {
    setCartCount(cartItems.length); // تحديث cartCount بناءً على cartItems
  }, [cartItems]);

  const handleOpenCart = () => {
    dispatch(setCartOpen(true));
  };

  const handleCloseCart = () => {
    dispatch(setCartOpen(false));
  };

  function notshow() {
    if (show) {
      setShow("");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://altamyouzkw.com/api/section-header?merchant_id=${globalValue}`,
        {
          cache: "no-store",
        }
      );
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, [globalValue]);

  let sections = data?.data.map((item, index) => {
    return (
      <Link key={item.slug || index} href={`/prodcutsection/${item.id}`}>
        {item.name}
      </Link>
    );
  });

  return (
    <div className="nav-navbar nav-bar sticky-top">
      <nav className="container default-header-container">
        <div>
          <div className="header-bar">
            <div className="menu-button">
              <div
                className="menu-bar"
                href="#"
                onClick={() => {
                  setShow("show");
                }}
              >
                <FontAwesomeIcon className="menu-icon i" icon={faBars} />
              </div>
            </div>
            <div className="logo mb-2">
              <Link href="/">
                <Image
                  width={85}
                  height={65}
                  className="logo-image"
                  src="/imges/1734867857871947837.webp"
                  alt="Logo"
                  quality={100}
                />
              </Link>
            </div>
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
              <div className="cart-button" onClick={handleOpenCart}>
                <Link className="cart-link" href="#">
                  <span className="cart-count">{cartCount}</span>
                  <Image
                    src="/imges/shopping-bag-svgrepo-com.svg"
                    className="cart-icon i"
                    width={20}
                    height={20}
                    alt="shopping-bag"
                  />
                </Link>
              </div>
            </div>
          </div>

          <div className="header-links">
            <Link href="/prodcut">PRODUCTS</Link>
            {sections}
            <Link href="/refund-policy">Refund policy</Link>
          </div>
        </div>
      </nav>
      <Sidebar show={show} notshow={notshow} />
      {cartOpen && <Sidecart onClose={handleCloseCart} open={cartOpen} />}
    </div>
  );
}