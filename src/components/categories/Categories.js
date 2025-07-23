"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./categories.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Categories() {
  const globalValue = useSelector((state) => state.global.globalValue);
  const [data, setData] = useState(null);
  const [mounted, setMounted] = useState(false); // للتحكم في mount

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
    setMounted(true); // تم الـ mount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://shehab.farmin.online/api/section?merchant_id=${globalValue}`,
        {
          next: { revalidate: 0 },
        }
      );
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, [globalValue]);

  const sections = data?.data.map((item, index) => (
    <SwiperSlide key={item.slug || index}>
      <div
        data-aos="fade-up"
        data-aos-delay={index * 100}
        className="last-slide"
      >
        <Link href={`/prodcutsection/${item.id}`}>
          <div className="last-slide-img">
            <Image
              alt=".."
              width={300}
              quality={100}
              height={300}
              src={item.cover}
            />
          </div>
          <h4>
            {item.name} <FontAwesomeIcon className="i" icon={faArrowRight} />
          </h4>
        </Link>
      </div>
    </SwiperSlide>
  ));

  if (!mounted) return null; // أو return skeleton لو حبيت

  return (
    <div style={{ overflow: "hidden" }}>
      <div style={{ maxWidth: "98%" }} className="categories mt-3 container">
        <h2>Categories</h2>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={true}
          className="swiper-container"
          breakpoints={{
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            640: { slidesPerView: 2 },
            0: { slidesPerView: 1.08, spaceBetween: 5 },
          }}
        >
          {sections}
        </Swiper>
      </div>
    </div>
  );
}
