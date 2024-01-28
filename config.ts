const domain = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8010/proxy'

export const apiUrl = `${domain}/rest/V1/gb/catalog/products?category_ids[]=2416`
