"use client";
import { useState } from "react";
import Select from "react-select";
// import "./prodcut_detils.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import "./checkout.css";
import Link from "next/link";
export default function Checkout_left() {
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    governorate: "نجران",
    address: "",
  });

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, quantity });
  };

  const options = [
    { value: "نجران", label: "نجران" },
    { value: "منطقة الحدود الشمالية", label: "منطقة الحدود الشمالية" },
    { value: "الباحة", label: "الباحة" },
    { value: "مكه المكرمة", label: "مكه المكرمة" },
    { value: "المنطقة الشرقية", label: "المنطقة الشرقية" },
    { value: "الجوف", label: "الجوف" },
    { value: "جازان", label: "جازان" },
    { value: "القصيم", label: "القصيم" },
    { value: "الرياض", label: "الرياض" },
    { value: "حائل", label: "حائل" },
    { value: "المدينة المنورة", label: "المدينة المنورة" },
    { value: "تبوك", label: "تبوك" },
    { value: "عسير", label: "عسير" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <div className="checkout-form">
      <p className="formTitle">
        Please fill your information to complete the order
      </p>
      <form onSubmit={handleSubmit}>
        <div className={"formGroup"}>
          <label htmlFor="full_name" className={"formLabel"}>
            insert full Name
          </label>
          <input
            type="text"
            className={"formInput"}
            placeholder="[Insert Full Name]"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={"formGroup"}>
          <label htmlFor="phone" className={"formLabel"}>
            Phone Number
          </label>
          <input
            type="tel"
            className={"formInput"}
            placeholder="05*********"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="formGroup">
          <label className="formLabel" htmlFor="governorate">
            المحافظة
          </label>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            instanceId={"select"}
          />
        </div>

        <div className={"formGroup"}>
          <label htmlFor="address" className={"formLabel"}>
            Address
          </label>
          <textarea
            rows="4"
            className={"formTextarea"}
            placeholder="city \ street \ special mark"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <Link href={"/order"}  type="submit" className={"submitButton"}>
          <FontAwesomeIcon icon={faCreditCard} className="buttonIcon" />
          Buy it now
        </Link>
      </form>
    </div>
  );
}
