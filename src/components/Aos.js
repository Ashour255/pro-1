"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Aos() {
  useEffect(() => {
    AOS.init({
      // duration: 500,
      once: true,
      offset: 0,
    });
  }, []);
  return null;
}
