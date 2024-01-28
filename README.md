# GymBeam Category Page

## Description

This project is an exercise that involves creating a Category Page for a specific category, "Sports Nutrition," on the GymBeam eCommerce platform. The focus is on implementing basic filters, displaying product details, and ensuring functionality and a good mobile experience.

## Technologies Used

- **Next.js 14**: A React framework for building server-rendered React applications.
- **React Query**: A library for managing and caching asynchronous data in React.
- **HydrationBoundary with Dehydrate**: Utilized for efficient server-side rendering (SSR) and hydration of data in the Next.js application.

## Instructions

### 1. Setup

Make sure you have Node.js and npm installed.

```bash
npm install
```

#### Automatic EsLint Fix

Run the lint fix command to fix eslint automatically

```bash
npm run lint:fix
```

#### Run the Next.js Application

```bash
npm run dev
```

Visit http://localhost:3000 to view the application.

#### Category Page

The "Sports Nutrition" is default category page at http://localhost:3000. The page displays a list of products with product name, price, review rating, and thumbnail.

#### Filters

You can filter products using GET arguments. For example:

http://localhost:8010/proxy/rest/V1/gb/catalog/products?category_ids[]=2416

#### Important Note

- Pagination and Sorting: For simplicity, pagination and sorting functionalities are not implemented in this exercise.
- Design: The design is not crucial for this case study, focus on functionality and mobile experience.

### Explanation of Key Features

- Next.js 14: Next.js 14 is chosen for its improved features, including enhanced app routing and server components, which contribute to better performance and developer experience.

- React Query: React Query is used to manage and cache asynchronous data fetching. It simplifies API calls and state management, ensuring a smooth and efficient data flow.

- HydrationBoundary with Dehydrate: The HydrationBoundary and Dehydrate features of Next.js are essential for efficient SSR and hydration. They help in sending pre-fetching data to the client during server rendering, optimizing performance.

- Bypassing CORS Policy: Due to CORS restrictions, a proxy server is set up to bypass the policy. Applied on Vercel using Next.js API routes.
