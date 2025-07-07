import Link from "next/link";
import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-links">
        <div>
          <Link href="/privacy-policy">Privacy policy</Link>
        </div>
        <div>
          <Link href="/shipping-policy">Shipping policy</Link>
        </div>
        <div>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>
        </div>
        <div>
          <Link href="/refund-policy">Refund policy</Link>
        </div>
      </div>
      <div className="footer-content" style={{ textAlign: "center" }}>
        <div className="footer-content-1">
          <Link href={"/"}>
            <span>Phone:</span> 01000000000
          </Link>
          <Link href={"/"}>
            <span>Email: </span> info@easy-orders.com
          </Link>
        </div>
        {/* <br /> */}
        <div className="footer-content-2">
          <Link href={"/"}>
            <span>Address:</span> SOdic\ZAyed
          </Link>
        </div>
      </div>
      <p className="copyright">default-theme. All Rights Reserved. © 2025</p>
      <p className="footer-link">
        Powered By <Link href={"/"}>easyorders</Link>
      </p>
    </div>
  );
}
