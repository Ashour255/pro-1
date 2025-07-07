import React from "react";
import ListOfProdcut from "./ListOfProdcut";
import Prodcutbage_itme from "./prodcutpage_itme";
export default function Minieddy() {
  return (
    <div className="product-bags">
      <div className="container">
        <div className="title">
          <h2>MINI EDDY</h2>
          <ListOfProdcut />
        </div>
        <div className="row">
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
          <Prodcutbage_itme />
        </div>
      </div>
    </div>
  );
}
