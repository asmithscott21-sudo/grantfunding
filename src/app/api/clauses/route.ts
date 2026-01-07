import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const riskRating = searchParams.get('riskRating')
    const isStandard = searchParams.get('isStandard')

    let where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { text: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (riskRating && riskRating !== 'all') {
      where.riskRating = riskRating
    }

    if (isStandard !== null) {
      where.isStandard = isStandard === 'true'
    }

    const clauses = await db.clauseLibrary.findMany({
      where,
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(clauses)
  } catch (error) {
    console.error('Error fetching clauses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clauses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const clause = await db.clauseLibrary.create({
      data: {
        title: body.title,
        category: body.category,
        text: body.text,
        riskRating: body.riskRating || 'medium',
        isStandard: body.isStandard !== undefined ? body.isStandard : true,
        explanation: body.explanation
      }
    })

    return NextResponse.json(clause, { status: 201 })
  } catch (error) {
    console.error('Error creating clause:', error)
    return NextResponse.json(
      { error: 'Failed to create clause' },
      { status: 500 }
    )
  }
}
