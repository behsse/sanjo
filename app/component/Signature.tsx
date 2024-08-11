"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Product } from '@/libs/types';
import SignatureCards from './SignatureCards';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Arrow } from './Arrow';

const Signature = () => {
  const [signatureProduct, setSignatureProduct] = useState<Product[]>([]);
  const sliderRef = useRef<Slider | null>(null);
  
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
    nextArrow: <Arrow onClick={() => sliderRef.current?.slickNext()}/>,
    prevArrow: <Arrow left={true} onClick={() => sliderRef.current?.slickPrev()}/>
  };

  return (
    <div className='h-[100vh]'>
      <div className='p-12 text-right mb-32'>
        <p className='text-red-600 text-2xl'>オリジナルの作品</p>
        <p className='text-6xl'>Signature</p>
      </div>
      <div className='flex items-center justify-center'>
        <Slider {...settings} ref={sliderRef} className="w-2/3">
          {signatureProduct.map((product) => (
            <SignatureCards key={product.id} id={product.id} name={product.name} japName={product.japaneseName} image={product.image} price={product.price.toFixed(2)} ingredients={product.ingredients}/>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Signature;
