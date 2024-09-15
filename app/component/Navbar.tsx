"use client";

import Image from "next/image";
import { ShoppingCart, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const Navbar = () => {
  const [storedProducts, setStoredProducts] = useState<Product[]>([]);
  const [finallyPrice, setFinallyPrice] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);  // State pour gérer l'ouverture du menu sur mobile
  
  const updateProducts = () => {
    const product = localStorage.getItem("cart");
    if (product) {
      const parsedProducts = JSON.parse(product);
      setStoredProducts(parsedProducts);
      const price = parsedProducts.reduce((acc: number, product: { price: number; quantity: number; }) => acc + product.price * product.quantity, 0);
      setFinallyPrice(price);
    } else {
      setStoredProducts([]);
      setFinallyPrice(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateProducts();
    }, 100);
    return () => clearInterval(interval);  // Clean up l'intervalle pour éviter les fuites de mémoire
  }, []);

  return (
    <div className={`flex justify-between p-6 bg-foreground sticky top-0 w-full z-50 ${menuOpen ? 'lg:items-start' : 'lg:items-center'} ${menuOpen ? 'lg:h-screen' : 'lg:h-fit'}`}>
      <Link href="/">
        <Image 
          src="/logo.svg" 
          alt="Logo"
          width={100}
          height={100}
          className="relative z-50"
        />
      </Link>

      {/* Menu navigation */}
      <nav className={`fixed top-0 left-0 w-full h-full bg-foreground text-background flex flex-col items-center justify-center gap-8 transition-transform transform ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:static lg:w-1/3 lg:h-auto lg:bg-transparent lg:translate-x-0 lg:flex lg:flex-row`}>
        <ul className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full lg:gap-0">
          <li><Link href="/" className="flex flex-col"><span className="text-red-600">メニュー</span>La carte</Link></li>
          <li><Link href="/">Signature</Link></li>
          <li><Link href="/">Découverte</Link></li>
          <li><Link href="/">Box</Link></li>
          <li><Link href="/">Bon plan</Link></li>
        </ul>
      </nav>

      <div className="text-background flex items-center gap-6 lg:gap-10">
        <Link href="/panier" className="flex items-center gap-2 lg:gap-4">
          <div className="relative">
            <ShoppingCart />
            {storedProducts.length > 0 ? 
              <span className="bg-red-600 p-1 w-3.5 h-3.5 rounded-full absolute bottom-5 left-5 flex items-center justify-center text-foreground text-[8px]">{storedProducts.length}</span>
              : <></>}
          </div>
          <div className="text-xs hidden lg:block"> {/* Cacher les infos du panier sur mobile */}
            <p className="font-bold">Votre panier</p>
            <p>{finallyPrice.toFixed(2)}€</p>
          </div>
        </Link>
        <button 
        className="lg:hidden text-background relative z-50" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
      </button>
      </div>


    </div>
  );
}

export default Navbar;
