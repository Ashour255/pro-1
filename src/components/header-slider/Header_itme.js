import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SwiperSlide } from "swiper/react";

export default function Header_itme() {
  // const globalValue = useSelector((state) => state.global.globalValue);

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(
  //       `https://altamyouzkw.com/api/section-header?merchant_id=${globalValue}`
  //     );
  //     const result = await res.json();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []); // سيتم تشغيلها عند أول تحميل فقط

  console.log(data);
  return (
    <>
      <Image
        width={1000}
        height={500}
        quality={100}
        src="/imges/h1.jpg"
        alt="Slide 1"
      />
    </>
  );
}
