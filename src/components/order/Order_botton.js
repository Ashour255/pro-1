"use client";
import React, { useEffect, useState } from "react";
import "./order.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify"; // لا تنس استيراد ToastContainer في ملف الـ Layout أو Root الخاص بك
import Loading from "@/app/loading";

const Order_botton = () => {
  const [openReturn, setOpenReturn] = useState(false);
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const decodedString = decodeURIComponent(dataParam);
        const decodedData = JSON.parse(decodedString);
        setOrderData(decodedData);
      } catch (error) {
        console.error("Error parsing order data in Order_botton:", error);
        toast.error("فشل في تحميل بيانات الطلب."); // إضافة رسالة خطأ للمستخدم
      }
    } else {
      // إذا لم يكن هناك "data" في الـ URL، يمكن عرض رسالة أو إعادة توجيه
      toast.warn("لا توجد بيانات طلب لعرضها.");
    }
  }, [searchParams]);

  // استخدام optional chaining هنا أيضًا لضمان عدم حدوث خطأ إذا كان orderData null في البداية
  const totalItemsCount = orderData?.ordered_products
    ? orderData.ordered_products.reduce(
        (total, product) => total + product.quantity,
        0
      )
    : 0;

  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ رابط التتبع بنجاح!"); // رسالة نجاح
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // رجّع الحالة بعد 2 ثانية
    } catch (err) {
      toast.error("فشل في نسخ الرابط."); // رسالة خطأ
      // console.error("فشل النسخ:", err);
    }
  };

  return (
    <div className="order_invoice_container">
      {orderData ? ( // هذا الشرط مهم جدًا لضمان وجود البيانات قبل العرض
        <div className="invoice-wrapper">
          <div className="invoice-header">
            <Image
              width={300}
              height={300}
              quality={100}
              className="logo"
              src="/imges/1734867857871947837.webp" // تأكد أن هذا المسار صحيح دائمًا
              alt="Store Logo" // Always provide a meaningful alt text
            />
            <button onClick={handleCopyLink} className="tracking-btn">
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
                    <span>Name:</span> {orderData.name}
                  </div>
                  <div>
                    <span>Phone:</span> {orderData.mobile}
                  </div>
                  <div>
                    <span>Government:</span> {orderData.city_name}
                  </div>
                  <div>
                    <span>Address:</span> {orderData.address}
                  </div>

                  <div>
                    <span>Total Paid:</span> {orderData.final_price} SAR
                  </div>
                  <div>
                    <span>Items Count:</span> {totalItemsCount}
                  </div>
                  <div>
                    <span>Order Date:</span> {orderData.order_date}
                  </div>
                  <div>
                    <span>Order Time:</span> {orderData.order_time}
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
                        alt="Return Arrow" // Provide a meaningful alt text
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
                        Request Form kindly fill the form and we will process
                        your exchange order. You can exchange Both sizes and
                        products. Exchanges are subject to 40 EGP shipping fees.
                        ( Price difference in the exchange order has to higher
                        than or the same as your initial purchase).
                      </p>
                      <p>
                        Refunds: Refunds are available for in any of our stores
                        within 14 of your delivery. You can Refund for any
                        reason.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <ul className="invoice-timeline">
                <li>Order Created</li>
                <span>
                  {orderData.order_date}, {orderData.order_time}
                </span>
              </ul>
            </div>

            <div className="invoice-right">
              <div className="order-status-box">
                <div className="order-status">
                  <h6 className="status-title">Order Status : </h6>
                  <h6 className="status-value">Pending</h6>
                </div>

                {/* هنا نستخدم optional chaining قبل الـ map للتأكد أن ordered_products موجودة */}
                {orderData.ordered_products?.map((item, index) => (
                  <div key={index} className="product-item">
                    <Image
                      width={300}
                      height={300}
                      quality={100}
                      src={item.image || "/images/placeholder-product.png"} // **حل مشكلة src الفارغ هنا**
                      alt={item.name || "Product image"} // توفير نص بديل افتراضي
                      className="product-img"
                    />
                    <div className="product-info">
                      <div>
                        <h4>{item.name}</h4>
                        <p>Items Count: {item.quantity}</p>
                        <p>Piece : {item.unit_price} SAR</p>
                        {item.color && (
                          <p style={{ display: "flex", alignItems: "center" }}>
                            Color :{" "}
                            <span
                              style={{
                                display: "inline-block",
                                backgroundColor: item.color,
                                width: "25px",
                                height: "25px",
                                borderRadius: "50%",
                                marginLeft: "10px",
                              }}
                            ></span>
                          </p>
                        )}
                        {item.size && <p>Size: {item.size}</p>}
                      </div>
                      <p className="total-price">
                        Total {item.total_price} SAR
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
                  <h6>{orderData.final_price} SAR</h6>
                </div>
                <div>
                  <h6>
                    <span>Shipping Cost : </span>
                  </h6>
                  <h6>Free Shipping</h6>
                </div>
                <div className="total-row">
                  <h6>Total:</h6>
                  <h6>{orderData.final_price} SAR</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // رسالة عند عدم وجود بيانات الطلب أو أثناء التحميل
        <Loading />
      )}
      <ToastContainer autoClose={1000} position="top-center" />
    </div>
  );
};

export default Order_botton;
