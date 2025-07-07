"use client";
import React from "react";
import "./checkout.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  deleteFromCart,
} from "@/rit/slices/Cart-slice";

// دالة لتنسيق السعر بدون أصفار زائدة
const formatPrice = (price) => {
  const num = parseFloat(price);
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
};

export default function Checkout_right() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items) || [];

  // حساب الإجمالي (subtotal)
  const subtotal = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + (parseFloat(item.price) || 0) * (item.qty || 0),
      0
    )
  );

  const handleIncrease = (item) => {
    dispatch(increaseQuantity({ slug: item.slug }));
  };

  const handleDecrease = (item) => {
    dispatch(decreaseQuantity({ slug: item.slug }));
  };

  const handleRemoveItem = (item) => {
    dispatch(deleteFromCart({ slug: item.slug }));
  };

  return (
    <section aria-labelledby="summary-heading" className="order-summary">
      <div className="summary-content">
        <h2 id="summary-heading">Order Summary</h2>

        <ul className="cart-items">
          {cartItems.length > 0 && (
            cartItems.map((item) => (
              <li key={item.slug} className="cart-item">
                <div className="item-image">
                  <Image
                    width={300}
                    height={300}
                    quality={100}
                    src={item.image_Product}
                    alt={item.name}
                  />
                </div>

                <div className="item-details">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <p>{formatPrice(item.price)} SAR</p>
                  </div>

                  <div className="item-info">
                    <p className="item-total">
                      Total {formatPrice(parseFloat(item.price) * item.qty)} SAR
                    </p>

                    <div className="quantity-controls">
                      <button
                        onClick={() => handleIncrease(item)}
                        aria-label="Increase quantity"
                      >
                        <FontAwesomeIcon className="svg" icon={faPlus} />
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => handleDecrease(item)}
                        aria-label="Decrease quantity"
                      >
                        <FontAwesomeIcon className="svg" icon={faMinus} />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item)}
                        className="remove-item"
                        aria-label="Remove item"
                      >
                        <FontAwesomeIcon className="remove-icon" icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>

        <div className="order-totals">
          <div className="total-row">
            <dt>Product Total</dt>
            <dd>{formatPrice(subtotal)} SAR</dd>
          </div>
          <div className="total-row">
            <dt>Shipping Cost</dt>
            <dd className="shipping-cost">Free Shipping</dd>
          </div>
          <div className="total-row grand-total">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal)} SAR</dd>
          </div>
        </div>
      </div>
    </section>
  );
}