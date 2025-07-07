"use client";
import "./checkout.css";
import Checkout_left from "./Checkout_left";
import Checkout_right from "./Checkout_right";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items) || [];

  return (
    <div className="checkout-container">
      <h1 className="sr-only">Your Order</h1>
      {cartItems.length > 0 ? (
        <div className="checkout-grid">
          <div className="checkout-left">
            <Checkout_left />
          </div>
          <div className="checkout-right">
            <Checkout_right />
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            minHeight: "50vh",
          }}
        >
          <div style={{ width: "150px", height: "170px" }}>
            <Image
              src="/imges/Animation -cart.gif"
              alt="Empty Cart"
              width={150}
              height={170}
              className="mb-4"
            />
          </div>
          <h2 className="text-2xl font-bold">Empty Cart</h2>
          <p>You have no items in your cart</p>
        </div>
      )}
    </div>
  );
}
