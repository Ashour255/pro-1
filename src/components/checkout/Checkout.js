// src/components/checkout/Checkout.js
"use client"; // ده سطر مهم جدا عشان Next.js يعرف إن الكومبوننت ده client-side فقط

import { useState, useEffect } from "react"; // استيراد useState و useEffect
import "./checkout.css";
import Checkout_left from "./Checkout_left";
import Checkout_right from "./Checkout_right";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Checkout() {
  // 1. إضافة حالة جديدة لمراقبة ما إذا كان الكلاينت جاهزًا للهيدرة
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // هذا الـ useEffect بيشتغل مرة واحدة بس على الكلاينت بعد ما تتم عملية الهيدرة الأولية
    setIsClient(true);
  }, []);

  // جلب cartItems باستخدام useSelector. هذا الكود هيتنفذ لما isClient يكون true
  const cartItems = useSelector((state) => state.cart.items) || [];
  const initialGovernorate = "الرياض";

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.qty || 1) * item.price,
    0
  );
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  // 2. شرط العرض: لو الكلاينت لسه مش جاهز، نعرض نسخة بسيطة من الـ HTML
  // ده بيضمن إن السيرفر بيرندر نفس الـ HTML البسيط ده عشان ما يحصلش mismatch
  if (!isClient) {
    return (
      <div className="checkout-container">
        {/* ممكن تحط هنا أي شاشة تحميل بسيطة أو مجرد div فارغ */}
        <p className="sr-only">Loading your cart...</p>
      </div>
    );
  }

  // 3. لما يكون isClient بـ true (يعني الهيدرة تمت)، بنعرض المحتوى الفعلي
  // ده بيضمن إن استخدام Redux وتفاصيل السلة بتظهر بعد ما الكلاينت يكون مستقر
  return (
    <div className="checkout-container">
      <h1 className="sr-only">Your Order</h1>
      {cartItems.length > 0 ? (
        <div className="checkout-grid">
          <div className="checkout-left">
            <Checkout_left
              initialGovernorate={initialGovernorate}
              cartItems={cartItems}
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
            />
          </div>
          <div className="checkout-right">
            <Checkout_right cartItems={cartItems} />
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
