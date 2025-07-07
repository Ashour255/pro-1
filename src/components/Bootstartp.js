"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
export default function Bootstrap() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return null;
}
