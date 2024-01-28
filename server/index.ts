import { Data, FilterParams } from '@/types'
import { apiUrl } from '@/config'
import ky from 'ky'

export default async function getProducts(
  filters?: FilterParams[],
  priceFilter?: FilterParams
): Promise<Data | undefined> {
  try {
    let url = apiUrl

    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if (filter.code && filter.value) {
          url += `&${filter.code}[]=${filter.value}`
        }
      })
    }

    if (priceFilter) {
      url += `&${priceFilter.code}=${priceFilter.value}`
    }

    return await ky(url).json()
  } catch (err) {
    console.error(err)
    return undefined
  }
}
