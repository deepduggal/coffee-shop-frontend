import React from 'react'

export default function Header() {
  return (
    <header className='pt-12 pb-8 px-12'>
      <nav className='flex justify-start'>
        <a className='p-4 text-sm underline' href="/">Shop</a>
        {/* <a className='p-4 text-sm underline' href="#about">About</a> */}
        {/* <a className='p-4 text-sm underline' href="#contact">Contact</a> */}
      </nav>
    </header>
  )
}
