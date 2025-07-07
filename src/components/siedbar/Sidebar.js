import { faAngleDown, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "./siedbar.css";
import { useSelector } from "react-redux";

export default function Sidebar(props) {
  const [visible, setVisible] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    if (props.show === "show") {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [props.show]);

  const globalValue = useSelector((state) => state.global.globalValue);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://altamyouzkw.com/api/section-header?merchant_id=${globalValue}`,
        {
          revalidate: 0,
        }
      );
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);

  let sections = data?.data.map((item, index) => {
    return (
      // <Link
      //   key={item.slug || index}
      //   onClick={props.notshow}
      //   className="sidebar-link"
      //   href={`${item.slug}`}
      // >
      //   {item.name}
      // </Link>
      <Link
        key={item.slug || index}
        onClick={props.notshow}
        className="sidebar-link link-page"
        href={`/prodcutsection/${item.id}`}
      >
        {item.name}
      </Link>
    );
  });

  if (!visible) return null;
  return (
    <div className={`sidebar ${props.show === "show" ? "show" : "out"}`}>
      <div className="overlay" onClick={props.notshow} aria-hidden="true"></div>
      <div className="sidebar-container">
        <div className="close">
          <FontAwesomeIcon
            onClick={props.notshow}
            className="close-icon"
            icon={faClose}
            style={{ color: "rgb(107 114 128)" }}
          />
        </div>
        <div>
          <p className="sidebar-title">Categories</p>
          <Link
            onClick={props.notshow}
            className="sidebar-link link-page"
            href="/prodcut"
          >
            PRODUCTS
          </Link>
          {sections}
          {/* 
          <Link
            onClick={props.notshow}
            className="sidebar-link link-page"
            href="/shoes"
          >
            SHOES
          </Link>
          <Link
            onClick={props.notshow}
            className="sidebar-link link-page"
            href="/clothes"
          >
            CLOTHES
          </Link> */}
          <p className="sidebar-title">Pages</p>
          {/* <div className="dropdown">
            <div
              className="dropdown-togglee"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              Sections{" "}
              <FontAwesomeIcon
                className={`icon ${openDropdown ? "rotate" : ""}`}
                icon={faAngleDown}
              />
            </div>
            <div className={`dropdown-menuu ${openDropdown ? "" : "hidden"}`}>
              {sections}
              {sections}
              {sections}
              {sections}
            </div>
          </div> */}

          <Link
            onClick={props.notshow}
            className="sidebar-link"
            href="/shipping-policy"
          >
            Shipping Policy
          </Link>
          <Link
            onClick={props.notshow}
            className="sidebar-link"
            href="/refund-policy"
          >
            Refund policy
          </Link>
        </div>
      </div>
    </div>
  );
}
