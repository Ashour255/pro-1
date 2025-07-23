"use client";
import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import "./checkout.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { clearCart } from "@/rit/slices/Cart-slice";

export default function Checkout_left({
  initialGovernorate,
  cartItems: propCartItems,
  totalPrice: propTotalPrice,
}) {
  const globalValue = useSelector((state) => state.global.globalValue);
  const router = useRouter();
  const dispatch = useDispatch();

  const reduxCartItems = useSelector((state) => state.cart.items) || [];
  const reduxTotalPrice = useSelector((state) =>
    state.cart.items.reduce(
      (sum, item) => sum + (parseFloat(item.price) || 0) * (item.qty || 0),
      0
    )
  );

  const cartItems =
    propCartItems !== undefined && propCartItems !== null
      ? propCartItems
      : reduxCartItems;
  const totalPrice =
    propTotalPrice !== undefined && propTotalPrice !== null
      ? propTotalPrice
      : reduxTotalPrice;

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    governorate: initialGovernorate || "",
    address: "",
  });

  const [cityOptions, setCityOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://shehab.farmin.online/api/citys?merchant_id=${globalValue}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error(`فشل الطلب: ${res.status}`);

      const result = await res.json();
      const formattedOptions = (result?.data || []).map((city) => ({
        value: city.id,
        label: city.name,
      }));

      setCityOptions(formattedOptions);
    } catch {
      toast.error("فشل في تحميل المدن");
    }
  }, [globalValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (cityOptions.length > 0) {
      const defaultOption =
        cityOptions.find((opt) => opt.value === formData.governorate) ||
        cityOptions[0];

      if (formData.governorate !== defaultOption.value) {
        setFormData((prev) => ({ ...prev, governorate: defaultOption.value }));
      }

      setSelectedOption(defaultOption);
    }
  }, [cityOptions, formData.governorate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (option) => {
    setSelectedOption(option);
    setFormData((prev) => ({ ...prev, governorate: option.value }));
  };

  const handleSubmitInternal = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const hasError = ["full_name", "phone", "address"].some((field) => {
      const value = formData[field].trim();
      return value.length < 8;
    });

    if (hasError) {
      toast.error("يرجى ملء جميع الحقول بشكل صحيح.");
      return;
    }

    try {
      const resBlocked = await fetch(
        `https://shehab.farmin.online/api/blocked-phones?merchant_id=${globalValue}`
      );
      const blockedPhones = (await resBlocked.json())?.data.map((d) => d.phome);

      if (blockedPhones.includes(formData.phone)) {
        toast.error("رقم الهاتف محظور.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("address", formData.address);
      formDataToSend.append("merchant_id", globalValue);
      formDataToSend.append("name", formData.full_name);
      formDataToSend.append("mobile", formData.phone);
      formDataToSend.append("discount_code", "");
      formDataToSend.append("discount", "");
      formDataToSend.append("shipping", "");
      formDataToSend.append("total", totalPrice);
      formDataToSend.append("currency", "SAR");
      formDataToSend.append("city_id", formData.governorate);

      cartItems.forEach((item) => {
        formDataToSend.append("products_id[]", item.id);
        formDataToSend.append("quantity[]", item.qty);
        formDataToSend.append("option_color", item.selectedColor || "");
        formDataToSend.append("option_size", item.selectedSize || "");
      });

      const response = await fetch("https://shehab.farmin.online/api/orders", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.msg || "فشل في تنفيذ الطلب");

      toast.success("تم إرسال الطلب بنجاح");
      dispatch(clearCart());

      const productsForDisplay = cartItems.map((item) => ({
        product_id: item.id,
        name: item.name,
        image: item.image_Product,
        quantity: item.qty,
        unit_price: parseFloat(item.price),
        total_price: parseFloat(item.price) * item.qty,
        color: item.selectedColor,
        size: item.selectedSize,
      }));

      const orderDetailsForDisplay = {
        name: formData.full_name,
        mobile: formData.phone,
        address: formData.address,
        city_id: formData.governorate,
        city_name: selectedOption?.label || "غير معروف",
        final_price: totalPrice,
        order_date: new Date().toLocaleDateString("ar-EG"),
        order_time: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        ordered_products: productsForDisplay,
      };

      const encoded = encodeURIComponent(
        JSON.stringify(orderDetailsForDisplay)
      );
      router.push(`/order?data=${encoded}`);
    } catch (error) {
      toast.error(error.message || "خطأ أثناء تنفيذ الطلب");
    }
  };

  return (
    <div className="checkout-form">
      <p className="formTitle">
        Please fill your information to complete the order
      </p>
      <form onSubmit={handleSubmitInternal}>
        <div className="formGroup">
          <label className="formLabel">insert full Name</label>
          <input
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="[Insert Full Name]"
            className="formInput"
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">Phone Number</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="05*********"
            className="formInput"
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">المحافظة</label>
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={cityOptions}
          />
        </div>
        <div className="formGroup">
          <label className="formLabel">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="city / street / mark"
            className="formTextarea"
          ></textarea>
        </div>
        <div className="priceSummary">
          <div className="priceRow">
            <dt className="priceLabel">Shipping Cost</dt>
            <dd className="priceValue">Free Shipping</dd>
          </div>
          <div className="priceRow">
            <dt className="priceLabel">Total</dt>
            <dd className="priceValue">{totalPrice} SAR</dd>
          </div>
        </div>
        <button type="submit" className="submitButton">
          <FontAwesomeIcon icon={faCreditCard} className="buttonIcon" /> Buy it
          now
        </button>
      </form>
      <ToastContainer autoClose={1000} position="top-center" />
    </div>
  );
}
