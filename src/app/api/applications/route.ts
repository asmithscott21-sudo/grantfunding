import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const authorId = searchParams.get('authorId')

    let where: any = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (authorId) {
      where.authorId = authorId
    }

    const applications = await db.application.findMany({
      where,
      include: {
        opportunity: true,
        author: true,
        versions: {
          where: { isCurrent: true }
        },
        budgets: true,
        milestones: true,
        clauses: {
          include: {
            clause: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const application = await db.application.create({
      data: {
        opportunityId: body.opportunityId,
        title: body.title,
        status: body.status || 'idea',
        authorId: body.authorId,
        templateType: body.templateType,
        wordLimit: body.wordLimit,
        charLimit: body.charLimit,
        submissionDate: body.submissionDate ? new Date(body.submissionDate) : null,
        submissionMethod: body.submissionMethod
      },
      include: {
        opportunity: true,
        author: true
      }
    })

    // Create initial version if content is provided
    if (body.content) {
      await db.applicationVersion.create({
        data: {
          applicationId: application.id,
          versionNumber: 1,
          authorId: body.authorId,
          content: body.content,
          wordCount: body.wordCount || 0,
          charCount: body.charCount || 0,
          notes: 'Initial version',
          isCurrent: true
        }
      })
    }

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    )
  }
}
