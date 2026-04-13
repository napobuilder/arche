import type { Metadata } from 'next'

import ManifestoClient from './ManifestoClient'

export const metadata: Metadata = {
  title: 'Manifiesto',
  description: 'La visión, los principios y el propósito del Instituto Arché. Por qué investigamos lo que la ciencia convencional suele ignorar.',
}

export default function ManifiestoPage() {
  return <ManifestoClient />
}
