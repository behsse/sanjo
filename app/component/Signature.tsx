"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Product } from '@/libs/types';
import SignatureCards from './SignatureCards';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Arrow } from './Arrow';
import SkeletonSignatureCards from './SkeletonSignatureCards';

const Signature = () => {
  const [signatureProduct, setSignatureProduct] = useState<Product[]>([]);
  const sliderRef = useRef<Slider | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => { 
    setTimeout(() => {
      setLoading(false);
    }, 500);
    sessionStorage.setItem("isLoading", "true");
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 3,  // Par défaut, afficher 3 cartes
    slidesToScroll: 1,
    speed: 500,
    centerPadding: "0",    
    nextArrow: <Arrow onClick={() => sliderRef.current?.slickNext()} />,
    prevArrow: <Arrow left={true} onClick={() => sliderRef.current?.slickPrev()} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false, 
        }
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false, 
        }
      },
      {
        breakpoint: 425, // À partir de 425px (petits écrans)
        settings: {
          slidesToShow: 1,  // Afficher un seul élément principal
          centerMode: true,
          centerPadding: "50px", // Ajouter un padding pour que les éléments de gauche/droite soient partiellement visibles
          arrows: false, // Cacher les flèches pour petits écrans
        },
      },
      {
        breakpoint: 320, // À partir de 425px (petits écrans)
        settings: {
          slidesToShow: 1,  // Afficher un seul élément principal
          centerMode: true,
          centerPadding: "35px", // Ajouter un padding pour que les éléments de gauche/droite soient partiellement visibles
          arrows: false, // Cacher les flèches pour petits écrans
        },
      },
    ]
  };

  return (
    <div className='min-h-[100vh]'>
      <div className='p-6 md:p-12 text-right mb-12 md:mb-32'>
        <p className='text-red-600 text-xl md:text-2xl'>オリジナルの作品</p>
        <p className='text-4xl md:text-6xl'>Signature</p>
      </div>
      <div className='flex items-center justify-center'>
        <Slider {...settings} ref={sliderRef} className="w-3/5 max-[1024px]:w-3/4 max-[768px]:w-full">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SkeletonSignatureCards key={index} />
              ))
            : signatureProduct.map((product) => (
                <SignatureCards
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  japName={product.japaneseName}
                  image={product.image}
                  price={product.price.toFixed(2)}
                  ingredients={product.ingredients}
                />
              ))
          }
        </Slider>
      </div>
    </div>
  );
};

export default Signature;
