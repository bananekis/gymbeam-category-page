export interface Data {
  items?: Item[] | null
  meta: Meta
  filters?: Filter[] | null
}
export interface Item {
  id: number
  sku: string
  name: string
  price: number
  formatted_price: string
  product_url: string
  image: string
  thumbnail: string
  small_image: string
  reviews_count: number
  rating_summary: number
  saleable: boolean
  form_inputs: string
  form_action: string
  labels?: (Label | null)[] | null
}
export interface Label {
  type: number
  label_text: string
  image: string
  image_size: string
  position: number
  style: string
}
export interface Meta {
  pages?: Page[] | null
  current_page: number
  last_page: number
  from: number
  to: number
  per_page: number
  total: number
  next_url: string
  next_page: number
}
export interface Page {
  url: string
  label: number | string
  active: boolean
  class_name: string
  page: number
}
export interface Filter {
  name: string
  code: string
  global_name: string
  display_mode?: string | null
  type: string
  position?: string | null
  options?: Option[] | null
  min?: number | null
  max?: number | null
}
export interface Option {
  name: string
  slug?: string | null
  value: string
  count: number
}

export type FilterParams = {
  value: string
  code: string
}
