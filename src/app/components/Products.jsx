import Image from 'next/image'
import React, { useContext } from 'react'
import { CartContext } from '@/app/data/providers/Cart';
import Link from 'next/link';

/**
 * A short product overview card
 * @returns 
 */
const ProductOverviewCard = ({productData}) => {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const {_id, name, price, imageUrl, stock, description} = productData;

  return (
    <div className='flex flex-col gap-2 justify-evenly'>

      {/* Product Details */}
      <div className='flex flex-row h-48'>

        {/* Product Image */}
        <div className='w-1/2 h-full'>
          <img className='object-cover w-full max-h-full' src={imageUrl} alt={description}/>
        </div>

        {/* Product Text */}
        <div className='flex flex-col w-1/2 h-full'>
          <Link href={`/products/${_id}`}><h6 className='text-xl font-bold text-center mb-4'>{name}</h6></Link>
          <div className='text-center'>${price}</div>
        </div>
      </div>

      {/* Button(s) */}
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={e => addToCart(productData)}>Add To Cart</button>
    </div>
  );
};

export default function Products({data}) {
  return (
    <div>
      <h1 className='my-8 text-3xl'>Products</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-16'>
        {data.map(product => 
          <ProductOverviewCard key={product._id} productData={product} />
        )}
      </div>
    </div>
  )
}
