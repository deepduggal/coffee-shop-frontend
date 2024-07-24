'use client';
import React, { useContext, useState } from 'react'
import Cart from '@/app/components/Cart'
import { CartContext, CartProvider } from '@/app/data/providers/Cart';
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import { useRouter } from 'next/navigation';

const CheckoutTextLabelStyles = 'font-bold';
const CheckoutTextInputStyles = 'p-1 mb-1';

function Checkout() {
  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState(false);
  const [billingAddress, setBillingAddress] = useState('');

  const {clearCart} = useContext(CartContext);

  const router = useRouter();
  
  // Validation
  const isEmpty = (value) => value.trim() === '';
  const formIsValid = () => {
    return !isEmpty(firstName) && !isEmpty(lastName) && !isEmpty(email) && !isEmpty(cardNumber) && !isEmpty(expiry) && !isEmpty(cvc) && (isBillingSameAsShipping? !isEmpty(address): !isEmpty(address) && !isEmpty(billingAddress));
  };

  return (
    <div>
      <Header/>
      <main className="flex flex-col min-h-screen pt-2 pb-24 px-24">
        <form className='flex flex-col mb-8'>
          <section className='flex flex-col gap-2 my-3'>
            <h2 className='my-4 text-4xl'>Your Info</h2>
            <div className='flex justify gap-4'>
              <div className='flex flex-col gap-1'>
                <label className={`${CheckoutTextLabelStyles}`} htmlFor='firstName'>First Name</label>
                <input className={`${CheckoutTextInputStyles}`} type='text' name='firstName' placeholder="Deep" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div className='flex flex-col gap-1'>
                <label className={`${CheckoutTextLabelStyles}`} htmlFor='lastName'>Last Name</label>
                <input className={`${CheckoutTextInputStyles}`} type='text' name='lastName' placeholder="Duggal" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </div>
              <div className='flex flex-col gap-1'>
                <label className={`${CheckoutTextLabelStyles}`} htmlFor='email'>Email</label>
                <input className={`${CheckoutTextInputStyles}`} type='email' name='email' placeholder="xyz@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
              </div>
            <label className={`${CheckoutTextLabelStyles}`} htmlFor='address'>Address</label>
            <input className={`${CheckoutTextInputStyles}`} type='text' name='address' placeholder="123 Example St" value={address} onChange={(e) => setAddress(e.target.value)}/>
          </section>

          <section className='flex flex-col gap-2 my-3'>
            <h2 className='my-4 text-4xl'>Payment Info</h2>
            <label className={`${CheckoutTextLabelStyles}`} htmlFor='cardNumber'>Card Number</label>
            <input className={`${CheckoutTextInputStyles}`} type='text' name='cardNumber' minLength={16} maxLength={16} placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
            <div className='flex gap-4'>
              <div className='flex flex-col'>
                <label className={`${CheckoutTextLabelStyles} mb-1`} htmlFor='expiry'>Expiry</label>
                <input className={`${CheckoutTextInputStyles}`} type='text' name='expiry' placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)}/>
              </div>
              <div className='flex flex-col'>
                <label className={`${CheckoutTextLabelStyles} mb-1`} htmlFor='cvc'>CVC</label>
                <input className={`${CheckoutTextInputStyles}`} type='text' name='cvc' placeholder="123" minLength={3} maxLength={3} value={cvc} onChange={(e) => setCVC(e.target.value)}/>
              </div>
            </div>
          </section>

          <section className='flex flex-col gap-2 my-3'>
            <h2 className='my-4 text-4xl'>Billing Address</h2>
            <div>
              <input id='sameAsShipping' className={`${CheckoutTextInputStyles}`} type='checkbox' name='sameAsShipping' onChange={e => {
                setIsBillingSameAsShipping(e.target.checked);
                if (e.target.checked) setBillingAddress(''); // readonly. clear it.
              }} checked={isBillingSameAsShipping}/>
              &nbsp;
              <label className={`${CheckoutTextLabelStyles}`} htmlFor='sameAsShipping'>Same as shipping address</label>
            </div>
            <label className={`${CheckoutTextLabelStyles}`} htmlFor='billingAddress'>Address</label>
            <input className={`${CheckoutTextInputStyles}`} type='text' name='billingAddress' placeholder="123 Example St" readOnly={isBillingSameAsShipping} value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)}/>
          </section>
        </form>

        <Cart />
        <button onClick={() => {
          if (formIsValid()) {
            alert('Order Placed');
            clearCart();
            router.push('/');
          }
          else alert('Please fill out all fields');
        }} className='bg-black text-white p-2 rounded-md mt-4'>Place Order</button>
      </main>
      <Footer/>
    </div>
  )
}

export default function CheckoutWithProviders() {
  return (
    <CartProvider>
      <Checkout />
    </CartProvider>
  )
}