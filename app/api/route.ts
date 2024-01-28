import { NextResponse } from 'next/server'
import { apiUrl } from '@/config'
import ky from 'ky'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const endpoint = apiUrl + requestUrl.search

    const response = await ky(endpoint).json()

    return NextResponse.json(response)
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
