import { Data, FilterParams } from '@/types'
import { sportsNutritionFilterURL } from '@/config'
import ky from 'ky'

export default async function getProducts(
  filters?: FilterParams[],
  priceFilter?: FilterParams
): Promise<Data | undefined> {
  try {
    const queryParams = new URLSearchParams(sportsNutritionFilterURL)

    filters?.forEach((filter) => {
      if (filter.code && filter.value) {
        queryParams.append(`${filter.code}[]`, filter.value)
      }
    })

    if (priceFilter?.code && priceFilter?.value) {
      queryParams.append(priceFilter.code, priceFilter.value)
    }

    const apiUrl = `/api?${queryParams.toString()}`

    return await ky.get(apiUrl).json()
  } catch (err) {
    console.error(err)
    return undefined
  }
}
