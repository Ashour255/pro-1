import Image from 'next/image'
import React from 'react'

export default function Imghome() {
  return (
    <div className="img container mx-auto m-5">
      <Image
        src={"/imges/imgback.jpg"}
        width={1000}
        height={500}
        alt="000"
        style={{ borderRadius: "10px", overflow: "hidden" }}
      />
    </div>
  )
}
