'use client'

import {
  DEFAULT_COUNT,
  MAX_OPTIONS_TO_SHOW,
  countCheckedFilters,
  fulfillOptions,
} from '@/functions'
import { FilterParams } from '@/types'
import { twMerge } from 'tailwind-merge'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import PriceRange from './PriceRange'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import SelectSearch from 'react-select-search'
import getProducts from '@/server'

const initialPriceFilter: FilterParams = {
  value: '',
  code: '',
}

const FilterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [checkedFilters, setCheckedFilters] = useState<FilterParams[]>([])
  const [checkedPriceFilter, setCheckedPriceFilter] = useState<FilterParams>(initialPriceFilter)
  const { data, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(checkedFilters, checkedPriceFilter),
    enabled: false,
  })

  const options = useMemo(() => fulfillOptions(data!), [data])
  const filtersCount = useMemo(
    () => countCheckedFilters(data!, checkedFilters),
    [data, checkedFilters]
  )

  const checkedSet = new Set(checkedFilters.map((filter) => filter.value))

  const handleClear = () => {
    setCheckedFilters([])
    setCheckedPriceFilter(initialPriceFilter)
    setIsModalOpen(false)
  }

  const handlePriceUpdate = useCallback(
    (filter: FilterParams) => {
      setCheckedPriceFilter(filter)
      setIsModalOpen(false)
    },
    [setCheckedPriceFilter]
  )

  const handleChange = useCallback(
    (filter: FilterParams) => {
      const { value } = filter

      setCheckedFilters((prevFilters) =>
        prevFilters.some((item) => item.value === value)
          ? // remove filter if it is already checked
            prevFilters.filter((item) => item.value !== value)
          : // add filter if it is not checked
            [...prevFilters, filter]
      )
      setIsModalOpen(false)
    },
    [setCheckedFilters]
  )

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isModalOpen])

  useEffect(() => {
    refetch()
  }, [checkedFilters, checkedPriceFilter, refetch])

  return (
    <div className='flex'>
      <div className='relative flex flex-col flex-1 gap-5'>
        <div className='w-full h-full relative'>
          <Image
            src='https://gymbeam.com/media/logo/websites/5/GB_Logo_Energy_COM.png'
            alt='GymBeam'
            width={200}
            height={200}
          />
        </div>
        <h5 className='text-xl md:text-sm lg:text-lg font-semibold'>Sports Nutrition</h5>
        <button
          onClick={() => setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen)}
          className='bg-amber-400 hover:bg-amber-500 rounded-md p-2 w-full'
        >
          See filters
        </button>
      </div>
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-10'>
          <div className='bg-black bg-opacity-50 absolute inset-0'></div>
          <div className='grid bg-white p-6 rounded-lg z-10 lg:w-2/3 w-5/6'>
            <h2 className='text-xl font-semibold mb-4'>Filters ({filtersCount})</h2>
            <div className='grid gap-5 overflow-auto no-scrollbar max-h-[60vh]'>
              {data?.filters?.map((filter) => {
                const specificFilteredOptions = options.filter(
                  (option) => option.type === filter.code && !checkedSet.has(option.value as string)
                )
                const activeOptions = filter.options?.filter(
                  (option, index) =>
                    index < MAX_OPTIONS_TO_SHOW ||
                    checkedFilters.find((filter) => filter.value === option.value)
                )
                const isPriceRange = filter.type === 'range'

                return (
                  <div key={filter.code} className='grid gap-3 border-[1px] p-3 rounded-md'>
                    <div className='flex justify-between md:flex-row flex-col'>
                      <h6 className='font-semibold mb-1'>{filter.name}</h6>
                      {!isPriceRange && (
                        <SelectSearch
                          options={specificFilteredOptions}
                          value={''}
                          closeOnSelect
                          search
                          onChange={(value) => {
                            handleChange({ value: value.toString(), code: filter.code })
                          }}
                          placeholder='Search more'
                        />
                      )}
                    </div>

                    <div className='flex flex-wrap gap-3'>
                      {activeOptions?.map((option) => {
                        const formattedFilterName = `${option.name} (${option.count})`
                        const isActiveOption = checkedFilters.some(
                          (filter) => filter.value === option.value
                        )

                        return (
                          <button
                            key={option.value}
                            type='button'
                            onClick={() => handleChange({ value: option.value, code: filter.code })}
                            className={twMerge(
                              `cursor-pointer bg-amber-200 hover:bg-amber-300 rounded-md p-1 ${
                                isActiveOption && 'bg-amber-400 hover:bg-amber-400'
                              }`
                            )}
                          >
                            <p className='text-sm'>{formattedFilterName}</p>
                          </button>
                        )
                      })}
                    </div>
                    {isPriceRange && (
                      <PriceRange
                        handlePriceUpdate={handlePriceUpdate}
                        filter={filter}
                        checkedPriceFilter={checkedPriceFilter}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            <div className='flex justify-between mt-4 gap-5'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded w-full'
              >
                Close
              </button>
              <button
                onClick={handleClear}
                className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded w-full disabled:bg-blue-200 disabled:cursor-not-allowed'
                disabled={checkedFilters.length === DEFAULT_COUNT}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterModal
