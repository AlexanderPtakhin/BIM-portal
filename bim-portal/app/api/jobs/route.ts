import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Здесь будет запрос к Supabase через Prisma
    // Пока возвращаем моковые данные
    const jobs = [
      {
        id: '1',
        title: 'BIM-модель жилого комплекса',
        description: 'Нужна BIM-модель 5-этажного жилого дома в Revit',
        category: 'Architectural BIM',
        budgetMin: 50000,
        budgetMax: 80000,
        status: 'PUBLISHED',
        clientId: '2',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Конструкции для торгового центра',
        description: 'Разработка КЖ и КМ разделов для ТЦ площадью 5000 м²',
        category: 'Structural BIM',
        budgetMin: 120000,
        budgetMax: 150000,
        status: 'PUBLISHED',
        clientId: '2',
        createdAt: new Date().toISOString()
      }
    ]

    return NextResponse.json({ 
      success: true,
      data: jobs,
      count: jobs.length
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'Failed to fetch jobs' 
    }, { status: 500 })
  }
}
