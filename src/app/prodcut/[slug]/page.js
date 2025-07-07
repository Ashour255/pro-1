import Prodcut_Detils from "@/components/prodcts_Detils/Prodcut_Detils";
import React from "react";

export default function page({ params }) {
  const slug = params.slug; // الحصول على المعرف من المعلمات
  return (
    <div>
      <Prodcut_Detils slug={slug} />
    </div>
  );
}
