'use client'

import { useQuery } from '@tanstack/react-query'
import FadeLoader from 'react-spinners/FadeLoader'
import FilterModal from './FilterModal'
import ProductCard from './ProductCard'
import React from 'react'
import getProducts from '@/server'

const LayoutClient = () => {
  const { data, error, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  if (error) {
    return <div>error: {error.message}</div>
  }

  const renderProductCards = () => {
    if (isFetching) {
      return (
        <div className='flex items-center justify-center w-full'>
          <FadeLoader color='orange' />
        </div>
      )
    }

    if (data?.items?.length === 0) {
      return <div className='flex items-center justify-center w-full'>No Results</div>
    }

    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full auto-rows-max'>
        {data?.items?.map((item) => (
          <div key={item.id} className='h-fit border-2 p-3 rounded-md'>
            <ProductCard item={item} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='flex gap-10 flex-col md:flex-row w-full min-h-[90vh]'>
      <div className='block md:w-1/5 w-full'>
        <FilterModal />
      </div>
      {renderProductCards()}
    </div>
  )
}
export default LayoutClient
