"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./prodcut_detils.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Detils_lift = ({ productImages = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // حماية ضد Hydration Mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="product-gallery">
      {isClient && productImages.length > 0 ? (
        <>
          {/* Desktop */}
          <div className="desktop-view">
            <div className="thumbnails">
              {productImages.map((src, index) => (
                <button
                  key={index}
                  className={`thumb-button ${
                    index === activeIndex ? "selected" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="thumb-img-wrapper">
                    <Image
                      width={300}
                      height={300}
                      quality={100}
                      src={src}
                      alt={`Product thumbnail ${index + 1}`}
                      className="thumb-img"
                    />
                  </span>
                  <span
                    className={`thumb-ring ${
                      index === activeIndex ? "selected-ring" : ""
                    }`}
                    aria-hidden="true"
                  ></span>
                </button>
              ))}
            </div>
            <div className="main-image">
              <Image
                width={300}
                height={300}
                quality={100}
                src={productImages[activeIndex]}
                alt={`Product image ${activeIndex + 1}`}
                className="main-img"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="mobile-view">
            <Swiper
              slidesPerView={1.05}
              spaceBetween={5}
              loop={true}
              modules={[Navigation, Pagination]}
              navigation={{
                nextEl: ".next-button",
                prevEl: ".prev-button",
              }}
              onSlideChange={(swiper) => {
                const realIndex = swiper.realIndex;
                setActiveIndex(realIndex);
              }}
              className="slider"
            >
              {productImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <Image
                    width={300}
                    height={300}
                    quality={100}
                    src={src}
                    alt={`Product image ${index + 1}`}
                    className="slider-img"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="slider-controls">
              <button
                aria-label="Previous slide"
                className="slider-button prev-button"
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <p className="slider-counter">
                {activeIndex + 1} / {productImages.length}
              </p>
              <button
                aria-label="Next slide"
                className="slider-button next-button"
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            // marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            minHeight: "50vh",
          }}
        >
          {/* <Image
            src="/imges/Animation -cart.gif"
            alt="No Images"
            width={150}
            height={150}
            className="mb-4"
          /> */}
          <h2 className="text-2xl font-bold">لا توجد صور للمنتج</h2>
          <p>لا يوجد معرض صور متاح لهذا المنتج.</p>
        </div>
      )}
    </div>
  );
};

export default Detils_lift;