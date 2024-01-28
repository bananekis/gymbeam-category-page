import { NextResponse } from 'next/server'
import { apiUrl } from '@/config'
import ky from 'ky'

export async function GET(request: Request) {
  try {
    const forwardedUri = request.headers.get('x-forwarded-uri') || ''
    const endpoint = `${apiUrl}${forwardedUri}`

    const response = await ky(endpoint).json()

    return NextResponse.json(response)
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
