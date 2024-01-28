import { QueryClient } from '@tanstack/react-query'
import LayoutClient from '@/components/LayoutClient'
import getProducts from '@/server'

export default async function Home() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

  return (
    <div className='my-20 lg:mx-20 mx-10'>
      <LayoutClient />
    </div>
  )
}
