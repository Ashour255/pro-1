"use client";
import { useEffect, useState } from "react";
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

export default function Detils_right({ slug }) {
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.cart.isCartOpen);
  const globalValue = useSelector((state) => state.global.globalValue);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [openShipping, setOpenShipping] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://altamyouzkw.com/api/products-show/${slug}?merchant_id=${globalValue}`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error(`فشل الطلب: ${res.status} - ${res.statusText}`);
        }
        const result = await res.json();
        setData(result);
        setCurrentPrice(result?.data[0]?.price);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [slug, globalValue]);

  useEffect(() => {
    if (data?.data) {
      let price = data?.data[0]?.price;
      const colorObj = data?.data[0]?.colors?.find(
        (c) => c.name === selectedColor
      );
      const sizeObj = data?.data[0]?.sizes?.find(
        (s) => s.name === selectedSize
      );
      if (colorObj) price = colorObj.price;
      if (sizeObj) price = sizeObj.price;
      setCurrentPrice(price);
    }
  }, [selectedColor, selectedSize, data]);

  const handleAddToCart = () => {
    if (typeof window === "undefined") {
      return;
    }
    if (data?.data && data.data[0]) {
      const product = {
        id: data.data[0].id,
        name: data.data[0].name,
        price: currentPrice,
        image_Product:
          data?.data[0]?.media[0]?.cover_Product,
        slug: data.data[0].slug,
        qty: 1,
      };
      dispatch(addToCart(product));
      dispatch(setCartOpen(true));
      toast.success("تم إضافة المنتج إلى السلة!");
    } else {
      toast.error("فشل إضافة المنتج، حاول مرة أخرى.");
    }
  };


  const handleCloseCart = () => {
    dispatch(setCartOpen(false));
  };

  // if (!data && !error) return <Loading />;
  if (error) return <p style={{ color: "red" }}>خطأ: {error}</p>;

  return (
    <div className="productContainer">
      <div className="productHeader">
        <h1 className="productName">{data?.data[0]?.name || "Product Name"}</h1>
        <div className="ratingContainer">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="starIcon" />
            ))}
          </div>
        </div>

        <div className="priceContainer">
          <div className="priceBeforeDiscount">
            <p className="priceLabel">Price Before Discount</p>
            <p className="originalPrice">
              {data?.data[0]?.price_before ?? "-"}
            </p>
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

        <div className="productOptions">
          <div className="colorsContainer">
            <label className="sectionLabel">Colors:</label>
            <div className="colorOptions">
              {data?.data[0]?.colors?.map((color, index) => (
                <div
                  key={index}
                  className={`colorCircle ${
                    selectedColor === color.name ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color.code || "#ccc" }}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="sizesContainer">
            <label className="sectionLabel">Sizes:</label>
            <div className="sizeOptions">
              {data?.data[0]?.sizes?.map((size, index) => (
                <button
                  key={index}
                  className={`sizeButton ${
                    selectedSize === size.name ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSize(size.name)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="actionButtons">
        <button className="buyNowButton">
          <FontAwesomeIcon icon={faCreditCard} className="buttonIcon" />
          Buy it now
        </button>
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
      </div>

      <div className="infoSections">
        <div className="infoSection">
          <button
            className="infoButton"
            onClick={() => setOpenShipping(!openShipping)}
          >
            <span className="infoButtonContent">
              <Image
                width={100}
                height={100}
                src="/imges/shipment-check.svg"
                alt="Shipping"
                className="infoIcon"
              />
              Shipping & Returns
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`chevronIcon ${openShipping ? "rotate" : ""}`}
            />
          </button>
          {openShipping && (
            <div className="infoContent">
              <p>
                We ship all over Egypt within 2-5 business days (Friday &
                Saturday are not business days).
              </p>
              <p>
                <strong>Delivery Time Per Destination:</strong>
              </p>
              <ul>
                <li>Cairo & Alex : (2-4 business days)</li>
                <li>Delta, Suez, Portsaid, Ismailya : (3-5 business days)</li>
                <li>
                  Beni Swef, Menya, Asyout, Sohag, Qatar : (3-5 business days)
                </li>
                <li>Qena, Luxor, Aswan : (1 week business days)</li>
                <li>
                  North Sinai, Red Sea, New Valley, Sallom : (1 week business
                  days)
                </li>
              </ul>
              <p>
                <strong>Exchanges for Local Orders (Egypt):</strong>
              </p>
              <ul>
                <li>
                  Exchanges could be done within 14 days of receiving the order,
                  with an extra fees for the exchange shipping.
                </li>
                <li>
                  Refunds could be done within 14 days of receiving the order,
                  with an extra fees for the exchange shipping.
                </li>
                <li>Refund or exchange could be via our varies channels</li>
                <li>
                  Once you'd like to talk to us, we're here to listen you for
                  feedback, complains or exchanges. You could reach out via our
                  various channels
                </li>
              </ul>
              <p>
                <strong>
                  Our working hours are 11 AM - 11 PM (Friday & Saturday are
                  off). All inquiries will be attended to within one working day
                </strong>
              </p>
            </div>
          )}
        </div>

        <div className="infoSection">
          <button
            className="infoButton"
            onClick={() => setOpenReturn(!openReturn)}
          >
            <span className="infoButtonContent">
              <Image
                width={100}
                height={100}
                src="/imges/return-arrow.svg"
                alt="Return"
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
                Exchanges: Exchanges are available through our Exchange Request
                Form kindly fill the form and we will process your exchange
                order. You can exchange Both sizes and products. Exchanges are
                subject to 40 EGP shipping fees. ( Price difference in the
                exchange order has to higher than or the same as your initial
                purchase).
              </p>
              <p>
                Refunds: Refunds are available for in any of our stores within
                14 of your delivery. You can Refund for any reason.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="productDescription">
        <p>
          <em>
            This is a demonstration store. You can purchase products like this
            from{" "}
            <a
              href="https://www.mlouye.com/"
              rel="noopener noreferrer"
              target="_blank"
              className="externalLink"
            >
              Mlouye
            </a>
            .
          </em>
        </p>
        <p>
          <em>
            Our architectural, origami inspired shoulder bag, now has a new
            dimension. It can be converted into a wrist bag just with a quick
            move. The shoulder strap can easily be removed, so you can slung it
            from your wrist or use as a clutch. It has plenty of room inside for
            your essentials including a large phone, small wallet, and 300 ml
            water bottle. Made from smooth leather and has a suede top with
            two-way zip fastening. Interior features two slip pockets.{" "}
          </em>
        </p>
        <h2>Materials</h2>
        <p>
          <em>
            Crafted from smooth calf leather. Canvas lining. Brushed gold
            hardware. Two interior pockets. Detachable and adjustable shoulder
            strap.
          </em>
        </p>
        <h2>Dimensions</h2>
        <p>
          <em>h:21 X w:28 cm (8 1/2 X 11 1/4 in.)</em>
        </p>
        <h2>Care Instructions</h2>
        <p>
          <em>
            Use a soft damp cloth and a drop of mild soap to remove any haze.
            Air dry.
          </em>
        </p>
      </div>

      <div className="checkoutFormContainer">
        <Detils_Form />
      </div>
      <ToastContainer autoClose={1000} position="top-center" zIndex={9999} />
      {cartOpen && <Sidecart onClose={handleCloseCart} open={cartOpen} />}
    </div>
  );
}
