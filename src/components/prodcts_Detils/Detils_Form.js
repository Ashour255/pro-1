"use client";
import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import "./prodcut_detils.css"; // تأكد من المسار الصحيح لهذا الملف
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function Detils_Form({
  onSubmitForm, // هذه البروب لم يتم استخدامها في الكود المقدم، يمكن إزالتها إذا لم تكن ضرورية
  selectedColor,
  selectedSize,
  id,
  initialGovernorate,
  formRef,
  bottom_of_the_page,
  product_quantity,
  price,
  // *** إضافة هذه الـ props الجديدة لبيانات المنتج ***
  product_name, // اسم المنتج
  product_image, // رابط صورة المنتج
}) {
  const globalValue = useSelector((state) => state.global.globalValue);
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    governorate: initialGovernorate || "",
    address: "",
  });

  const [quantity, setQuantity] = useState(1);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(
        `https://shehab.farmin.online/api/citys?merchant_id=${globalValue}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok)
        throw new Error(`فشل الطلب: ${res.status} - ${res.statusText}`);
      const result = await res.json();
      const cities = result?.data || [];

      const formattedOptions = cities.map((city) => ({
        value: city.id,
        label: city.name,
      }));

      setCityOptions(formattedOptions);
    } catch (error) {
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
        setFormData((prev) => ({
          ...prev,
          governorate: defaultOption.value,
        }));
      }

      setSelectedOption(defaultOption);
    }
  }, [cityOptions, formData.governorate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (isSubmitted) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };

        if (name === "full_name") {
          if (!value.trim()) {
            newErrors.full_name = "This field is required";
          } else if (value.trim().length < 8) {
            newErrors.full_name = "This field must have at least 8 characters";
          } else {
            delete newErrors.full_name;
          }
        }

        if (name === "phone") {
          if (!value.trim()) {
            newErrors.phone = "This field is required";
          } else if (value.trim().length < 8) {
            newErrors.phone = "This field must have at least 8 numbers";
          } else {
            delete newErrors.phone;
          }
        }

        if (name === "address") {
          if (!value.trim()) {
            newErrors.address = "This field is required";
          } else if (value.trim().length < 8) {
            newErrors.address = "This field must have at least 8 characters";
          } else {
            delete newErrors.address;
          }
        }

        return newErrors;
      });
    }
  };

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      let newQuantity = prev;
      if (type === "increase") {
        if (prev < product_quantity) newQuantity = prev + 1;
        else
          toast.warn(
            `لا يمكن إضافة المزيد، الكمية القصوى المتاحة هي ${product_quantity}.`
          );
      } else if (type === "decrease" && prev > 1) {
        newQuantity = prev - 1;
      }
      return newQuantity;
    });
  };

  const handleSelectChange = (option) => {
    setSelectedOption(option);
    setFormData((prev) => ({
      ...prev,
      governorate: option.value,
    }));
  };

  const handleSubmitInternal = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!product_quantity || product_quantity === 0) {
      toast.error("This product is out of stock");
      return;
    }
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "This field is required";
    } else if (formData.full_name.trim().length < 8) {
      newErrors.full_name = "Name must be at least 8 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "This field is required";
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = "Phone must be at least 8 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "This field is required";
    } else if (formData.address.trim().length < 8) {
      newErrors.address = "Address must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    const priceNew = quantity * price;

    try {
      const res = await fetch(
        `https://shehab.farmin.online/api/blocked-phones?merchant_id=${globalValue}`
      );
      const result = await res.json();
      const blockedPhones = (result?.data || []).map((item) => item.phome);

      if (blockedPhones.includes(formData.phone)) {
        toast.error("رقم الهاتف محظور ولا يمكن إتمام الطلب.");
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
      formDataToSend.append("total", priceNew);
      formDataToSend.append("currency", "SAR");
      formDataToSend.append("products_id[]", id);
      formDataToSend.append("quantity[]", quantity); // الكمية المحددة للمنتج الواحد

      // إرسال اللون والمقاس للمنتج الواحد
      if (selectedColor) {
        formDataToSend.append("option_color", selectedColor);
      }
      if (selectedSize) {
        formDataToSend.append("option_size", selectedSize);
      }
      formDataToSend.append("city_id", formData.governorate);

      const response = await fetch("https://shehab.farmin.online/api/orders", {
        method: "POST",
        body: formDataToSend,
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          setFormData({
            full_name: "",
            phone: "",
            governorate: initialGovernorate || "",
            address: "",
          });
          setQuantity(1);
          setIsSubmitted(false);
          toast.success("تم إرسال الطلب بنجاح!");
          const defaultOptionForReset =
            cityOptions.find(
              (opt) => opt.value === (initialGovernorate || "")
            ) || null;
          setSelectedOption(defaultOptionForReset);

          const cityName = selectedOption ? selectedOption.label : "غير معروف";
          const now = new Date();
          const orderDate = now.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const orderTime = now.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          // *** إنشاء كائن المنتج وتمريره ضمن orderDetailsForDisplay ***
          const orderedProduct = {
            product_id: id,
            name: product_name, // استخدام اسم المنتج من الـ props
            image: product_image, // استخدام رابط الصورة من الـ props
            quantity: quantity,
            unit_price: price,
            total_price: priceNew, // السعر الكلي لهذا المنتج (الكمية * سعر الوحدة)
            color: selectedColor,
            size: selectedSize,
          };

          const orderDetailsForDisplay = {
            name: formData.full_name,
            mobile: formData.phone,
            address: formData.address,
            city_id: formData.governorate,
            final_price: priceNew, // السعر الإجمالي للمنتج الواحد
            city_name: cityName,
            order_date: orderDate,
            order_time: orderTime,
            // *** إضافة مصفوفة المنتجات المطلوبة (تحتوي على منتج واحد هنا) ***
            ordered_products: [orderedProduct],
          };

          const encodedOrderDetails = encodeURIComponent(
            JSON.stringify(orderDetailsForDisplay)
          );
          router.push(`/order?data=${encodedOrderDetails}`);
        } else {
          toast.error(`فشل في إرسال الطلب: ${data?.msg || "حدث خطأ"}`);
        }
      } else {
        const text = await response.text();
        toast.error("فشل في استلام رد صحيح من السيرفر.");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الطلب.");
    }
  };

  const priceNew = quantity * price;

  return (
    <>
      <div>
        <p className="formTitle">
          Please fill your information to complete the order
        </p>
        <form ref={formRef} onSubmit={handleSubmitInternal}>
          {/* Quantity */}
          <div className="quantityCounter">
            <label htmlFor="quantity" className="formLabel">
              Items Count
            </label>
            <div className="quantityControls">
              <button
                type="button"
                className="quantityButton"
                onClick={() => handleQuantityChange("increase")}
                disabled={quantity >= product_quantity}
              >
                <FontAwesomeIcon icon={faPlus} className="quantityIcon" />
              </button>
              {product_quantity === null || product_quantity === 0 ? (
                <p className="quantityDisplay" style={{ color: "red" }}>
                  0
                </p>
              ) : (
                <p className="quantityDisplay">{quantity}</p>
              )}
              <button
                type="button"
                className="quantityButton"
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                <FontAwesomeIcon icon={faMinus} className="quantityIcon" />
              </button>
            </div>
            {product_quantity === null ||
              (product_quantity === 0 && (
                <p className="quantityWarning" style={{ color: "red" }}>
                  This product is out of stock
                </p>
              ))}
            {quantity === product_quantity && product_quantity > 0 && (
              <p
                style={{ color: "green", fontSize: "15px", marginTop: "10px" }}
                className="quantityWarning"
              >
                {product_quantity} items available
              </p>
            )}
          </div>

          {/* Full Name */}
          <div className="formGroup">
            <label className="formLabel">Insert Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="formInput"
              placeholder="[Insert Full Name]"
              style={{ border: errors.full_name ? "1px solid red" : "" }}
              required
            />
            {errors.full_name && (
              <p style={{ color: "red" }}>{errors.full_name}</p>
            )}
          </div>

          {/* Phone */}
          <div className="formGroup">
            <label className="formLabel">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="formInput"
              placeholder="05*"
              style={{ border: errors.phone ? "1px solid red" : "" }}
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>

          {/* Governorate */}
          <div className="formGroup">
            <label className="formLabel">المحافظة</label>
            <Select
              onChange={handleSelectChange}
              options={cityOptions}
              value={selectedOption}
              instanceId="governorate-select"
            />
          </div>

          {/* Address */}
          <div className="formGroup">
            <label className="formLabel">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="formTextarea"
              placeholder="city \ street \ special mark"
              rows="4"
              style={{ border: errors.address ? "1px solid red" : "" }}
            ></textarea>
            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
          </div>

          {/* Price Summary */}
          <div className="priceSummary">
            <div className="priceRow">
              <dt>Shipping Cost</dt>
              <dd>Free Shipping</dd>
            </div>
            <div className="priceRow">
              <dt>Total</dt>
              <dd>{priceNew} SAR</dd>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="submitButton">
            <FontAwesomeIcon icon={faCreditCard} /> Buy it now
          </button>
          {/* Bottom for mobile */}
          {/* {bottom_of_the_page === 0 && ( */}
          <div className="bottomActions ">
            <div className="quantityControls conut">
              <button
                type="button"
                className="quantityButton"
                onClick={() => handleQuantityChange("increase")}
                disabled={quantity >= product_quantity}
              >
                <FontAwesomeIcon icon={faPlus} className="quantityIcon" />
              </button>
              <p className="quantityDisplay">{quantity}</p>
              <button
                type="button"
                className="quantityButton"
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
              >
                <FontAwesomeIcon icon={faMinus} className="quantityIcon" />
              </button>
            </div>

            <button type="submit" className="submitButton buyNow-1">
              <FontAwesomeIcon icon={faCreditCard} className="buttonIcon" />
              Buy it now
            </button>
          </div>
          {/* // )} */}
        </form>
        <ToastContainer autoClose={1000} position="top-center" />
      </div>
    </>
  );
}
