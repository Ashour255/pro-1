"use client";
import React from "react";
import "./sidecart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faMinus,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
} from "@/rit/slices/Cart-slice";

const Cart = ({ onClose, open }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];

  const productTotal = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + (parseFloat(item.price) || 0) * (item.qty || 0),
      0
    )
  ).toFixed(2);

  const handleIncrease = (item) => {
    dispatch(increaseQuantity({ slug: item.slug }));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity({ slug: item.slug }));
  };

  const handleDelete = (item) => {
    dispatch(deleteFromCart({ slug: item.slug }));
  };
  return (
    <div className="cart-dialog" role="dialog" aria-modal="true">
      <div className="cart-overlay" onClick={onClose} aria-hidden="true"></div>

      <div className="cart-panel-container">
        <div className="cart-panel">
          <div className={`cart-panel-content ${open ? "show" : "out"}`}>
            <div className="cart-items-container">
              {cartItems.length > 0 && (
                <div className="cart-panel-header">
                  <h2 className="cart-panel-title">Cart</h2>
                  <button className="cart-close-button" onClick={onClose}>
                    <FontAwesomeIcon
                      className="close-icon"
                      icon={faClose}
                      style={{ color: "rgb(107 114 128)" }}
                    />
                  </button>
                </div>
              )}
              <ul className="cart-items-list">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <li key={item.slug} className="cart-item">
                      <div className="cart-item-image-container">
                        <Image
                          width={100}
                          height={100}
                          quality={100}
                          src={item.image_Product}
                          alt={item.name}
                          className="cart-item-image"
                        />
                      </div>
                      <div className="cart-item-details">
                        <div className="cart-item-header">
                          <h3>{item.name}</h3>
                          <p className="cart-item-price">{item.price} SAR</p>
                        </div>
                        <div className="cart-item-meta">
                          <p className="cart-item-total">
                            Total {parseFloat(item.price) * item.qty} SAR
                          </p>
                          <div className="cart-quantity-controls">
                            <button
                              className="cart-quantity-button"
                              onClick={() => handleIncrease(item)}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <p className="cart-quantity-value">{item.qty}</p>
                            <button
                              className="cart-quantity-button"
                              onClick={() => handleDecrease(item)}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <button
                              className="cart-delete-button"
                              onClick={() => handleDelete(item)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <div
                    style={{
                      marginTop: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Image
                      src="/imges/Animation -cart.gif"
                      alt="Empty Cart"
                      width={150}
                      height={170}
                      className="mb-4"
                    />
                    <h1 className="text-4xl font-bold">Empty Cart</h1>
                    <p>You have no items in your cart</p>
                  </div>
                )}
              </ul>
            </div>

            {cartItems.length > 0 && (
              <div className="cart-summary">
                <dl className="cart-summary-list">
                  <div className="cart-summary-item">
                    <dt className="cart-summary-label">
                      Product Totalannot be empty
                    </dt>
                    <dd className="cart-summary-value">
                      {parseFloat(productTotal).toFixed(0)} SAR
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="cart-checkout-button"
                >
                  Buy now
                </Link>

                <div className="cart-continue-shopping">
                  <p>
                    Or{" "}
                    <button
                      onClick={onClose}
                      className="cart-continue-shopping-button"
                    >
                      Continue Shopping ←
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
