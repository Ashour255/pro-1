"use client";
import Loading from "@/app/loading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Imghome() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState(null);
  const globalValue = useSelector((state) => state.global.globalValue);

  useEffect(() => {
    fetch(
      `https://shehab.farmin.online/api/mid_background?merchant_id=${globalValue}`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res?.data?.[0]);
      })
    setMounted(true);
  }, [globalValue]);

  if (!mounted) return null;
  if (!data?.cover) return <Loading />;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="100"
      className="img container mx-auto m-5"
    >
      <Image
        src={data.cover}
        width={1000}
        height={500}
        alt={data.description || "image"}
        style={{ borderRadius: "10px", overflow: "hidden" }}
      />
    </div>
  );
}
