import { Data, FilterParams } from '@/types'
import { SelectSearchOption } from 'react-select-search'

export const DEFAULT_COUNT = 0
export const MAX_OPTIONS_TO_SHOW = 3

// Count how many filters are checked due to API inconsistency
export const countCheckedFilters = (data: Data, checkedFilters: FilterParams[]) => {
  return (
    data?.filters?.flatMap((filter) =>
      (filter.options || []).filter((option) =>
        checkedFilters.map((item) => item.value).includes(option.value)
      )
    ).length || DEFAULT_COUNT
  )
}

export const fulfillOptions = (data: Data) => {
  const optionsToAdd: SelectSearchOption[] = []

  data?.filters?.map((filter) =>
    filter.options?.slice(MAX_OPTIONS_TO_SHOW).map((value) => {
      const formattedFilterName = `${value.name} (${value.count})`
      optionsToAdd.push({ name: formattedFilterName, value: value.value, type: filter.code })
    })
  )

  return optionsToAdd
}

export const parseRangeString = (rangeString: string) => {
  const [start, end] = rangeString.split('-').map(Number)
  return [start, end]
}
