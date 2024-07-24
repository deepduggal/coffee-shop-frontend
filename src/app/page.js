'use client';

import Image from "next/image";
import Products from "./components/Products";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { login } from "./api-client/auth";
import { getProducts } from "./api-client/products";
import { CartProvider } from "./data/providers/Cart";
import Cart from "./components/Cart";

const productsMockData = [
  {
      "imageUrl": "https://res.cloudinary.com/dccqa1l3v/image/upload/v1719758064/samples/ecommerce/analog-classic.jpg",
      "_id": "667629c38fd2c23ee9f02fd2",
      "name": "Iconic Watch",
      "description": "A classic-looking watch featuring a leather strap. Say luxurious in a thousand words.",
      "price": 2.99,
      "category": "watches",
      "stock": 100,
      "__v": 0
  },
  {
      "imageUrl": "https://res.cloudinary.com/dccqa1l3v/image/upload/v1719758068/samples/people/smiling-man.jpg",
      "_id": "66762f3bf23ed223d9558307",
      "name": "Smiling Man",
      "description": "Faces have a unique effect on the human brain. Why not an image of a smiling man.",
      "price": 1.99,
      "category": "people",
      "stock": 100,
      "__v": 0
  },
  {
      "imageUrl": "https://res.cloudinary.com/dccqa1l3v/image/upload/v1719758069/samples/ecommerce/shoes.png",
      "_id": "6684302229763063d401295e",
      "name": "Purple Sneakers",
      "description": "A no background image of purple sneakers. Lace up!",
      "price": 1.99,
      "category": "shoes",
      "stock": 100,
      "__v": 0
  },
  {
      "imageUrl": "https://res.cloudinary.com/dccqa1l3v/image/upload/v1719758084/samples/food/spices.jpg",
      "_id": "6684307029763063d4012960",
      "name": "Spices",
      "description": "Colorul, evocative, and culturally-significant, a set of spices provides an incomparable presence to your brand.",
      "price": 12.99,
      "category": "food",
      "stock": 1.99,
      "__v": 0
  },
  {
      "imageUrl": "https://res.cloudinary.com/dccqa1l3v/image/upload/v1719758104/samples/shoe.jpg",
      "_id": "668431f4859b3b44362b7350",
      "name": "Women's Sneaker",
      "description": "A feminine white, orange, and pink sneaker on a light pink background.",
      "price": 1,
      "category": "shoes",
      "stock": 1,
      "__v": 0
  },
  {
      "imageUrl": "https://res.cloudinary.com/dccqa1l3v/image/upload/v1719758115/cld-sample-5.jpg",
      "_id": "66843293375c63dd6e3cb15c",
      "name": "White Sneaker",
      "description": "A sneaker with a light blue background.",
      "price": 1,
      "category": "shoes",
      "stock": 100,
      "__v": 0
  },
  {
      "imageUrl": "https://res.cloudinary.com/dccqa1l3v/image/upload/v1719940884/coffee-shop/ic81ekxqnp4ctgnkpihw.png",
      "_id": "66843714c9497b2dedce9b7f",
      "name": "Super User",
      "description": "A productive, growth-oriented computer user. Charts symbolize value and gain. Can be used as a website image.",
      "price": 9.99,
      "category": "mugs",
      "stock": 100,
      "__v": 0
  },
  {
      "imageUrl": "https://res.cloudinary.com/dccqa1l3v/image/upload/v1719972723/coffee-shop/yk2utw5aidejuve4epck.png",
      "_id": "6684b3735a2a2976bbb93344",
      "name": "D Logo",
      "description": "A tasteful logo of the letter D. The green and blue colors are associated with wisdom and trust. The gradient is trending.",
      "price": 5,
      "category": "logos",
      "stock": 91,
      "__v": 0
  },
  {
      "imageUrl": "https://res.cloudinary.com/dccqa1l3v/image/upload/v1719973687/coffee-shop/v0h9vva4idf8lsnir2ty.png",
      "_id": "6684b7379e0823fb7e1215e6",
      "name": "D Logo",
      "description": "A tasteful logo of the letter D. The green and blue colors are associated with wisdom and trust. The gradient is trending.",
      "price": 5,
      "category": "logos",
      "stock": 91,
      "__v": 0
  }
];

export default function Home() {
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

  return (
    <>
      <Header/>
      <CartProvider>
        <main className="flex flex-col min-h-screen pt-2 pb-24 px-12 md:px-24">
          <Cart/>
          {isLoading && <p>Loading...</p>}
          {!isLoading && products && <Products data={products}/>}
        </main>
      </CartProvider>
      <Footer/>
    </>
  );
}