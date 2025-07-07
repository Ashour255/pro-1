"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./header_Carousel.css"

export default function Header_Carousel() {
  return (
    <div>
      <Swiper
        modules={[Autoplay,Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{delay:7000}}
        // navigation
        className="swiper-container"
      >
        <SwiperSlide>
          <img
            src="/imges/h1.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/imges/h2.jpg"
            alt="Slide 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/imges/h3.jpg"
            alt="Slide 3"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
