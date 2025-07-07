"use client";
import React, { useEffect, useState } from "react";
import "./bestseller.css";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
export default function Bestseller_itme() {
  // const globalValue = useSelector((state) => state.global.globalValue);

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch(
  //       `https://altamyouzkw.com/api/products_best_seller?merchant_id=${globalValue}`,
  //       {
  //         revalidate: 0,
  //       }
  //     );
  //     const result = await res.json();
  //     setData(result);
  //   };

  //   fetchData();
  // }, []);

  // let bestSellerItme = data?.data.map((item, index) => {
  //   return (
  //     // <div
  //     //   className="col-lg-3 col-md-4 col-6  prodcut-itme"
  //     //   title="best-seller"
  //     //   key={item.id}
  //     // >
  //     //   <Link href={`/products/${item.id}`}>
  //     //     <div className="best-seller-item">
  //     //       <Image
  //     //         className="best-seller-image"
  //     //         alt="best-seller"
  //     //         src={item.image}
  //     //         width={205}
  //     //         height={225}
  //     //       />
  //     //       <h6>{item.name}</h6>
  //     //       <div className="price">
  //     //         <p className="best-seller-price">{item.price} SAR</p>
  //     //         <p className="best-seller-old-price">
  //     //           <del>{item.old_price} SAR</del>
  //     //         </p>
  //     //       </div>
  //     //     </div>
  //     //   </Link>
  //     // </div>

  //     <div className="col-lg-3 col-md-4 col-6  prodcut-itme" title="best-seller">
  //     <Link href={"/products/5"}>
  //       <div className="best-seller-item">
  //         <Image
  //           className="best-seller-image"
  //           alt="best-seller"
  //           src="/imges/p1.webp"
  //           width={205}
  //           height={225}
  //         />
  //         <h6>Art Deco</h6>
  //         <div className="price">
  //           <p className="best-seller-price">150 SAR</p>
  //           <p className="best-seller-old-price">
  //             <del>100 SAR</del>
  //           </p>
  //         </div>
  //       </div>
  //     </Link>
  //   </div>
  //   );
  // });



  // console.log(data?.data);
  // if (!data)
    // return (
      // <div>
        // <Loading />
      // </div>
    // );

  return (
    <div className="col-lg-3 col-md-4 col-6  prodcut-itme" title="best-seller">
      <Link href={"/products/5"}>
        <div className="best-seller-item">
          <Image
            className="best-seller-image"
            alt="best-seller"
            src="/imges/p1.webp"
            width={205}
            height={225}
          />
          <h6>Art Deco</h6>
          <div className="price">
            <p className="best-seller-price">150 SAR</p>
            <p className="best-seller-old-price">
              <del>100 SAR</del>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
