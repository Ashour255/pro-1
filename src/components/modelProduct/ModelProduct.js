"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCartOpen } from "@/rit/slices/Cart-slice";
import { useCallback, useState, useEffect } from "react";
import "./modelProduct.css";
import { createPortal } from "react-dom";

export default function ModelProduct({ onClose, id }) {
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.cart.isCartOpen);
  const globalValue = useSelector((state) => state.global.globalValue);

  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://shehab.farmin.online/api/crossselln?merchant_id=${globalValue}&product_id=${id}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error(`فشل الطلب: ${res.statusText}`);
      const result = await res.json();
      setData(result);
    } catch (error) {}
  }, [id, globalValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let cross_product = data?.data?.cross_product;
  let modalData = data?.data;
  let ok_color_button = modalData?.oK_button_color;
  let reject_button_color = modalData?.reject_button_color;

  const handleAddToCart = () => {
    if (!data) {
      toast.error("فشل إضافة المنتج، حاول مرة أخرى.");
      return;
    }

    const newProduct = {
      id: id,
      name: cross_product.name,
      price: cross_product?.price,
      image_Product: cross_product?.cover_Product,
      slug: cross_product.slug,
      qty: 1,
      price_before: cross_product?.price_before,
    };

    dispatch(addToCart(newProduct));
    dispatch(setCartOpen(true));
    toast.success("Product added to cart successfully", {
      toastId: "added-cart",
    });
    onClose(); // إغلاق المودال
  };

  const handleCloseCart = () => {
    dispatch(setCartOpen(false));
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !data || !cross_product) return null;
  return createPortal(
    <div className="modalOverlay">
      <div className="modalOverlay-2" onClick={onClose} aria-hidden="true" />
      <div className="modalContainer">
        <button className="cart-close-button" onClick={onClose}>
          <FontAwesomeIcon
            className="close-icon"
            icon={faClose}
            style={{ color: "rgb(107 114 128)" }}
          />
        </button>

        <div className="modalOverlay-img">
          <Image
            src={cross_product?.cover_Product || "/imges/p1.webp"}
            width={200}
            height={150}
            alt={cross_product?.name || "Product"}
            quality={100}
            className="modalImage"
            style={{ borderRadius: "10px", overflow: "hidden" }}
          />
        </div>

        <div className="modalRight">
          <h1 className="modalTitle">{cross_product?.name}</h1>

          <div className="priceContainer">
            <div className="priceBeforeDiscount">
              <p className="priceLabel">Price Before Discount</p>
              <p className="originalPrice">
                {cross_product?.price_before ?? "-"}
              </p>
              <span className="currency">SAR</span>
            </div>

            <div className="priceAfterDiscount">
              <p className="priceLabel">Price After Discount</p>
              <p id="sale-price" className="discountedPrice">
                {cross_product?.price ?? "-"}
              </p>
              <span className="currencyLarge">SAR</span>
            </div>
          </div>

          <p className="dec-pro">
            <em>
              {modalData?.description?.length > 100
                ? modalData.description.slice(0, 160) + "..."
                : modalData?.description || "لا يوجد وصف متاح"}
            </em>
          </p>

          <div className="but-2">
            <button
              style={{
                backgroundColor: ok_color_button || "white",
                width: "100%",
                borderRadius: "10px",
                outline: "none",
                border: "none",
              }}
              onClick={handleAddToCart}
              className="addToCartButton"
            >
              <Image
                src="/imges/shopping-bag-svgrepo-com.svg"
                className="cartIcon"
                width={30}
                height={20}
                alt="shopping-bag"
              />
              {modalData?.oK_button || "إضافة إلى السلة"}
            </button>
            <button
              style={{ backgroundColor: reject_button_color || "white" }}
              onClick={onClose}
              className="modalCloseButton"
            >
              {modalData?.reject_button || "اغلاق"}
            </button>
          </div>
        </div>
      </div>
      {/* <ToastContainer autoClose={1000} position="top-center" /> */}
      {/* {cartOpen && <Sidecart onClose={handleCloseCart} open={cartOpen} />} */}
    </div>,
    document.body
  );
}
