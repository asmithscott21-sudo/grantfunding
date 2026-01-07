import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const applicationId = searchParams.get('applicationId')

    let where: any = {}

    if (applicationId) {
      where.applicationId = applicationId
    }

    const budgets = await db.budget.findMany({
      where,
      include: {
        lineItems: true,
        application: true
      }
    })

    return NextResponse.json(budgets)
  } catch (error) {
    console.error('Error fetching budgets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch budgets' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const budget = await db.budget.create({
      data: {
        applicationId: body.applicationId,
        totalAmount: body.totalAmount,
        currency: body.currency || 'USD',
        matchRequired: body.matchRequired || false,
        matchAmount: body.matchAmount || 0,
        inKindContribution: body.inKindContribution || 0,
        notes: body.notes,
        lineItems: {
          create: body.lineItems?.map((item: any) => ({
            category: item.category,
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitCost: item.unitCost,
            totalCost: item.totalCost,
            period: item.period,
            notes: item.notes
          })) || []
        }
      },
      include: {
        lineItems: true,
        application: true
      }
    })

    return NextResponse.json(budget, { status: 201 })
  } catch (error) {
    console.error('Error creating budget:', error)
    return NextResponse.json(
      { error: 'Failed to create budget' },
      { status: 500 }
    )
  }
}
