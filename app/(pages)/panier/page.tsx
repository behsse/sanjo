"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react';

interface Product {
  id : number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function Panier(){

  const [storedProduct, setStoredProduct] = useState<Product[]>([]);

  const fraisLivraison = 4.30;

  useEffect(() => {
    const product = localStorage.getItem("cart");
    if (product) {
      setStoredProduct(JSON.parse(product));
    }
  }, []);

  const deleteProduct = (id: number) => {
    const cart = [...storedProduct];
    if (cart) {
      const index = cart.findIndex(item => item.id === id);
      if (index !== -1) {
        cart.splice(index, 1); 
        setStoredProduct(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  };
  
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...storedProduct];
    updatedProducts[index].quantity = newQuantity;
    setStoredProduct(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
  };

  const calculateTotal = (livraison : boolean) => {
    if(livraison){
      return storedProduct.reduce((acc, product) => acc + product.price * product.quantity + fraisLivraison, 0).toFixed(2);
    }
    else{
      return storedProduct.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
    }
  };

  return(
    <div className='flex w-full h-full justify-center p-10 gap-16'>
      <div className='grid gap-8 h-full w-1/2'>
        <p className='text-xl font-semibold'>Panier</p>
        <div className='grid gap-8'>
          {storedProduct.length > 0 ? 
            storedProduct.map((product, index) => 
              <div key={index}>
                <div className='flex gap-4'>
                  <Image src={product.image} alt='' height={100} width={100} className='w-14 h-14'/>  
                  <div className='w-full grid gap-2'>
                    <div className='grid gap-2'>
                      <div className='flex items-center justify-between'>
                        <p>{product.name}</p>  
                        <p>{(product.price * product.quantity).toFixed(2)}€</p>  
                      </div>
                      <div className='w-full flex justify-between items-center'>
                        <p className='flex gap-4'>Quantité : 
                            <select 
                                name="" 
                                id="" 
                                className='text-foreground bg-transparent outline-offset-0 cursor-pointer'
                                value={product.quantity}
                                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                                >
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
                                  <option 
                                  key={value} 
                                  value={value} 
                                  className='text-background flex items-center'
                                  >
                                    {value}
                                    
                                  </option>
                                ))}
                              </select>
                          </p>  
                        <button className='p-2.5 w-9 h-9 text-foreground rounded-full flex items-center justify-center transition-all hover:bg-background/90' onClick={() => deleteProduct(product.id)}><Trash2/></button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='h-[0.2px] bg-border w-full mt-8'></div>
              </div>
            )
            : 
            <p>Il n&apos;y a aucun article dans ton panier.</p>
          }
          </div>
      </div>
      <div className='grid gap-8 w-1/5 h-full'>
        <p className='text-xl font-semibold'>Récapitulatif</p>
        <p>As-tu un code promo ?</p>
        <div className='flex justify-between gap-4'>
          <input type="text" name="" id="" className='rounded-xl bg-foreground text-background px-4'/>
          <button className='bg-foreground text-background rounded-xl px-4 py-2 transition hover:bg-foreground/85'>Appliquer</button>
        </div>
        <div className='flex justify-between'>
          <p>Sous-total</p>
          {storedProduct.length > 0 ? <p>{calculateTotal(false)}€</p> : <p>-</p>}
        </div>
        <div className='flex justify-between'>
          <p>Frais de livraison</p>
          {storedProduct.length > 0 ? <p>{fraisLivraison.toFixed(2)}€</p> : <p>-</p>}
        </div>
        <div className='flex justify-between'>
          <p>Total</p>
          {storedProduct.length > 0 ? 
            <p>{calculateTotal(true)}€</p>: <p>-</p>
          }
        </div>
        <button className='bg-foreground text-background rounded-xl p-4 transition hover:bg-foreground/85'>Paiement</button>
      </div>
    </div>
  )
}