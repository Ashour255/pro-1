"use client";
import React, { useState, useEffect } from "react";
import "./prodcutpage.css";
import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ListOfProdcut({ onChange }) {
  const options = [
    "Highest Rate",
    "Newest",
    "Oldest",
    "Lowest Price",
    "Highest Price",
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOption = localStorage.getItem("selectedSortOption");
      if (savedOption && options.includes(savedOption)) {
        setSelectedOption(savedOption);
        if (typeof onChange === "function") {
          onChange(savedOption); // نبلغ الأب بالاختيار المحفوظ
        }
      }
    }
  }, [onChange , options]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);

    if (typeof window !== "undefined") {
      localStorage.setItem("selectedSortOption", option);
    }

    if (typeof onChange === "function") {
      onChange(option); // نبلغ الأب بالاختيار الجديد
    }
  };

  return (
    <div className="sorting-dropdown">
      <button
        className="selected-option"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="dropdown-arrow">
          <FontAwesomeIcon icon={faChevronUp} />
          <FontAwesomeIcon icon={faChevronDown} style={{ marginTop: "-3px" }} />
        </span>
        {selectedOption}
      </button>

      {isDropdownOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li
              key={option}
              className={`option-item ${
                selectedOption === option ? "active" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
              {selectedOption === option && (
                <span className="checkmark">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
