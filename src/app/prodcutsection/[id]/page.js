import Prodcutsection from "@/components/prodcutpage/Prodcutsection";
import React from "react";

export default function Page({ params }) {
  const id = params.id;
  return (
    <div>
      <Prodcutsection id={id} />
    </div>
  );
}