import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Lock, Unlock, ArrowLeft, Hexagon } from 'lucide-react'
import { getInvestigationBySlug, getAllSlugs } from '@/data/investigations'

interface Props {
  params: Promise<{ slug: string }>
}

// ── SEO DINÁMICO POR ARTÍCULO ──────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const paper = getInvestigationBySlug(slug)
  if (!paper) return { title: 'No encontrado' }

  return {
    title: paper.seo.title,
    description: paper.seo.description,
    keywords: paper.seo.keywords,
    openGraph: {
      title: paper.seo.title,
      description: paper.seo.description,
      images: [{ url: paper.heroImage, width: 1200, height: 630, alt: paper.title }],
      type: 'article',
      publishedTime: paper.date,
      authors: ['Napoleon Baca'],
      siteName: 'Arché — Fundación de Investigación de la Consciencia',
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.seo.title,
      description: paper.seo.description,
      images: [paper.heroImage],
    },
  }
}

// ── RUTAS ESTÁTICAS ────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

// ── CONTENIDO DEL ARTÍCULO 01: GATOS ──────────────────────────────────────
function ArticuloGatos() {
  return (
    <>
      {/* Firma */}
      <div className="flex items-center gap-4 mb-16 py-6 border-y border-white/5">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <Hexagon className="w-5 h-5 text-purple-400/50" />
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-widest text-[#E8E6E1]">INVESTIGADO POR</p>
          <p className="font-serif text-lg text-[#8A8881] italic">Napoleon Baca</p>
        </div>
      </div>

      <p className="mb-12 text-2xl md:text-3xl text-[#E8E6E1] font-light italic border-l-2 border-purple-500/30 pl-8 leading-snug">
        Un Análisis Histórico, Filosófico y Científico de la Simbiosis Felino-Iniciática.
      </p>

      <p>La presencia del felino en la historia de la humanidad trasciende, con creces, la mera domesticación utilitaria para adentrarse profundamente en los dominios de la teología, la filosofía esotérica y, de manera contemporánea, la investigación empírica e interdisciplinaria.</p>

      <p>Desde los grandes templos del antiguo Egipto, pasando por los grimorios medievales que dictaminaban las bases de la brujería tradicional europea, hasta llegar a los laboratorios modernos de bioacústica y neuropsicología, el gato (<i>Felis silvestris catus</i>) ha sido invariablemente posicionado como una entidad liminal. Se trata de un organismo que habita perpetuamente en la frontera: entre lo doméstico y lo indómito, entre la materia tangible y el espíritu inmaterial, y entre la luz de la razón humana y la oscuridad del instinto animal.</p>

      <h3>Evolución Histórica y Contexto Académico</h3>
      <p>La ontología del gato como una criatura intrínsecamente mágica no es un constructo de la era moderna, sino el resultado de milenios de sincretismo cultural, profunda reverencia teológica y, durante ciertos periodos, un pánico persecutorio sistemático.</p>

      <h4>La Deificación y el Paradigma Egipcio</h4>
      <p>En el contexto de la antigüedad, el antiguo Egipto representa el apogeo de la integración del felino en la cosmovisión mágico-religiosa de una civilización. La relación inicial, forjada en los albores del periodo Neolítico, evolucionó con una rapidez sin precedentes hacia una veneración teológica absoluta.</p>

      {/* Imagen full-bleed */}
      <div className="breakout-full h-[50vh] md:h-[70vh] my-20 overflow-hidden group relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_Gizah_Pyramids.jpg/960px-All_Gizah_Pyramids.jpg"
          alt="Pirámides de Giza"
          className="w-full h-full object-cover grayscale opacity-50 transition-all duration-[2s] ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
        />
        <div className="absolute bottom-6 right-8 text-right pointer-events-none">
          <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Complejo de Giza</p>
          <p className="font-serif text-sm text-white/30 italic">Epicentro de la deificación</p>
        </div>
      </div>

      <p>Los gatos no eran considerados mascotas en el sentido occidental contemporáneo; eran percibidos como receptáculos sagrados, conductos materiales a través de los cuales las fuerzas divinas interactuaban con el plano terrenal.</p>

      {/* Grid asimétrico */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20 items-start">
        <figure className="group">
          <div className="overflow-hidden bg-[#0a0a0a] border border-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://www.enfolang.com/img/cultura/gatos-egipto.jpg" alt="Momia de Gato" className="w-full aspect-[4/5] object-cover grayscale opacity-60 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100" />
          </div>
          <figcaption className="mt-4 border-l border-purple-500/30 pl-4">
            <p className="font-mono text-[10px] text-[#8A8881] tracking-widest">FIGURA I.</p>
            <p className="font-serif text-sm text-[#c4c2bc] italic">Ritual funerario y preservación del Ka felino.</p>
          </figcaption>
        </figure>
        <figure className="group md:mt-24">
          <div className="overflow-hidden bg-[#0a0a0a] border border-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.ecestaticos.com/8VJ5Lk6ld76DiCfQ9uOOCFIW3II=/0x0:2068x1449/557x418/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Faec%2F5e4%2Fc27%2Faec5e4c274906ff8ec1638fcf416b02b.jpg" alt="Papiro Egipcio" className="w-full aspect-square object-cover grayscale opacity-60 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100" />
          </div>
          <figcaption className="mt-4 border-l border-purple-500/30 pl-4">
            <p className="font-mono text-[10px] text-[#8A8881] tracking-widest">FIGURA II.</p>
            <p className="font-serif text-sm text-[#c4c2bc] italic">El gran gato de Heliópolis aniquilando a la serpiente Apofis.</p>
          </figcaption>
        </figure>
      </div>

      <h4>La Demonización en la Edad Media</h4>
      <p>La transformación radical del estatus del gato, pasando de ser una deidad tutelar a convertirse en la encarnación del mal, coincide históricamente con la expansión del cristianismo en Europa. En 1233, el Papa Gregorio IX emitió la bula papal <i>Vox in Rama</i>, el primer documento eclesiástico oficial que vinculaba directamente a los gatos con la adoración satánica.</p>

      <figure className="my-16 group">
        <div className="w-full overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.uv.es/recursos/fatwirepub/ccurl/168/937/estudios%20medievales.jpg" alt="Europa Medieval" className="w-full h-64 md:h-80 object-cover grayscale opacity-40 transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105" />
        </div>
        <figcaption className="mt-4 text-center">
          <p className="font-serif text-sm text-[#8A8881] italic">Oscurantismo y persecución eclesiástica (Siglos XIII–XVII).</p>
        </figcaption>
      </figure>

      <h3>Fundamentos Filosóficos y Naturaleza Hermética</h3>
      <div className="my-12 clear-both">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://redhistoria.com/wp-content/uploads/2024/05/eliphas-levi.jpg" alt="Eliphas Levi" className="float-none md:float-right w-full md:w-64 h-auto ml-0 md:ml-8 mb-6 md:mb-4 grayscale opacity-70 border border-white/10 p-2 bg-[#050505] hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
        <p>Dentro de la arquitectura del esoterismo occidental, especialmente en los postulados de figuras centrales del siglo XIX como Éliphas Lévi, la realidad material es apenas la capa superficial de un cosmos multidimensional. Lévi conceptualizó la <i>Luz Astral</i> como un agente electromagnético universal, un fluido sutil y omnipresente que interpenetra toda la materia.</p>
        <p>La tradición hermética sostiene que los gatos poseen una sintonía fisiológica y espiritual inherente con estas corrientes. Mientras que el ser humano común está cegado a las fluctuaciones de este fluido, el aparato neurosensorial del gato funciona como un osciloscopio natural capaz de registrar las variaciones en la densidad astral.</p>
      </div>

      <h3>Evidencia Científica y Científico-Alternativa</h3>
      <p>Históricamente, los poderes atribuidos a los gatos fueron despachados por el materialismo científico como meras supersticiones. No obstante, el avance de la neuropsicología, la bioacústica y la biología evolutiva ha comenzado a revelar los mecanismos tangibles detrás de este folclore.</p>

      <figure className="my-16 group relative flex justify-center">
        <div className="absolute inset-0 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-purple-500/20" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://cdn.shopify.com/s/files/1/0102/3207/0207/files/Les_chats_et_la_meditation_-_Comment_inclure_votre_chat_dans_vos_seances_570f7b49-5cc7-482d-968a-769a9f698c9e_480x480.jpg?v=1721994908" alt="Meditación con Gato" className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover grayscale opacity-60 border-2 border-white/5 transition-all duration-1000 group-hover:grayscale-[0.5] group-hover:opacity-100 relative z-10" />
      </figure>

      <h4>1. Bioacústica y Osteogénesis: La Medicina Frecuencial del Ronroneo</h4>
      <p>Quizás la validación científica más espectacular de la magia curativa felina reside en el análisis acústico de su ronroneo. Investigaciones han demostrado que los felinos emiten estas vibraciones en un rango de frecuencia fundamental muy específico: entre 25 y 150 Hertz (Hz).</p>
      <ul>
        <li><strong>25 a 50 Hz:</strong> Acelera masivamente el metabolismo de los osteoblastos, incrementando la densidad ósea y estimulando la regeneración de fracturas.</li>
        <li><strong>50 a 100 Hz:</strong> Fomenta la cicatrización de heridas, la reparación de tendones y la regeneración celular de tejidos blandos.</li>
        <li><strong>100 a 150 Hz:</strong> Actúa como un potente mecanismo analgésico y antiinflamatorio.</li>
      </ul>

      {/* ── PAYWALL ── */}
      <div className="relative mt-12 pt-32 clear-both">
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-transparent via-[#050505]/90 to-[#050505] pointer-events-none" />
        <div className="relative z-10 border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 flex flex-col items-center text-center shadow-[0_0_50px_rgba(139,92,246,0.03)] rounded-sm">
          <Unlock className="w-6 h-6 text-purple-400/50 mb-6" />
          <h3 className="font-serif text-3xl mb-4 text-[#E8E6E1] mt-0">Archivo Premium</h3>
          <p className="font-mono text-[10px] text-[#8A8881] tracking-widest leading-loose mb-8 max-w-sm">
            EL ESTUDIO COMPLETO INCLUYENDO &quot;MAGNETORRECEPCIÓN Y VISIÓN ULTRAVIOLETA&quot;, &quot;CAMPOS MÓRFICOS&quot; Y LA &quot;GUÍA DE MAGIA SIMPÁTICA APLICADA&quot; ESTÁ RESERVADO PARA MIEMBROS.
          </p>
          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <button className="bg-[#E8E6E1] text-[#050505] font-mono text-[10px] tracking-widest px-12 py-4 hover:bg-white transition-all duration-300">
              DESBLOQUEAR — $4.99
            </button>
            <button className="text-[#8A8881] hover:text-white font-mono text-[10px] tracking-widest px-12 py-4 transition-colors border border-white/5 hover:border-white/20">
              YA SOY MIEMBRO — INICIAR SESIÓN
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// ── CONTENIDO GENÉRICO PARA ARTÍCULOS PÚBLICOS ────────────────────────────
function ArticuloPublico({ desc }: { desc: string }) {
  return (
    <>
      <p className="mb-8 text-2xl text-[#E8E6E1] font-light italic border-l-2 border-purple-500/30 pl-6">
        {desc}
      </p>
      <p className="mb-6">
        [Contenido del ensayo abierto. El lector puede disfrutar del texto completo sin barreras de acceso, ideal para compartir en redes.]
      </p>
      <div className="my-12 py-8 border-y border-white/10 text-center">
        <Hexagon className="w-6 h-6 mx-auto mb-4 text-white/20" />
        <p className="font-mono text-[10px] tracking-widest text-[#8A8881]">FIN DEL ENSAYO ABIERTO</p>
      </div>
    </>
  )
}

// ── PÁGINA PRINCIPAL ───────────────────────────────────────────────────────
export default async function InvestigacionPage({ params }: Props) {
  const { slug } = await params
  const paper = getInvestigationBySlug(slug)
  if (!paper) notFound()

  return (
    <main className="relative w-full min-h-screen pb-32 bg-[#050505]">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: paper.title,
            description: paper.seo.description,
            image: paper.heroImage,
            datePublished: paper.date,
            author: {
              '@type': 'Person',
              name: 'Napoleon Baca',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fundación Arché',
              logo: { '@type': 'ImageObject', url: 'https://arche.netlify.app/logo.png' },
            },
            keywords: paper.seo.keywords.join(', '),
          }),
        }}
      />

      {/* Hero del artículo */}
      <header className="relative w-full h-[70vh] flex flex-col justify-end px-8 md:px-32 pb-16">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={paper.heroImage} alt={paper.title} className="w-full h-full object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        </div>

        {/* Botón volver */}
        <Link
          href="/investigaciones"
          className="absolute top-28 left-8 md:left-32 flex items-center gap-2 font-mono text-[10px] text-[#8A8881] tracking-widest hover:text-white transition-colors group z-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          ARCHIVO
        </Link>

        <div className="relative z-10 max-w-4xl">
          <div className="flex gap-4 font-mono text-[10px] text-[#8A8881] tracking-widest mb-6">
            <span>{paper.date}</span>
            <span>/</span>
            <span className={paper.access === 'locked' ? 'text-red-400/70' : 'text-purple-400/70'}>
              {paper.type}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 flex items-center gap-6 text-[#E8E6E1]">
            {paper.access === 'locked' && <Lock className="w-10 h-10 text-white/20 hidden md:block" />}
            {paper.title}
          </h1>
        </div>
      </header>

      {/* Contenido */}
      <div className="relative w-full px-8 md:px-0 max-w-2xl mx-auto font-serif text-lg md:text-xl leading-relaxed text-[#c4c2bc] article-content">
        {paper.slug === 'gatos-magia-ocultismo' && <ArticuloGatos />}
        {paper.slug !== 'gatos-magia-ocultismo' && paper.access === 'public' && (
          <ArticuloPublico desc={paper.shortDesc} />
        )}
        {paper.access === 'locked' && (
          <div className="py-16 flex flex-col items-center text-center border border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md p-12 rounded-sm">
            <Lock className="w-8 h-8 text-red-400/40 mb-6" />
            <h2 className="font-serif text-3xl mb-4 text-[#E8E6E1]">Contenido Restringido</h2>
            <p className="font-mono text-[10px] text-[#8A8881] tracking-widest leading-loose mb-8 max-w-sm">
              ESTA INVESTIGACIÓN ESTÁ EN CURSO. ACCESO EXCLUSIVO PARA INVESTIGADORES COLABORADORES.
            </p>
            <button className="bg-[#E8E6E1] text-[#050505] font-mono text-[10px] tracking-widest px-12 py-4 hover:bg-white transition-all duration-300">
              SOLICITAR ACCESO
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
