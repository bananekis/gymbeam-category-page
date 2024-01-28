'use client'

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default Provider
