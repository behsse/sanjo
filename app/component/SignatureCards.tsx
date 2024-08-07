import Image from 'next/image'
import React from 'react'
import { ShoppingCart } from 'lucide-react';
import { Salad } from 'lucide-react';

type Props = {
    name : string,
    japName : string,
    price : string,
    image : string,
    ingredient : string[]
}

const SignatureCards = (props : Props) => {

  const AddCart = () => {
    const panier = localStorage.getItem("cart");
    let productList = panier ? JSON.parse(panier) : [];
  
    let productIndex = productList.findIndex((p: { name: string; }) => p.name === props.name);
  
    if (productIndex > -1) {
      productList[productIndex].quantity += 1;
    } else {
      const newProduct = {
        name: props.name,
        image: props.image,
        price: props.price,
        ingredient : props.ingredient,
        quantity: 1
      };
      productList.push(newProduct);
    }
  
    localStorage.setItem("cart", JSON.stringify(productList));
  };

  return (
    <div className='relative bg-foreground text-background flex items-center flex-col rounded-xl py-12 gap-16'>
      <p className='absolute left-5 top-5 text-red-600 opacity-[7%] text-[3.1em] wm'>{props.japName}</p>
      <div className='grid gap-1 text-center'>
        <p className='text-2xl'>{props.name}</p>
        <p className='text-red-600'>{props.japName}</p>
      </div>
      <Image src={props.image} alt='' width={150} height={150}/>
      <div className='flex justify-between items-center w-full px-12'>
        <p className='text-xl'>{props.price}€</p>
        <div className='flex gap-4'>
          <button className='bg-background p-2.5 w-9 h-9 text-foreground rounded-full flex items-center justify-center transition-all hover:bg-background/90'><Salad/></button>
          <button className='bg-background p-2.5 w-9 h-9 text-foreground rounded-full flex items-center justify-center transition-all hover:bg-background/90' onClick={AddCart}><ShoppingCart/></button>
        </div>
      </div>
    </div>
  )
}

export default SignatureCards