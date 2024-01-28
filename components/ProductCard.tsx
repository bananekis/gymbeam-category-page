'use client'

import { Item } from '@/types'
import Image from 'next/image'
import React from 'react'
import StarRatings from 'react-star-ratings'

type Props = {
  item: Item
}

const ProductCard = ({ item }: Props) => {
  return (
    <div className='flex flex-col gap-10'>
      <div className='w-full h-full relative aspect-[1/1]'>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes='100%'
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className='flex flex-col justify-between items-left h-auto'>
        <div>
          <p className='md:text-sm font-semibold h-10 overflow-hidden'>
            <a href={item.thumbnail} target='_blank' className='hover:underline' rel='noreferrer'>
              {item.name}
            </a>
          </p>
          <p className='text-orange-400 font-bold'>{item.formatted_price}</p>
        </div>
        <div className='flex gap-1 items-end'>
          <StarRatings
            rating={(item.rating_summary / 100) * 5}
            starRatedColor='orange'
            numberOfStars={5}
            starSpacing='5px'
            starDimension='15px'
          />
          <p className='text-sm text-gray-400'>{item.rating_summary}%</p>
          <p className='text-sm text-gray-400'>({item.reviews_count})</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
