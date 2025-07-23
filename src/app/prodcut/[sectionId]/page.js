import Prodcut_Detils from "@/components/prodcts_Detils/Prodcut_Detils";
import React from "react";

export default function Page({ params }) {
  const { sectionId } = params; // استخراج slug من المعاملات الديناميكية
  return (
    <div>
      <Prodcut_Detils slug={sectionId} />
      
    </div>
  );
}
