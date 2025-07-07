"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./headerslider.css";
import Image from "next/image";
import Header_itme from "./Header_itme";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";
export default function Headerslider() {
  const globalValue = useSelector((state) => state.global.globalValue);

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://altamyouzkw.com/api/main_background?merchant_id=${globalValue}`,
        {
          revalidate: 0,
        }
      );
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);
  let headersliderImg = data?.data.map((item, index) => {
    return (
      <SwiperSlide key={item.slug || index}>
        <Image
          width={1000}
          height={500}
          quality={100}
          src={item.cover}
          alt={item.description}
        />
      </SwiperSlide>
    );
  });

  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div style={{ overflow: "hidden" }}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 7000 }}
        className="swiper-container"
      >
        {headersliderImg}
      </Swiper>
    </div>
  );
}
