'use client';
import Link from "next/link";

import { useContext, useState } from "react"
import { CartContext } from "../data/providers/Cart"

function Cart() {
  const [cartToggled, setCartToggled] = useState(false);
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

  const isCheckoutPage = () => window.location.pathname === '/checkout' 
  const toggleCart = () => setCartToggled(!cartToggled);

  return (
    <div className="relative bg-neutral-200 p-4">
      {/* <button className='absolute right-4 p-2 bg-neutral-300 hover:bg-neutral-400 rounded-sm' onClick={toggleCart}>X</button> */}
      <h1 className="text-2xl">Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => {
              const {product, qty} = item;
              
              return (
                <li key={product._id} className='p-4'>
                  <img src={product.imageUrl} alt={product.name} className='h-16 w-16'/>
                  <h3 className="text-md font-bold">{product.name}</h3>
                  <div className="flex justify-between">
                    <div>${product.price} x {item.qty}</div>
                    {/* <p>Subtotal: ${product.price * item.qty}</p> */}
                    {!isCheckoutPage() && <button onClick={() => removeFromCart(product._id)}>{item.qty > 1 ? 'Decrement': 'Remove'}</button>}
                  </div>
                </li>
              )
            })}
          </ul>
          <p className="font-bold">Total: ${getCartTotal().toFixed(2)}</p>
          <button className='underline' onClick={clearCart}>Empty the cart?</button>
          <div className='pt-6'>
            {!isCheckoutPage() && <Link href={'/checkout'} className='float-right inline-block rounded-md text-neutral-100 bg-blue-400 hover:bg-blue-500 p-2'>Checkout</Link>}
          </div>
        </>
      )}
    </div>
  )
}

export default Cart;