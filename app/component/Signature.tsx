"use client"

import React, { useEffect, useState } from 'react';
import { Product } from '@/libs/types';
import Image from 'next/image';
import SignatureCards from './SignatureCards';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Signature = () => {
  const [signatureProduct, setSignatureProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSignatureProduct = async () => {
      try {
        const response = await fetch('/api/product?tag=signature');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Product[] = await response.json();
        setSignatureProduct(data);
      } catch (error) {
        console.error("Error fetching signature product:", error);
      }
    };

    fetchSignatureProduct();
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    centerPadding: "0",    
    
  };

  return (
    <div className='flex items-center justify-center h-[100vh]'>
      <Slider {...settings} className="w-2/3">
        {signatureProduct.map((product) => (
          <SignatureCards key={product.id} name={product.name} japName={product.japaneseName} image={product.image} price={product.price.toFixed(2)} ingredient={product.ingredients}/>
        ))}
      </Slider>
    </div>
  );
};

export default Signature;
