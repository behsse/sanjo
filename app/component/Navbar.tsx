"use client"

import Image from "next/image";
import { ShoppingCart } from 'lucide-react';
import Link from "next/link";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

interface Product {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Navbar = () => {
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);
  const [finallyPrice, setFinallyPrice] = useState(0);
  
  const updateProducts = () => {
    const product = localStorage.getItem("cart");
    if (product) {
      const parsedProducts = JSON.parse(product);
      setStoredProducts(parsedProducts);
      const price = parsedProducts.reduce((acc: number, product: { price: number; quantity: number; }) => acc + product.price * product.quantity, 0);
      setFinallyPrice(price);
    } else{
      setStoredProducts([])
      setFinallyPrice(0)
    }
  };

  useEffect(() => {
    setInterval(() => {
      updateProducts()
    }, 100)
  }, [])

  
  return (
    <div className="flex items-center justify-between p-8 bg-foreground sticky top-0 w-full">
      <Link href="/">
        <Image 
          src="/logo.svg" 
          alt=""              
          width={100}
          height={100}
        />
      </Link>
      <nav className="text-background w-1/3">
        <ul className="flex items-center justify-between">
          <li><Link href="/" className="flex flex-col"><span className="text-red-600">メニュー</span>La carte</Link></li>
          <li><Link href="/">Signature</Link></li>
          <li><Link href="/">Découverte</Link></li>
          <li><Link href="/">Box</Link></li>
          <li><Link href="/">Bon plan</Link></li>
        </ul>
      </nav>
      <div className="text-background flex items-center gap-10">
        <Link href="/panier" className="flex items-center gap-4">
          <div className="relative">
            <ShoppingCart />
            {storedProducts.length > 0 ? 
            <span className="bg-red-600 p-1 w-3.5 h-3.5 rounded-full absolute bottom-5 left-5 flex items-center justify-center text-foreground text-[8px]">{storedProducts.length}</span>
            : <></>}
          </div>
          <div className="text-xs">
            <p className="font-bold">Votre panier</p>
            <p>{finallyPrice.toFixed(2)}€</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
