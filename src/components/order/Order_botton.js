// components/OrderInvoice.js
"use client";
import React, { useState } from "react";
import "./order.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Order_botton = () => {
  const [openReturn, setOpenReturn] = useState(false);

  return (
    <div className="order_invoice_container">
      <div className="invoice-wrapper">
        <div className="invoice-header">
          <Image
            width={300}
            height={300}
            quality={100}
            className="logo"
            src="/imges/1734867857871947837.webp"
            alt="..."
          />
          <button
            title="https://default-theme.myeasyorders.com/track/37128f3d-e666-44cf-98e3-675e8a1d2ca6"
            className="tracking-btn"
          >
            Click here to copy tracking link
          </button>
        </div>

        <div className="invoice-grid">
          <div className="invoice-left">
            <div className="invoice-address">
              <p>default-theme</p>
              <div className="address">
                <a href="tel:01000000000">
                  <span className="label">Phone : </span>01000000000
                </a>
              </div>
              <div className="address">
                <a href="mailto:info@easy-orders.com">
                  <span className="label">Email : </span>info@easy-orders.com
                </a>
              </div>
              <div className="address">
                <span className="label">Address : </span> SOdic\ZAyed
              </div>
            </div>

            <div className="invoice-box">
              <h3>Shipping Details</h3>
              <div className="shipping-details">
                <div>
                  <span>Name:</span> mohammed01
                </div>
                <div>
                  <span>Phone:</span> 0101001101021
                </div>
                <div>
                  <span>Email:</span>{" "}
                </div>
                <div>
                  <span>Country:</span>{" "}
                </div>
                <div>
                  <span>Government:</span> جازان
                </div>
                <div>
                  <span>Address:</span> ljbjb,j
                </div>
                <div>
                  <span>Payment Details:</span> cod
                </div>
              </div>
            </div>

            <div className="infoSections">
              <div className="infoSection">
                <button
                  className="infoButton"
                  onClick={() => setOpenReturn(!openReturn)}
                >
                  <span className="infoButtonContent">
                    <Image
                      width={100}
                      height={100}
                      src={"/imges/return-arrow.svg"}
                      alt="..."
                      className="infoIcon"
                    />
                    Request a Return | Exchange
                  </span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`chevronIcon ${openReturn ? "rotate" : ""}`}
                  />
                </button>
                {openReturn && (
                  <div className="infoContent">
                    <p className="m-0">
                      Exchanges: Exchanges are available through our Exchange
                      Request Form kindly fill the form and we will process your
                      exchange order. You can exchange Both sizes and products.
                      Exchanges are subject to 40 EGP shipping fees. ( Price
                      difference in the exchange order has to higher than or the
                      same as your initial purchase).
                    </p>
                    <p>
                      Refunds: Refunds are available for in any of our stores
                      within 14 of your delivery. You can Refund for any reason.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <ul className="invoice-timeline">
              <li>Order Created</li>
              <span>4/27/2025, 4:01:54 PM</span>
            </ul>
          </div>

          <div className="invoice-right">
            <div className="order-status-box">
              <div className="order-status">
                <h6 className="status-title">Order Status : </h6>
                <h6 className="status-value">Pending</h6>
              </div>

              {[
                {
                  img: "/imges/p1.webp",
                  name: "Art Deco",
                  count: 2,
                  price: 150,
                },
                {
                  img: "/imges/p2.webp",
                  name: "Art Deco",
                  count: 1,
                  price: 150,
                },
                {
                  img: "/imges/p1.webp",
                  name: "Art Deco",
                  count: 1,
                  price: 150,
                },
                {
                  img: "/imges/p1.webp",
                  name: "Art Deco",
                  count: 4,
                  price: 150,
                },
              ].map((item, index) => (
                <div key={index} className="product-item">
                  <Image
                    width={300}
                    height={300}
                    quality={100}
                    src={item.img}
                    alt={item.name}
                    className="product-img"
                  />
                  <div className="product-info">
                    <div>
                      <h4>{item.name}</h4>
                      <p>Items Count: {item.count}</p>
                      <p>Piece Price: {item.price} SAR</p>
                    </div>
                    <p className="total-price">
                      Total {item.count * item.price} SAR
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-box">
              <div>
                <h6>
                  <span>Product Total : </span>
                </h6>
                <h6>1200 SAR</h6>
              </div>
              <div>
                <h6>
                  <span>Shipping Cost : </span>
                </h6>
                <h6>Free Shipping</h6>
              </div>
              <div>
                <h6>
                  <span>Coupon Code : </span>
                </h6>
              </div>
              <div className="total-row">
                <h6>Total:</h6>
                <h6>1200 SAR</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order_botton;
