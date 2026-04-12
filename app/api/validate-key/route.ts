import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { licenseKey, slug } = await request.json()

    if (!licenseKey || !slug) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
    }

    // Usar la librería nativa de fetch para hablar con Lemon Squeezy
    const lsResponse = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ license_key: licenseKey })
    })

    const data = await lsResponse.json()

    // Validar que la respuesta de LS sea válida y activa
    if (data.valid === true) {
      // 🔐 ¡ÉXITO! Plantamos la cookie criptográfica
      // 'httpOnly' asegura que los hackers no puedan robarla con JavaScript
      const cookieStore = await cookies()
      cookieStore.set(`arche_unlocked_${slug}`, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // Dura 1 año en el navegador
      })

      return NextResponse.json({ success: true })
    }

    // Si la clave no es válida (vencida, equivocada o desactivada)
    return NextResponse.json({ success: false, error: data.error || 'Clave inválida o expirada' }, { status: 403 })

  } catch (error) {
    console.error('Error validando clave:', error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
