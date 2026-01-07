import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const sector = searchParams.get('sector')
    const geography = searchParams.get('geography')
    const saved = searchParams.get('saved')
    const bookmarked = searchParams.get('bookmarked')

    let where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { organization: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (sector && sector !== 'all') {
      where.sector = sector
    }

    if (geography && geography !== 'all') {
      where.geography = geography
    }

    if (saved === 'true') {
      where.saved = true
    }

    if (bookmarked === 'true') {
      where.bookmarked = true
    }

    const grants = await db.grantOpportunity.findMany({
      where,
      orderBy: {
        deadline: 'asc'
      }
    })

    return NextResponse.json(grants)
  } catch (error) {
    console.error('Error fetching grants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch grants' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const grant = await db.grantOpportunity.create({
      data: {
        title: body.title,
        organization: body.organization,
        description: body.description,
        sector: body.sector,
        amountMin: body.amountMin,
        amountMax: body.amountMax,
        currency: body.currency || 'USD',
        deadline: new Date(body.deadline),
        timezone: body.timezone || 'UTC',
        geography: body.geography,
        eligibility: body.eligibility,
        link: body.link,
        status: body.status || 'active',
        saved: body.saved || false,
        bookmarked: body.bookmarked || false
      }
    })

    return NextResponse.json(grant, { status: 201 })
  } catch (error) {
    console.error('Error creating grant:', error)
    return NextResponse.json(
      { error: 'Failed to create grant' },
      { status: 500 }
    )
  }
}
