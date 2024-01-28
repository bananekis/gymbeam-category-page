import { FC, useEffect, useMemo, useState } from 'react'
import { Filter, FilterParams } from '@/types'
import { Range, getTrackBackground } from 'react-range'
import { parseRangeString } from '@/functions'

const STEP = 1

type Props = {
  handlePriceUpdate: (filter: FilterParams) => void
  filter: Filter
  checkedPriceFilter?: FilterParams
}

const PriceRange: FC<Props> = ({ filter, handlePriceUpdate, checkedPriceFilter }) => {
  const [priceValues, setPriceValues] = useState([Number(filter.min), Number(filter.max)])

  useEffect(() => {
    setPriceValues([Number(filter.min), Number(filter.max)])
  }, [filter.min, filter.max])

  useEffect(() => {
    if (checkedPriceFilter?.value) {
      const newPriceValues = parseRangeString(checkedPriceFilter.value)

      setPriceValues(newPriceValues)
    }
  }, [checkedPriceFilter])

  return (
    <div className='flex justify-center flex-wrap mx-5'>
      <Range
        values={priceValues}
        step={STEP}
        min={Number(filter.min)}
        max={Number(filter.max)}
        onChange={(values) => {
          setPriceValues(values)
        }}
        renderTrack={({ props, children }) => (
          <div
            className='flex w-full h-9'
            style={{ ...props.style }}
            onMouseUp={() => {
              handlePriceUpdate({
                value: `${priceValues[0]}-${priceValues[1]}`,
                code: filter.code,
              })
            }}
            onTouchEnd={() => {
              handlePriceUpdate({
                value: `${priceValues[0]}-${priceValues[1]}`,
                code: filter.code,
              })
            }}
          >
            <div
              ref={props.ref}
              className='w-full h-1 rounded-sm self-center'
              style={{
                background: getTrackBackground({
                  values: priceValues,
                  colors: ['#ccc', '#548BF4', '#ccc'],
                  min: Number(filter.min),
                  max: Number(filter.max),
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            key={props.key}
            style={{ ...props.style }}
            className={`h-12 w-12 rounded-md bg-white flex justify-center items-center shadow-md`}
          >
            <div className={`h-4 w-1 ${isDragged ? 'bg-blue-500' : 'bg-gray-300'}`} />
          </div>
        )}
      />
      <output className='mt-8' id='output'>
        €{priceValues[0]?.toFixed(2)} - €{priceValues[1]?.toFixed(2)}
      </output>
    </div>
  )
}

export default PriceRange
