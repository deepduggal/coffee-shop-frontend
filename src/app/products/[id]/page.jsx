'use client';
import {useContext, useState, useEffect} from 'react';
import { CartProvider, CartContext } from '@/app/data/providers/Cart';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { login } from '@/app/api-client/auth';
import { getProducts } from '@/app/api-client/products';

function ProductPage({params: {id}}) {
  // const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    login()
    .then((data) => {
      const {user, token} = data;
      setisLoading(true);
      return getProducts(token)
    })
    .then((productData) => {
      setProducts(productData.products);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => setisLoading(false));
  }, []);

  const productData = products?.length && products.find(product => product._id === id);

  return (
    <>
      <Header/>
      <main className='pt-2 pb-12 px-24'>
        {isLoading && <p>Loading...</p>}
        {!isLoading && productData && <div className='flex flex-col'>
          <h1 className='my-8 text-3xl font-bold'>{productData.name}</h1>
          <img className='h-80 my-12 lg:w-1/2 lg:m-auto object-cover' src={productData.imageUrl} alt={productData.description}/>
          <div className='text-2xl'>${productData.price}</div>
          <div className='font-light'>{productData.stock > 0? 'In Stock': 'Out of Stock'}</div>
          <p className='py-5'>{productData.description}</p>
          {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={e => addToCart(productData)}>Add To Cart</button> */}
        </div>
        }
      </main>
      <Footer/>
    </>
  )
}

export default function ProductPageWithProviders({params}) {
  return (
    <CartProvider>
      <ProductPage params={params}/>
    </CartProvider>
  )
}