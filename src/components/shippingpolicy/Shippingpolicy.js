import React from "react";
import "./shippingpolicy.css"
export default function Shippingpolicy() {
  return (
    <div className="shipping-policy">
      <div className="container">
        <h2>Shipping policy</h2>
        <p className="description">
          بعد تأكيد عملية الشراء، نقوم بشحن وإرسال المنتج عبر الطريقة التي قمتم
          بإختيارها، إما عبر مسؤول الشحن الخاص بنا أو عبر خدمة أمانة إكسبريس.
        </p>
        <h3  style={{fontWeight:700}} className="title-3">طرق الشحن :</h3>
        <p className="description">
          أمانة إكسبريس : خدمة تضمن لكم تسليم الإرساليات إلى العنوان المطلوب في
          مدة تتراوح بين 3 أيام و 7 أيام نحوالإتجاهات الرئيسية.
        </p>
        <p className="description">
          مسؤول الشحن : متجرنا يتعاقد مع مجموعة من مسؤولي الشحن بمجموعة من المدن
          يقومون بإيصال المنتجات في مدة تتراوح بين يوم و3 أيام
        </p>
      </div>
    </div>
  );
}
