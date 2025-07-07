"use client";
import Link from "next/link";
import "./order.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function Order_top() {
  return (
    <>
      <div className="thanks-container">
        <div className="thanks-lottie">
          <DotLottieReact
            src="/imges/Animation - 1745926642983.lottie"
            autoplay
            style={{ height: "350px" } }
          />
        </div>

        <h2 className="thanks-title">Thanks for your order</h2>
        <p className="thanks-text">
          We received your order and we will contact you soon
        </p>
        <p className="thanks-text">Please wait for our phone call</p>

        <div className="thanks-actions">
          <p className="offers-link">View Latest Offers</p>
          <div className="home-button-container">
            <Link className="home-button" href="/">
              Return to Home<span aria-hidden="true"> ←</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
