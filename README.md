# Docs
A front-end for an e-commerce website with cart and checkout functionality. The back-end is in a separate repo, deployed, and consumed by this front-end.

## Functionality
1. **Product Display**: A product display page that fetches product data from a MongoDB database via an Express API. The product images are stored in Cloudinary.
2. **Shopping Cart**: A shopping cart where users can add, modify, or remove products.
3. **Checkout System**: A checkout system that simulates transaction processes.

## Routes
 - ```/``` - View and purchase products
 - ```/products/[id]``` - View a product's details
 - ```/checkout``` - A checkout page where user's can enter info for the purchase. Since this is a demo project, checking out just validates form fields, gives you a fresh cart, and redirects to the shop page.


===============================
===============================

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
