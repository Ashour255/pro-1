"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import "./prodcut_detils.css";
import {
  faChevronDown,
  faCreditCard,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Detils_Form from "./Detils_Form";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, setCartOpen } from "@/rit/slices/Cart-slice";
import Loading from "@/app/loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidecart from "@/components/sideCart/Sidecart";
import ModelProduct from "../modelProduct/ModelProduct";

export default function Detils_right({ slug }) {
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.cart.isCartOpen);
  const globalValue = useSelector((state) => state.global.globalValue);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [currentPriceBefore, setCurrentPriceBefore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false); // حالة جديدة لتتبع النقر على "إضافة إلى السلة"
  const formRef = useRef(null);

  const productData = data?.data?.[0];
  const colors = productData?.options_color?.[0]?.values || [];
  const sizes = productData?.options_size?.[0]?.values || [];
  const hasColors = colors.length > 0;
  const hasSizes = sizes.length > 0;

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://shehab.farmin.online/api/products-show/${slug}?merchant_id=${globalValue}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        throw new Error(`فشل الطلب: ${res.status} - ${res.statusText}`);
      }
      const result = await res.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    }
  }, [slug, globalValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!data?.data?.[0]) {
      setCurrentPrice(null);
      setCurrentPriceBefore(null);
      return;
    }

    const baseProduct = data.data[0];
    let newPrice = baseProduct.price;
    let newPriceBefore = baseProduct.price_before;

    const selectedColorData = baseProduct.options_color?.[0]?.values?.find(
      (c) => c.value === selectedColor
    );

    const selectedSizeData = baseProduct.options_size?.[0]?.values?.find(
      (s) => s.value === selectedSize
    );

    if (selectedColorData && selectedColorData.price !== null) {
      newPrice = selectedColorData.price;
      newPriceBefore =
        selectedColorData.price_before !== null
          ? selectedColorData.price_before
          : baseProduct.price_before;
    }
    if (selectedSizeData && selectedSizeData.price !== null) {
      newPrice = selectedSizeData.price;
      newPriceBefore =
        selectedSizeData.price_before !== null
          ? selectedSizeData.price_before
          : baseProduct.price_before;
    }

    setCurrentPrice(newPrice);
    setCurrentPriceBefore(newPriceBefore);
  }, [selectedColor, selectedSize, data]);

  const handleAddToCart = () => {
    if (typeof window === "undefined") {
      return;
    }
    const product_quantity = productData?.product_quantity;
    if (!product_quantity || product_quantity == 0) {
      toast.error("هذا المنتج غير متوفر في المخزون.");
      return;
    }
    if (data?.data && data.data[0]) {
      const product = {
        id: data.data[0].id,
        name: data.data[0].name,
        price: currentPrice,
        image_Product: data?.data[0]?.media[0]?.cover_Product,
        slug: data.data[0].slug,
        qty: 1,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        price_before: currentPriceBefore,
        product_quantity: data.data[0].product_quantity,
      };
      dispatch(addToCart(product));
      dispatch(setCartOpen(true));
      setIsAddToCartClicked(true); // تحديث الحالة عند النقر على إضافة إلى السلة
      toast.success("Product added to cart successfully", {
        toastId: "added-cart",
      });
    } else {
      toast.error("فشل إضافة المنتج، حاول مرة أخرى.");
    }
  };

  const handleCloseCart = () => {
    dispatch(setCartOpen(false));
  };

  useEffect(() => {
    if (!cartOpen && isAddToCartClicked) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000); // تأخير 1000 مللي ثانية
      return () => clearTimeout(timer);
    }
  }, [cartOpen, isAddToCartClicked]);

  const handleBuyNow = useCallback(
    async (formDataFromDetilsForm) => {
      if (typeof window === "undefined") {
        return;
      }

      const orderDetails = {
        product: {
          id: productData?.id,
          name: productData?.name,
          price: currentPrice,
          image: productData?.media?.[0]?.cover_Product,
          selectedColor: selectedColor,
          selectedSize: selectedSize,
        },
        customer_info: formDataFromDetilsForm,
      };

      toast.info("جاري معالجة طلب الشراء الفوري...");
    },
    [productData, currentPrice, selectedColor, selectedSize]
  );

  const handleBuyNowClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div  className="productContainer .slideup">
      <div className="productHeader">
        <h1 className="productName">{productData?.name || "Product Name"}</h1>

        <div className="priceContainer">
          <div className="priceBeforeDiscount">
            <p className="priceLabel">Price Before Discount</p>
            <p className="originalPrice">{currentPriceBefore ?? "-"}</p>
            <span className="currency">SAR</span>
          </div>

          <div className="priceAfterDiscount">
            <p className="priceLabel">Price After Discount</p>
            <p id="sale-price" className="discountedPrice">
              {currentPrice}
            </p>
            <span className="currencyLarge">SAR</span>
          </div>
        </div>

        {/* <div className="ratingContainer">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="starIcon" />
            ))}
          </div>
        </div> */}

        {productData?.activate_virtual_inventory_feature === 1 && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            <em>Only a few pieces 5 left</em>
          </p>
        )}

        {(productData?.show_fake_visitor_counter == 1) === 1 && (
          <p>
            <em>
              This product is currently being viewed by{" "}
              {productData?.minimum_visitors_viewing_page} to{" "}
              {productData?.Maximum_visitors_viewing_page} visitors
            </em>
          </p>
        )}

        <div className="productOptions">
          {hasColors && (
            <div className="colorsContainer">
              <label className="sectionLabel">Colors:</label>
              <div className="colorOptions">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`colorCircle ${
                      selectedColor === color.value ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSelectedColor(
                        selectedColor === color.value ? null : color.value
                      )
                    }
                    style={{ backgroundColor: color.value || "#ccc" }}
                    title={color.value}
                  />
                ))}
              </div>
            </div>
          )}

          {hasSizes && (
            <div className="sizesContainer">
              <label className="sectionLabel">Sizes :</label>
              <div className="sizeOptions">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`sizeButton ${
                      selectedSize === size.value ? "selected" : ""
                    }`}
                    onClick={() =>
                      setSelectedSize(
                        selectedSize === size.value ? null : size.value
                      )
                    }
                  >
                    {size.value}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="actionButtons">
        <button
          type="button"
          className="submitButton"
          onClick={handleBuyNowClick}
        >
          <FontAwesomeIcon icon={faCreditCard} className="buttonIcon" />
          {/* Buy it now */}
          {productData?.text_on_button}
        </button>
        {productData?.skip_the_cart === 1 && (
          <button className="addToCartButton" onClick={handleAddToCart}>
            <Image
              src="/imges/shopping-bag-svgrepo-com.svg"
              className="cartIcon"
              width={30}
              height={20}
              alt="shopping-bag"
            />
            Add to cart
          </button>
        )}
      </div>
      <div className="productDescription">
        <p>
          <em>{productData?.description || "No description available."}</em>
        </p>
        <h2>Materials</h2>
        <p>
          <em>
            {productData?.meta_description ||
              "No materials information available."}
          </em>
        </p>
        <h2>Dimensions</h2>
        <p>
          <em>h:21 X w:28 cm (8 1&apos;2 X 11 1&apos;4 in.)</em>
        </p>
        <h2>Care Instructions</h2>
        <p>
          <em>
            Use a soft damp cloth and a drop of mild soap to remove any haze.
            Air dry.
          </em>
        </p>
      </div>
      {/* {productData?.skip_the_cart !== 1 && ( */}
      <div className="checkoutFormContainer">
        <Detils_Form
          onSubmitForm={handleBuyNow}
          initialGovernorate={"نجران"}
          formRef={formRef}
          price={currentPrice}
          bottom_of_the_page={productData?.bottom_of_the_page}
          product_quantity={productData?.product_quantity}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          id={productData?.id}
          product_name={productData?.name}
          product_image={productData?.media?.[0]?.cover_Product}
        />
      </div>
      {/* )} */}
      {/* <ToastContainer autoClose={1000} position="top-center" /> */}
      {/* {cartOpen && <Sidecart onClose={handleCloseCart} open={cartOpen} />} */}
      {showModal && (
        <ModelProduct
          id={productData?.id}
          onClose={() => {
            setShowModal(false);
            setIsAddToCartClicked(false); // إعادة تعيين الحالة عند إغلاق الموديل
          }}
        />
      )}
    </div>
  );
}
