"use client";
import { useEffect, useState } from "react";
import Detils_lift from "./Detils_lift";
import Detils_right from "./Detils_right";
import SimilarProductsSection from "../SimilarProducts/SimilarProductsSection";
import Loading from "@/app/loading";
import { useSelector } from "react-redux";

export default function Prodcut_Detils({ slug }) {
  const globalValue = useSelector((state) => state.global.globalValue);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://shehab.farmin.online/api/products-show/${slug}?merchant_id=${globalValue}`,
          { cache: "no-store" }
        );
        if (!res.ok) {
          throw new Error(`فشل الطلب: ${res.status} - ${res.statusText}`);
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [slug, globalValue]);

  if (!slug || (!data && !error)) return <Loading />;
  if (error) return <p style={{ color: "red" }}>خطأ: {error}</p>;

  // استخراج الصور من الـ API
  const productImages =
    data?.data[0]?.media?.map((item) => item.cover_Product) || [];

  return (
    <div
      className="prodcut-detils"
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-7 mt-4 mb-md-5 mb-3 pe-lg-5 ">
            <Detils_lift productImages={productImages} />
          </div>
          <div className="col-12 col-lg-5 mt-md-4 mt-3 mb-5">
            <Detils_right slug={slug} />
          </div>
        </div>
        <div>
          <SimilarProductsSection sectionId={data?.data[0]?.categorie_id} />
        </div>
      </div>
    </div>
  );
}
