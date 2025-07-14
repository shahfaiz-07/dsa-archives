import axios from 'axios'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_GITHUB_METADATA_URL as string,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
        }
      }
    )

    return NextResponse.json(res.data)
  } catch (error) {
    console.error("GitHub fetch failed:", error)
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 })
  }
}
