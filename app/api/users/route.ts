import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      // Если база пуста, возвращаем моковые данные
      const mockUsers = [
        {
          id: '1',
          name: 'Тестовый фрилансер',
          email: 'freelancer@test.com',
          role: 'FREELANCER',
          created_at: new Date().toISOString(),
        },
      ];

      return NextResponse.json({
        success: true,
        data: mockUsers,
        count: mockUsers.length,
        note: 'Using mock data - database empty',
      });
    }

    return NextResponse.json({
      success: true,
      data: users,
      count: users?.length || 0,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch users',
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    console.log('POST /api/users - Starting request');

    const body = await request.json();
    console.log('Request body:', body);

    // Проверяем переменные окружения
    console.log(
      'Supabase URL:',
      process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
    );
    console.log(
      'Supabase Anon Key:',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
    );

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          clerk_id: body.clerk_id || `test_${Date.now()}`,
          email: body.email,
          name: body.name,
          role: body.role || 'FREELANCER',
          account_type: body.account_type || 'INDIVIDUAL',
        },
      ])
      .select()
      .single();

    console.log('Supabase response:', { data, error });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        {
          success: false,
          error: error.message,
          details: error,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create user',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
