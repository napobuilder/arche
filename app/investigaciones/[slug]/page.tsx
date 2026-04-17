import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { Lock, Unlock, ArrowLeft, Hexagon } from 'lucide-react'
import { getInvestigationBySlug, getAllSlugs } from '@/data/investigations'
import Paywall from '@/components/Paywall'

const BASE_URL = 'https://proyectoarche.com'

interface Props {
  params: Promise<{ slug: string }>
}

// ── SEO DINÁMICO POR ARTÍCULO ──────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const paper = getInvestigationBySlug(slug)
  if (!paper) return { title: 'No encontrado' }

  const canonicalUrl = `${BASE_URL}/investigaciones/${paper.slug}`
  // Fusionar keywords explícitas + tags para máxima cobertura semántica
  const allKeywords = Array.from(new Set([...paper.seo.keywords, ...paper.tags]))

  return {
    title: paper.seo.title,
    description: paper.seo.description,
    keywords: allKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: paper.seo.title,
      description: paper.seo.description,
      url: canonicalUrl,
      images: [
        {
          url: `${BASE_URL}${paper.heroImage}`,
          width: 1200,
          height: 630,
          alt: paper.title,
        },
      ],
      type: 'article',
      publishedTime: paper.date,
      authors: ['Napoleon Baca'],
      siteName: 'Arché — Instituto de Investigación de la Consciencia',
      tags: paper.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: paper.seo.title,
      description: paper.seo.description,
      images: [`${BASE_URL}${paper.heroImage}`],
    },
  }
}

// ── JSON-LD STRUCTURED DATA (Schema.org Article) ───────────────────────────
function ArticleJsonLd({ slug }: { slug: string }) {
  const paper = getInvestigationBySlug(slug)
  if (!paper) return null

  const canonicalUrl = `${BASE_URL}/investigaciones/${paper.slug}`
  const allKeywords = [...paper.seo.keywords, ...paper.tags].join(', ')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: paper.title,
    description: paper.seo.description,
    image: `${BASE_URL}${paper.heroImage}`,
    url: canonicalUrl,
    author: {
      '@type': 'Person',
      name: 'Napoleon Baca',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Instituto Arché',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon.ico`,
      },
    },
    datePublished: paper.date,
    dateModified: paper.date,
    keywords: allKeywords,
    articleSection: paper.type,
    inLanguage: 'es',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// ── RUTAS ESTÁTICAS ────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

// ── CONTENIDO DEL ARTÍCULO 01: GATOS ──────────────────────────────────────
function ArticuloGatos({ isUnlocked }: { isUnlocked: boolean }) {
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

      <h4>Simbolismo en las Tradiciones Antiguas de Europa y Asia</h4>
      <p>Más allá de las fronteras de Egipto, la figura del felino se arraigó en diversas mitologías antiguas, casi siempre vinculada a deidades femeninas, la fertilidad y los misterios de la noche. En la mitología nórdica, la diosa Freyja, regente del amor, la magia (Seiðr) y la fertilidad, recorría los cielos en un carruaje tirado por dos grandes gatos mágicos, una asociación que elevó el estatus del animal como un símbolo de la fuerza femenina y un atractor de bendiciones para aquellos que les dejaban ofrendas. En el folclore celta de Escocia e Irlanda, la figura del Cat Sìth, un gran gato negro con una mancha blanca en el pecho, era temido y respetado como una entidad feérica (un hada) o una bruja cambiaformas capaz de robar las almas de los difuntos si no se realizaban los rituales apotropaicos adecuados durante la festividad de Samhain.</p>
      <p>En Asia, la dualidad del gato también se manifestó de forma prominente. En Japón, la figura del Maneki-neko (el gato que llama) se consolidó como un poderoso talismán de buena fortuna, prosperidad y protección. No obstante, el folclore japonés también advierte sobre los Bakeneko y los Nekomata, gatos que, al alcanzar una edad avanzada, desarrollan habilidades sobrenaturales, incluyendo la nigromancia, la manipulación del fuego y el cambio de forma, lo que subraya el respeto cauteloso que las culturas orientales profesaban hacia la inescrutable naturaleza felina.</p>

      <h4>La Demonización en la Edad Media y los Juicios por Brujería</h4>
      <p>La transformación radical del estatus del gato, pasando de ser una deidad tutelar a convertirse en la encarnación del mal, coincide históricamente con la expansión y consolidación del cristianismo en Europa y la consecuente supresión de las prácticas paganas e indígenas. La asociación de los felinos con diosas de la antigüedad y con la autonomía femenina los posicionó como símbolos vivos de la herejía y la idolatría a los ojos de la Iglesia y las autoridades inquisitoriales.</p>
      <p>El punto de inflexión teológico y legal se produjo en el siglo XIII. En 1233, el Papa Gregorio IX emitió la bula papal <i>Vox in Rama</i>, el primer documento eclesiástico oficial que vinculaba directamente a los gatos, especialmente a los de pelaje negro, con la adoración satánica. El documento detallaba supuestos ritos de iniciación de cultos heréticos en Alemania que culminaban con la aparición del diablo en forma de un gran gato negro, exigiendo a los iniciados que besaran sus cuartos traseros. Esta formalización del estigma satánico desencadenó siglos de persecución indiscriminada, tortura y matanzas rituales de gatos, frecuentemente quemados vivos en hogueras durante festividades religiosas bajo la creencia de que se estaba destruyendo un conducto demoníaco.</p>

      <figure className="my-16 group">
        <div className="w-full overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://www.uv.es/recursos/fatwirepub/ccurl/168/937/estudios%20medievales.jpg" alt="Europa Medieval" className="w-full h-64 md:h-80 object-cover grayscale opacity-40 transition-all duration-[1.5s] group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105" />
        </div>
        <figcaption className="mt-4 text-center">
          <p className="font-serif text-sm text-[#8A8881] italic">Oscurantismo y persecución eclesiástica (Siglos XIII–XVII).</p>
        </figcaption>
      </figure>

      <p>Durante el clímax de la caza de brujas en la Europa moderna temprana (siglos XVI y XVII), particularmente en Inglaterra, el gato asumió el papel central del &quot;espíritu familiar&quot;. A diferencia de los juicios continentales que se centraban en el Sabbat de las brujas, la jurisprudencia y la demonología inglesas se enfocaron obsesivamente en la relación íntima entre la persona acusada y su animal de compañía. El familiar era conceptualizado no como un animal común, sino como una entidad sobrenatural o un demonio menor, otorgado por el diablo para asistir a la bruja en la ejecución de magia maléfica (maleficia), proporcionando protección psíquica o actuando como espía.</p>
      <p>Los registros judiciales de la época proporcionan relatos detallados de esta dinámica. En el famoso juicio de Chelmsford en 1566, la acusada Elizabeth Francis confesó poseer un familiar con la forma de un gato blanco manchado llamado &quot;Satanás&quot;. Según su testimonio, su abuela le enseñó a mantener al gato en una canasta y a alimentarlo a cambio de favores mágicos que iban desde la obtención de bienes materiales hasta la imposición de enfermedades mortales a sus vecinos. Un elemento crucial en estos testimonios era la práctica de alimentar al familiar con la propia sangre de la bruja, a menudo a través de una &quot;marca de bruja&quot; o un tercer pezón. Académicamente, esta succión de sangre representa una subversión teológica profunda: una perversión de la eucaristía y una antítesis monstruosa de la maternidad cristiana, donde la mujer nutre a las fuerzas demoníacas en lugar de a la procreación legítima.</p>
      <p>En investigaciones académicas exhaustivas, como el análisis de los juicios en la región de Lorena (Francia), se ha demostrado que los gatos aparecieron en casi un tercio de los casos (112 de 353 juicios), funcionando a nivel sociológico como &quot;aliviadores de culpa&quot;. Las mujeres acusadas, sometidas a una inmensa presión comunitaria y tortura psicológica, utilizaban la figura del gato para mitigar su propia agencia en actos de malevolencia, proyectando la culpa de las desgracias locales sobre un animal invasivo que encarnaba el miedo a la transgresión demoníaca en el espacio doméstico.</p>

      <h4>El Contraste Místico: La Pureza en el Islam y el Sufismo</h4>
      <p>En marcado contraste con la histeria europea, las tradiciones de Oriente Medio, el Islam y las corrientes místicas del Sufismo mantuvieron una perspectiva de respeto y reverencia inquebrantable hacia el gato. En la ley y tradición islámica, el gato doméstico es considerado un animal ritualmente puro (<i>Tahir</i>). Es el único animal al que se le permite libre acceso a las mezquitas y a los espacios de oración; además, la jurisprudencia establece que el agua de la cual un gato ha bebido no pierde su pureza y sigue siendo lícita para realizar las abluciones sagradas.</p>
      <p>El profeta Mahoma era conocido por su profundo afecto hacia los gatos, ilustrado en la célebre anécdota donde prefirió cortar la manga de su manto de oración antes que despertar a su gata Muezza, que dormía sobre ella. Uno de sus compañeros más cercanos fue apodado <i>Abu Hurairah</i>, que se traduce literalmente como &quot;El Padre de los Gatitos&quot;, debido a su devoción por estos animales.</p>
      <p>A nivel esotérico y metafísico, en el misticismo sufí se sostiene que los felinos poseen <i>Barakah</i>, una cualidad de gracia, fuerza vital y bendición divina que fluye a través de seres espiritualmente elevados. Los gatos son percibidos como protectores astrales innatos y entidades que equilibran la energía telúrica del entorno. Para los maestros sufíes y derviches, el gato funciona como un compañero de meditación ideal, actuando como un espejo vivo de la contemplación silenciosa, la independencia del ego material y la conexión inquebrantable con la presencia divina.</p>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm text-left text-[#c4c2bc] bg-[#0a0a0a] border border-white/10">
          <thead className="text-xs text-[#8A8881] uppercase bg-black/50 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-mono">Paradigma Geográfico/Cultural</th>
              <th className="px-6 py-4 font-mono">Estatus Metafísico y Simbolismo del Felino</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-serif">
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Antiguo Egipto</td>
              <td className="px-6 py-4">Entidad sagrada, receptáculo de lo divino, protector del hogar y de la vida (Asociado a Bastet, Sekhmet, Mafdet).</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Paganismo Europeo (Celta/Nórdico)</td>
              <td className="px-6 py-4">Guardián de portales entre mundos, atractor de fertilidad y magia (Seiðr), espíritu feérico (Cat Sìth).</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Europa Medieval y Renacentista</td>
              <td className="px-6 py-4">Conducto del diablo, espíritu familiar herético, instrumento de maleficia, usurpador de la maternidad cristiana.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Mundo Islámico y Sufismo</td>
              <td className="px-6 py-4">Ser de pureza ritual, portador de Barakah (gracia divina), estabilizador de energía, compañero ideal para ascetismo.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Asia Oriental (Japón/China)</td>
              <td className="px-6 py-4">Talismán de buena fortuna y abundancia (Maneki-neko), y un potencial espíritu vengativo (Bakeneko).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Fundamentos Filosóficos y Naturaleza Hermética</h3>
      <p>Para aprehender cabalmente el rol operativo del gato en la magia iniciática, es necesario diseccionar su naturaleza desde la filosofía contemporánea y la ontología propuesta por las tradiciones herméticas y teosóficas de los siglos XIX y XX. El comportamiento del gato no es interpretado por el esoterista como mero instinto biológico, sino como la manifestación externa de una arquitectura espiritual altamente refinada.</p>

      <h4>La &quot;Filosofía Felina&quot;: La Gnosis del Presente Eterno</h4>
      <p>El filósofo contemporáneo John Gray, en su tratado <i>Feline Philosophy: Cats and the Meaning of Life</i>, postula una tesis radical: el gato representa la antítesis perfecta de la trágica condición humana. Según Gray, el sufrimiento fundamental del ser humano emana de su autoconsciencia patológica; el hombre está perpetuamente atormentado por la formulación de narrativas autobiográficas, el arrepentimiento por pasados inalterables, el temor paralizante a la muerte y la angustia de las decisiones éticas. En contraste, la mente felina es, filosóficamente hablando, &quot;una e indivisa&quot;.</p>
      <p>Los gatos carecen de la necesidad de estructurar la realidad mediante la filosofía humana, la moralidad externa o la religión, porque no padecen de la desconexión primordial con el universo. Existen en un estado de presencia absoluta y espontánea. No lamentan las vidas que no han vivido ni temen a la muerte conceptualmente. Desde la perspectiva del ocultismo iniciático, el gato encarna físicamente el estado de <strong>Gnosis</strong> o el &quot;silencio mental&quot; al que el adepto aspira tras décadas de riguroso entrenamiento meditativo. La capacidad del animal para transitar instantáneamente desde una relajación profunda y letárgica hacia una acción depredadora letal y focalizada, sin la fricción de la duda o el diálogo interno, ilustra una maestría perfecta sobre la voluntad y la energía, convirtiendo al felino en un modelo vivo del ideal hermético.</p>

      <h4>El Hermetismo Clásico y la Sensibilidad a la Luz Astral</h4>
      <div className="my-10 clear-both">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://redhistoria.com/wp-content/uploads/2024/05/eliphas-levi.jpg" alt="Eliphas Levi" className="float-none md:float-right w-full md:w-64 h-auto ml-0 md:ml-8 mb-6 md:mb-4 grayscale opacity-70 border border-white/10 p-2 bg-[#050505] hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
        <p>Dentro de la arquitectura del esoterismo occidental, especialmente en los postulados de figuras centrales del siglo XIX como Éliphas Lévi y Papus, la realidad material es apenas la capa superficial de un cosmos multidimensional. Lévi conceptualizó la <i>Luz Astral</i> como un agente electromagnético universal, un fluido sutil y omnipresente que interpenetra toda la materia, sirviendo como un receptáculo hiper-sensible que graba cada pensamiento, forma, emoción y acto volitivo emitido en el mundo físico.</p>
        <p>La tradición hermética sostiene que los gatos poseen una sintonía fisiológica y espiritual inherente con estas corrientes. Mientras que el ser humano común está cegado a las fluctuaciones de este fluido, el aparato neurosensorial del gato funciona como un osciloscopio natural capaz de registrar las variaciones en la densidad astral. Esta premisa teórica explica comportamientos empíricos, como cuando un gato sigue con la mirada la trayectoria de una perturbación invisible en una habitación, un fenómeno que el ocultista interpreta como el rastreo de una forma de pensamiento, un elemental artificial o la manifestación de una energía residual acumulada en el éter.</p>
      </div>

      <h4>La Teosofía, la Aurora Dorada y el Combate Psíquico</h4>
      <p>La doctrina teosófica, expandida por figuras como Alice Bailey, introdujo la idea de que la evolución del reino animal no es un proceso estrictamente material, sino que está inexorablemente ligado a su interacción kármica con el reino humano. Desde esta óptica, la domesticación no constituye una subyugación del animal, sino un proceso de alquimia espiritual mediante el cual especies específicas (predominantemente felinos y cánidos) desarrollan destellos de individualización anímica al verse inmersos en la emanación afectiva e intelectual de sus cuidadores humanos.</p>
      <p>Esta conexión profunda adquirió matices operativos severos en los trabajos de la Orden Hermética de la Aurora Dorada (Golden Dawn). La eminente ocultista y psicoanalista Dion Fortune documentó en sus ensayos cómo, durante conflictos con magos negros o adversarios esotéricos, los asaltos psíquicos se manifestaban en el plano físico a través de infestaciones de entidades felinas. Reportó la aparición de hordas de gatos negros físicos asediando el perímetro de su cuartel general, acompañados de un inconfundible hedor a felino astral y la manifestación de monstruosos gatos en el plano etérico.</p>
      <p>Estos incidentes validaron en el esoterismo moderno la noción de que el arquetipo del gato es una de las formas preferidas por los elementales y constructos mágicos para manifestarse, confirmando la afinidad intrínseca de esta especie con el control territorial y la manipulación de corrientes ocultas defensivas y ofensivas.</p>

      <h3>Evidencia Científica y Científico-Alternativa</h3>
      <p>Históricamente, las <strong>capacidades perceptivas expandidas</strong> atribuidas a los felinos fueron despachadas por el materialismo científico como meras supersticiones. No obstante, el avance de la neuropsicología, la bioacústica y la biología evolutiva ha comenzado a revelar los mecanismos tangibles detrás de este folclore.</p>

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

      {/* ── PAYWALL o CONTENIDO DESBLOQUEADO ── */}
      {!isUnlocked ? (
        <Paywall 
          checkoutUrl="https://archeinstitute.lemonsqueezy.com/checkout/buy/d0b36218-6191-4643-9421-4f6fead3aa18" 
          slug="gatos-magia-neurociencia" 
        />
      ) : (
        <>
          <div className="my-16 py-8 border-y border-purple-500/30 text-center bg-purple-500/5">
            <h3 className="text-xl md:text-2xl text-purple-400 font-serif mb-2 mt-0">✅ Archivo Premium Desbloqueado</h3>
            <p className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase mb-0">El conocimiento oculto ha sido revelado. Gracias por tu apoyo.</p>
          </div>
          
          <h4>2. Espectroscopía Ocular: Visión Ultravioleta y Magnetorrecepción</h4>
          <p>Cuando un gato clava su mirada en un punto aparentemente vacío y eriza su pelaje, el conocimiento popular asume que está viendo a un espíritu. La ciencia ofrece una explicación igualmente fascinante que roza la frontera del misticismo: su aparato ocular detecta segmentos del espectro electromagnético invisibles para la biología humana.</p>
          <p>Las investigaciones en fotorrecepción mamífera han revolucionado la comprensión de los sentidos animales. Mientras que el cristalino del ojo humano adulto posee pigmentos amarillos que bloquean intencionalmente la luz ultravioleta (UV) para proteger la retina y aumentar la agudeza visual, los estudios de espectrofotometría sobre medios oculares y retinas han demostrado que los felinos poseen un cristalino transparente al espectro de los rayos Ultravioleta A (UVA, 315-400 nm). Los análisis revelaron que el ojo del gato transmite hasta un 59% de la luz ultravioleta a 400 nm hacia la retina, un porcentaje inmensamente superior al de otros mamíferos estudiados.</p>
          <p>Esto implica que la realidad óptica del felino es radicalmente ajena a la nuestra. El gato percibe la fluorescencia natural de sustancias biológicas, detecta estelas de fluidos químicos y alteraciones lumínicas que el cerebro humano procesa como oscuridad o vacío. Desde la perspectiva alternativa, la manifestación de anomalías termodinámicas o entidades del plano astral que perturban el espectro UV del ambiente son literal e inmediatamente visibles para el gato, fundamentando su reputación como guardián capaz de detectar la presencia de entidades desencarnadas o elementales invasivos.</p>
          <p>En paralelo a la sensibilidad lumínica, emerge el estudio de la magnetorrecepción. La capacidad de los gatos de retornar a sus hogares recorriendo distancias imposibles se sustenta en su capacidad para percibir el campo geomagnético de la Tierra. La identificación de moléculas de criptocromo en las estructuras oculares de varios mamíferos sugiere que los gatos poseen una brújula biológica integrada. Esta sensibilidad geomagnética los hace extremadamente perceptivos a las variaciones en los campos electromagnéticos locales, fenómenos que a menudo preceden a eventos anómalos o manifestaciones de poltergeist.</p>
          
          <h4>3. Teoría de los Campos Mórficos y Telepatía Anticipatoria (Rupert Sheldrake)</h4>
          <div className="my-10 clear-both overflow-hidden">
            <figure className="float-none md:float-left w-full md:w-64 mb-6 md:mb-4 mr-0 md:mr-8 group relative">
              <div className="w-full aspect-square overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://posgradosalamanca.lat/wp-content/uploads/principios-de-la-neurociencia.jpg" alt="Neurociencia" className="w-full h-full object-cover grayscale opacity-70 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]" />
              </div>
            </figure>
            <p>Para explicar las asombrosas capacidades intuitivas de los felinos desde un marco no materialista, es imprescindible recurrir a la obra del biólogo de la Universidad de Cambridge, el Dr. Rupert Sheldrake. En su riguroso trabajo, Sheldrake desafía el dogma mecanicista a través de la hipótesis de la Resonancia Mórfica.</p>
            <p>Sheldrake postula que las mentes de los seres vivos operan como "campos mórficos" que se extienden espacialmente hacia el entorno. Cuando dos seres desarrollan un vínculo emocional y empático profundo, sus campos mórficos se entrelazan, permitiendo la transmisión instantánea de información a distancia. En el contexto del esoterismo, esta validación científica subraya cómo el gato funciona como una extensión perisensorial de la conciencia del mago, capaz de leer y reaccionar a las intenciones ocultas antes de que se materialicen.</p>
          </div>

          <h4>4. El Biocampo Felino y la Transmutación Electromagnética</h4>
          <p>La perspectiva de la sanación cuántica propone que los gatos operan con una carga eléctrica natural inversa a la de los agentes estresantes del ambiente humano. Así como las plantas absorben CO2 para transmutarlo en oxígeno, el felino actuaría como un catalizador biológico que absorbe "energía caótica" del ambiente. Mediante el efecto piezoeléctrico combinado con su ronroneo, el gato desintegra acumulaciones de estrés estático, anclando (earthing) la energía errática y restaurando el equilibrio vibracional del espacio.</p>
          <figure className="my-12 group">
            <div className="w-full h-64 md:h-80 overflow-hidden bg-[#0a0a0a] border border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/A3KEHCIOPNDPFIGT65HYE4V7ZE.jpg" alt="Veterinaria Física" className="w-full h-full object-cover grayscale opacity-60 transition-all duration-1000 group-hover:grayscale-[0.3] group-hover:opacity-100 group-hover:scale-105" />
            </div>
            <figcaption className="mt-4 border-l border-purple-500/30 pl-4">
              <p className="font-mono text-[10px] text-[#8A8881] tracking-widest uppercase">APLICACIÓN TERAPÉUTICA</p>
              <p className="font-serif text-sm text-[#c4c2bc] italic">Evidencia empírica en el impacto homeostático del vínculo humano-animal.</p>
            </figcaption>
          </figure>

          <div className="my-16 clear-both overflow-hidden">
            <figure className="float-none md:float-right w-full md:w-64 mb-6 md:mb-4 ml-0 md:ml-8 group relative mt-4 md:-mt-8">
              <div className="w-full aspect-[3/4] overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://www.reprodart.com/kunst/english_school_17th_century_after/ideal_figure_of_hermes_trismeg_hi.jpg" alt="Hermes Trismegisto" className="w-full h-full object-cover grayscale opacity-70 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" />
              </div>
            </figure>

            <div className="my-8 p-6 border-l-2 border-purple-500/50 bg-[#0a0a0a]/50 text-sm">
              <p className="font-mono text-[10px] tracking-widest text-purple-400 uppercase mb-2">Nota del Investigador</p>
              <p className="italic text-[#c4c2bc] m-0">En este contexto, definimos la Magia no como una transgresión de las leyes físicas, sino como una &quot;Tecnología de la Consciencia&quot;. El <strong>Mago Iniciático</strong> es aquel operador que utiliza sistemas simbólicos y <em>protocolos de inducción</em> como herramientas de software para hackear su propia neurobiología, inducir estados de flujo (flow states) y dirigir la voluntad con precisión quirúrgica.</p>
            </div>

            <h3>
              Relación Práctica entre el Gato y el{' '}
              <span className="relative group/tooltip inline-block cursor-help border-b border-dashed border-purple-500/50 text-purple-300">
                Mago Iniciático
                <span className="absolute bottom-full left-0 mb-2 w-64 max-w-[80vw] p-3 bg-[#111] border border-white/10 text-xs text-[#E8E6E1] font-sans opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all rounded shadow-xl z-50 text-left md:text-center pointer-events-none">
                  Individuo dedicado al estudio y práctica de la modificación deliberada de la consciencia mediante sistemas simbólicos.
                </span>
              </span>
            </h3>
            <p>Una vez desglosados los fundamentos científicos, es imperativo analizar la dinámica operativa. Más allá de la mística, la relación entre el gato y el buscador de la consciencia (tradicionalmente llamado &quot;mago&quot;) se basa en una simbiosis voluntaria transdimensional. En las <strong>comunidades de praxis fenomenológica contemporáneas</strong>, esta alianza opera bajo un modelo estructurado:</p>

            <div className="my-8 p-6 bg-[#0a0a0a]/50 border border-white/10 rounded-sm">
              <h4 className="font-serif text-lg text-[#E8E6E1] mb-4 border-b border-white/10 pb-2 mt-0">El Modelo de Capas de la Simbiosis</h4>
              <ul className="space-y-3 text-sm text-[#c4c2bc] m-0 p-0 pl-4">
                <li><strong className="text-purple-400">Capa Física:</strong> El ronroneo y la bioacústica felina (25-150Hz).</li>
                <li><strong className="text-purple-400">Capa Sensorial:</strong> Visión ultravioleta y magnetorrecepción (afinidad electromagnética).</li>
                <li><strong className="text-purple-400">Capa Psicológica:</strong> El gato como objeto transicional o &quot;ancla&quot; para el enfoque.</li>
                <li><strong className="text-purple-400">Capa Operativa (Tecnología de la Consciencia):</strong> El uso consciente e intencional de las capas anteriores para un fin específico mediante acciones simbólicas programadas.</li>
              </ul>
            </div>

          </div>
          
          <h4>El Guardián del Umbral y el Ancla del Viaje Astral</h4>
          <p>El currículo del practicante implica la inducción de estados de trance profundo. Durante estos procesos de desplazamiento extracorpóreo, el vehículo físico queda inerte. La función del gato es la de un centinela electromagnético. Debido a su visión UV y radar geomagnético, detecta intrusiones sutiles en la habitación. En momentos de sobrecarga sensoperceptiva, el gato actuará para interrumpir súbitamente el trance, sirviendo de ancla de emergencia hacia la vigilia física.</p>

          <h4>Diagnóstico Energético, Absorción de Miasma y Purgación</h4>
          <ul>
            <li><strong>Identificación de Distorsiones:</strong> Cuando bufa o muestra el pelaje erizado ante la "nada", está notificando la acumulación de energía densa.</li>
            <li><strong>Cirugía Espiritual:</strong> A través del amasado ("making biscuits") sobre el cuerpo del mago, manipulan nudos energéticos bloqueados, abriendo capas del biocampo para drenar la pesadez de los chakras inferiores.</li>
            <li><strong>Riesgo de Sobrecarga:</strong> Al fungir como escudos psíquicos, los gatos a menudo absorben golpes astrales. Un letargo repentino en el animal suele indicar una sobrecarga astral crítica.</li>
          </ul>

          <h3>Prácticas Operativas y Magia Aplicada con Felinos</h3>
          <p>En los sistemas éticos contemporáneos la mutilación está estrictamente prohibida; el mago debe esperar la recolección natural de los componentes que el animal decida abandonar (muda natural).</p>
          
          <h4>1. Magia Simpática con Elementos Corporales</h4>
          <ul>
            <li><strong>Vibrisas (Bigotes):</strong> El mago los incorpora en sacos protectores para incrementar su propia sensibilidad psíquica, fomentar la clarividencia y asegurar viajes libres de obstáculos.</li>
            <li><strong>Garras (Mudadas):</strong> Representan defensa letal. Se entierran en ingredientes para hechizos de defensa agresiva y ataduras.</li>
            <li><strong>Pelaje:</strong> Se quema para producir negro de humo empleado como insumo en acciones simbólicas programadas y para el trazado de esquemas de enfoque psíquico.</li>
          </ul>

          <h4>2. Magia Pasiva y Resonancia de Atracción</h4>
          <p>Basándose en los postulados herméticos descritos en El Kybalion, los magos contemporáneos utilizan a los gatos como &quot;antenas de frecuencia&quot; para el magnetismo operativo y la Ley de Atracción. En este proceso, el iniciado fomenta un entorno libre de estrés alrededor del animal. Una vez que el felino entra en estado de ronroneo puro, el mago se sumerge en una meditación profunda, visualizando su objetivo (paz, abundancia, sanación). El mago utiliza el estado theta/alfa inducido neurofisiológicamente por las vibraciones del gato y sincroniza su voluntad con ellas, proyectando las &quot;ondas&quot; hacia el tejido del universo para manifestar resultados con un grado de coherencia que en solitario tomaría horas alcanzar. La hierba gatera (Nepeta cataria) se quema a menudo sobre los altares no solo para atraer a los familiares al espacio ritual, sino por sus correspondencias lunares de vinculación, fertilidad y trance inducido.</p>

          <figure className="my-16 group">
            <div className="w-full h-56 md:h-72 overflow-hidden bg-[#0a0a0a] border border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://static.dw.com/image/74939776_906.jpg" alt="Iconografía Egipcia Felina" className="w-full h-full object-cover object-top grayscale opacity-50 transition-all duration-[2s] group-hover:grayscale-0 group-hover:opacity-100 group-hover:object-center" />
            </div>
          </figure>

          <h4>3. Correspondencias Esotéricas por Fenotipo y Coloración</h4>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm text-left text-[#c4c2bc] bg-[#0a0a0a] border border-white/10">
              <thead className="text-xs text-[#8A8881] uppercase bg-black/50 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 font-mono">Color</th>
                  <th className="px-6 py-4 font-mono">Atribución</th>
                  <th className="px-6 py-4 font-mono">Especialización Operativa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-serif">
                <tr>
                  <td className="px-6 py-4 font-bold text-[#E8E6E1]">Gatos Negros</td>
                  <td className="px-6 py-4 italic">Saturno / Plutón</td>
                  <td className="px-6 py-4">Operan como sumideros absorbiendo toda negatividad. Maestros de la magia profunda, destierros y clarividencia.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-[#E8E6E1]">Gatos Blancos</td>
                  <td className="px-6 py-4 italic">Luna / Isis</td>
                  <td className="px-6 py-4">Asociados a altas esferas. Sanadores del chakra corazón, atrayentes de pureza emocional.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-[#E8E6E1]">Gatos Naranjas</td>
                  <td className="px-6 py-4 italic">Sol / Sekhmet</td>
                  <td className="px-6 py-4">Proporcionan intuición agresiva. Ideales para hechizos de abundancia material y coraje.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-[#E8E6E1]">Gatos Grises</td>
                  <td className="px-6 py-4 italic">Mercurio</td>
                  <td className="px-6 py-4">Regentes de la dualidad. Se asocian con la resolución de conflictos interpersonales y sanación.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Conclusiones</h3>
          <p>La fenomenología del gato, sustractora de interpretaciones unidimensionales, exige ser observada desde el cruce multidisciplinario que abarca la arqueología histórica, la filosofía, la parapsicología teórica y la biomedicina. Lejos de ser un mero producto supersticioso o una mascota pasiva, el felino se constituye como un complejo mecanismo neuro-electromagnético que incide directamente sobre la textura del entorno material y sutil en el que opera.</p>
          <p>El paso de entidad deificada en el antiguo Egipto a instrumento de herejía demoníaca en la inquisición europea no invalida la persistencia de su inusual impacto sobre la psique humana, sino que reitera la consistencia con la que las sociedades han reconocido, para bien o para mal, la permeabilidad ontológica de este animal.</p>
          <p>La modernidad científica ha procedido a desempaquetar y validar estos arquetipos mágicos a través del empirismo: la propiedad oscilatoria de los 25 a 150 Hz del ronroneo proporciona una base médica ineludible a las leyendas curativas, los análisis espectrofotométricos que evidencian transmisión ocular de luz ultravioleta sustentan biológicamente su presunta capacidad clarividente para percibir fantasmas o entidades, y los modelos de resonancia mórfica e interacción bio-psicológica demostrada por neuroimagen validan la efectividad táctica del animal en la inducción de estados alterados de consciencia, hiperconcentración y meditación por parte de humanos.</p>
          <p>Para el mago iniciático contemporáneo, la inclusión del gato en su praxis abandona por completo la coerción. El felino es un socio, un centinela transdimensional, un osciloscopio espiritual vivo y un ancla en el mar caótico de la Luz Astral. Mediante la adopción de una verdadera &quot;filosofía felina&quot; de desapego, de consciencia del presente perpetuo y de comunión no impositiva, el practicante no solo perfecciona el uso técnico de la magia simpática y la vibración armónica, sino que encuentra, en el misterio de los ojos reflectantes del gato, el modelo definitivo del adepto hermético: alerta en el reposo, implacable en la acción, e irremediablemente anclado entre dos mundos.</p>
          
          <div className="my-16 py-8 border-y border-white/10 text-center">
            <Hexagon className="w-6 h-6 mx-auto mb-4 text-purple-400/50" />
            <p className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase">FIN DE LA INVESTIGACIÓN</p>
          </div>

          {/* Fuentes Expandibles */}
          <details className="mt-8 mb-16 p-6 border border-white/10 bg-[#0a0a0a]/50 rounded-sm cursor-pointer group">
            <summary className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase list-none flex justify-between items-center group-hover:text-purple-400 transition-colors">
              <span>Fuentes y Referencias Académicas (Mostrar / Ocultar)</span>
              <span className="text-lg leading-none">+</span>
            </summary>
            <div className="mt-6 text-sm text-[#8A8881] font-mono leading-relaxed space-y-2 h-64 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
              <p>• The Magical Symbolism and Meaning of Cats - Parlour of Wonders</p>
              <p>• Feline Philosophy: Cats and the Meaning of Life by John Gray</p>
              <p>• Eliphas Levi and the Influence of the Astral Light on Victorian Occultism - Academia.edu</p>
              <p>• The felid purr: A healing mechanism? (Journal of the Acoustical Society of America)</p>
              <p>• The spectral transmission of ocular media suggests ultraviolet sensitivity is widespread among mammals (PMC/IOVS)</p>
              <p>• Rupert Sheldrake | Animal telepathy and the morphic field</p>
              <p>• Witches, Familiars, and Human-Animal Interactions in the English Witch Trials - MDPI</p>
              <p>• Dion Fortune, Psychic Warrior - Gary Lachman</p>
              <p>• Cats in Islamic Culture - Muslim Heritage</p>
              <p>• Identifying Cellular and Molecular Mechanisms for Magnetosensation - PMC - NIH</p>
              <p>• Dogme et Rituel de la Haute Magie - Éliphas Lévi</p>
              <p>Para la bibliografía completa de más de 120 referencias científicas, veterinarias, parapsicológicas e históricas, contactar al programa académico del Instituto Arché.</p>
            </div>
          </details>
        </>
      )}
    </>
  )
}

// ── CONTENIDO DEL ARTÍCULO 05: GRINBERG ─────────────────────────────────────
function ArticuloGrinberg() {
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
        Una evaluación sin concesiones de si la Teoría Sintérgica de Grinberg sobrevive al escrutinio de la física cuántica, la neurobiología y la filosofía de la conciencia modernas.
      </p>

      <p>El estudio de la conciencia ha transitado durante las últimas décadas desde los márgenes de la especulación filosófica hacia el centro neurálgico de la física teórica y la biología cuántica. Históricamente, el paradigma materialista clásico nos ha dicho que la experiencia consciente es un simple accidente: un epifenómeno de la complejidad de nuestro cerebro confinado a la bóveda craneal.</p>

      <p>En los últimos años, la figura del neurofisiólogo mexicano Dr. Jacobo Grinberg-Zylberbaum ha cobrado una inmensa popularidad. Su misteriosa desaparición y sus fascinantes postulados sobre cómo el cerebro co-crea la realidad han capturado la imaginación del público. Pero en el Instituto Arché, no nos conformamos con el misticismo o el fanatismo ciego; buscamos cruzar estos conceptos con el rigor de la ciencia.</p>

      <h3>Glosario Arché: Herramientas para la Mente Curiosa</h3>

      <div className="my-12 clear-both overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/grinberg-lattice.png"
          alt="La Látice"
          className="float-none md:float-right w-full md:w-72 h-auto ml-0 md:ml-8 mb-6 md:mb-4 opacity-75 border border-white/10 rounded-sm hover:opacity-100 transition-all duration-700"
        />
        <div className="space-y-5 text-base">
          {[
            { term: 'Lattice (Látice)', def: 'La estructura fundamental del espacio-tiempo. Una red holográfica e hipercompleja que lo conecta todo; un mar de energía en su estado primordial antes de convertirse en materia.' },
            { term: 'Campo Neuronal', def: 'La matriz electromagnética que se crea cuando millones de neuronas se sincronizan. Interactúa directamente con la Látice del universo.' },
            { term: 'Proceso analógico', def: 'La capacidad de experimentar cualitativamente la realidad: sentir dolor, percibir el color rojo o conmoverse con la música.' },
            { term: 'Potencial Transferido', def: 'Fenómeno donde un cerebro aislado refleja eléctricamente lo que está viendo otro cerebro situado lejos de él, tras establecer un vínculo empático.' },
            { term: 'Indeterminismo topológico', def: 'La regla de oro de la física cuántica. La realidad subyacente es una nube de probabilidades, y los resultados se definen cuando interviene un observador consciente.' },
            { term: 'Panpsiquismo moderno', def: 'La perspectiva que propone que la conciencia no es un subproducto del cerebro, sino un atributo fundamental y básico del tejido del universo mismo.' },
          ].map(({ term, def }) => (
            <div key={term} className="border-l border-purple-500/20 pl-4">
              <p className="font-mono text-[11px] text-purple-400/70 tracking-widest uppercase mb-1">{term}</p>
              <p className="text-[#c4c2bc] text-sm leading-relaxed">{def}</p>
            </div>
          ))}
        </div>
      </div>

      <h3>1. La Ontología de la Teoría Sintérgica de Jacobo Grinberg</h3>
      <p>Concebida entre los años 70 y 80 en la UNAM, la Teoría Sintérgica propone que la experiencia consciente es el resultado de un proceso hipercomplejo de interacción informacional. Grinberg buscaba formalizar matemáticamente la intuición de que el cerebro humano no crea la conciencia de la nada, sino que sintoniza un campo preexistente.</p>

      <h4>1.1. La Látice y el Concepto de Sintergia</h4>
      <p>El concepto fundacional es la Látice. La Teoría Sintérgica la postula como un mar holográfico de potencial infinito. Toda forma de materia detectable es simplemente una alteración vibracional o distorsión geométrica de esta Látice. La dicotomía entre materia y conciencia resulta artificial: la conciencia es el primer dato empírico, no la materia.</p>

      <div className="my-8 p-6 bg-[#0a0a0a]/50 border border-white/10 rounded-sm">
        <h4 className="font-serif text-lg text-[#E8E6E1] mb-4 border-b border-white/10 pb-2 mt-0">Los Tres Parámetros de la Sintergia</h4>
        <ul className="space-y-3 text-sm text-[#c4c2bc] m-0 p-0 pl-4">
          <li><strong className="text-purple-400">Coherencia:</strong> Similitud y simetría en la disposición de las partes.</li>
          <li><strong className="text-purple-400">Densidad Informacional:</strong> Capacidad holográfica donde cada punto contiene la información del todo.</li>
          <li><strong className="text-purple-400">Frecuencia:</strong> La tasa temporal de oscilación.</li>
        </ul>
      </div>

      <h4>1.2. De la Electricidad a la Conciencia</h4>

      <div className="breakout-full h-[45vh] md:h-[60vh] my-20 overflow-hidden group relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/grinberg-hero.png" alt="El Campo Neuronal interactuando con la Látice"
          className="w-full h-full object-cover object-center grayscale opacity-40 transition-all duration-[2s] ease-out group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
        <div className="absolute bottom-6 left-8 pointer-events-none">
          <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase">El Campo Neuronal</p>
          <p className="font-serif text-sm text-white/30 italic">El cerebro como transductor de la realidad implicada</p>
        </div>
      </div>

      <p>Cuando el cerebro se activa, sus 12 mil millones de neuronas sincronizadas crean una matriz electromagnética que interactúa con la estructura de la Látice. La información viaja como impulsos bioeléctricos hasta las profundidades del cerebro, donde los neuro-algoritmos unifican la actividad. Sin embargo, la experiencia de <em>sentir</em> no es un algoritmo digital.</p>

      <div className="my-8 p-6 border-l-2 border-purple-500/50 bg-[#0a0a0a]/50 text-sm">
        <p className="font-mono text-[10px] tracking-widest text-purple-400 uppercase mb-2">Error Epistemológico Fundamental</p>
        <p className="italic text-[#c4c2bc] m-0">&ldquo;Es un error epistemológico común confundir este resultado final con el estímulo primario, asumiendo falsamente que el mundo exterior es una entidad mecánica ajena al observador, cuando de facto, es una <strong>co-creación informacional participativa</strong>.&rdquo;</p>
      </div>

      <h4>1.3. Validación Empírica: El Potencial Transferido</h4>

      <figure className="my-16 group relative">
        <div className="w-full h-56 md:h-64 overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-sm relative flex items-center justify-center">
          <div className="flex items-center gap-0 w-full max-w-xl px-8">
            <div className="flex-1 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full border border-purple-500/30 bg-purple-500/5 flex items-center justify-center">
                <Hexagon className="w-8 h-8 text-purple-400/40" />
              </div>
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
              <p className="font-mono text-[9px] text-purple-400/50 tracking-widest">SUJETO A — ESTÍMULO</p>
            </div>
            <div className="w-px h-32 bg-white/5 relative mx-6 flex items-center justify-center">
              <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-purple-400/80 to-transparent" />
            </div>
            <div className="flex-1 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full border border-purple-500/30 bg-purple-500/5 flex items-center justify-center">
                <Hexagon className="w-8 h-8 text-purple-400/40" />
              </div>
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
              <p className="font-mono text-[9px] text-purple-400/50 tracking-widest">SUJETO B — AISLADO</p>
            </div>
          </div>
          <p className="absolute bottom-4 inset-x-0 text-center font-mono text-[9px] text-white/20 tracking-widest">EEG SINCRONIZADO — SIN CONTACTO FÍSICO</p>
        </div>
        <figcaption className="mt-4 border-l border-purple-500/30 pl-4">
          <p className="font-mono text-[10px] text-[#8A8881] tracking-widest">EXPERIMENTO CENTRAL</p>
          <p className="font-serif text-sm text-[#c4c2bc] italic">El Potencial Transferido: entrelazamiento cerebral publicado en Physics Essays (1994).</p>
        </figcaption>
      </figure>

      <p>En 1994, Grinberg publicó en la revista <em>Physics Essays</em> evidencia del &ldquo;Potencial Transferido&rdquo;. En laboratorio, dos sujetos establecían un vínculo empático. Luego se separaban en cámaras aisladas. Al presentar estímulos luminosos a uno, el cerebro del otro sujeto mostraba simultáneamente un patrón electrofisiológico idéntico, sin estímulo físico alguno.</p>

      <h3>2. Correlatos de Rigurosidad: La Física Teórica al Rescate</h3>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm text-left text-[#c4c2bc] bg-[#0a0a0a] border border-white/10">
          <thead className="text-xs text-[#8A8881] uppercase bg-black/50 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-mono">Físico / Científico</th>
              <th className="px-6 py-4 font-mono">Aportación Clave</th>
              <th className="px-6 py-4 font-mono">Correlato con Grinberg</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-serif">
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">David Bohm</td>
              <td className="px-6 py-4 italic">Orden Implicado — cosmos como holograma cuántico</td>
              <td className="px-6 py-4">Es la Látice de Grinberg nombrada con otro lenguaje matemático.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Henry Stapp</td>
              <td className="px-6 py-4 italic">Libre albedrío cuántico — Efecto Zeno y voluntad mental</td>
              <td className="px-6 py-4">El esfuerzo mental estabiliza conexiones neuronales: la mente primaria modula al cerebro, no al revés.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Penrose &amp; Hameroff</td>
              <td className="px-6 py-4 italic">Orch-OR — microtúbulos como antenas cuánticas</td>
              <td className="px-6 py-4">El momento dipolar de la tubulina protege información cuántica en la biología húmeda.</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">John A. Wheeler</td>
              <td className="px-6 py-4 italic">&ldquo;It from bit&rdquo; — Universo Participativo</td>
              <td className="px-6 py-4">Todo objeto físico existe a partir de información inmaterial. El colapso de la realidad lo dicta el observador.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <figure className="breakout-full h-[40vh] md:h-[55vh] my-20 overflow-hidden group relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/grinberg-lattice.png" alt="Lo macro habitando lo micro"
          className="w-full h-full object-cover grayscale opacity-35 transition-all duration-[2s] ease-out group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/30 to-[#050505]/50" />
        <div className="absolute bottom-6 right-8 text-right pointer-events-none z-10">
          <p className="font-mono text-[10px] tracking-widest text-white/50 uppercase">Orch-OR / Penrose &amp; Hameroff</p>
          <p className="font-serif text-sm text-white/30 italic">Lo macro habitando lo micro</p>
        </div>
      </figure>

      <h3>3. La Identidad como &ldquo;Disfraz&rdquo; Informacional</h3>
      <p>Si la conciencia es un campo continuo e indivisible (panpsiquismo moderno), surge el gran enigma: ¿Por qué me siento yo, encerrado en este cuerpo, separado de ti? La neurobiología concluye que la &ldquo;identidad&rdquo; no es el sujeto fundacional del universo, sino un disfraz evolutivo. Una herramienta topológica utilizada por la conciencia primaria para sobrevivir.</p>

      <h4>La Interfaz Multimodal de Donald Hoffman</h4>
      <p>El científico cognitivo Donald Hoffman ha demostrado matemáticamente que la evolución <em>castiga</em> a las especies que ven la realidad cuántica tal cual es. La evolución prefiere sistemas que ocultan la realidad y muestran una interfaz simplificada para sobrevivir.</p>

      <div className="my-8 p-6 border border-purple-500/10 bg-[#0a0a0a]/50 rounded-sm">
        <p className="font-mono text-[10px] tracking-widest text-purple-400 uppercase mb-3">Analogía de los íconos de escritorio</p>
        <p className="font-serif text-base text-[#c4c2bc] m-0">Tu percepción tridimensional y tu ego biográfico son los &ldquo;iconos de escritorio&rdquo; de una computadora hipercompleja. Creer que tu &ldquo;yo narrativo&rdquo; es la realidad absoluta es como creer que el disco duro está físicamente lleno de pequeñas carpetitas amarillas de píxeles.</p>
      </div>

      <h4>El Retraso Temporal y Karl Friston</h4>
      <p>Karl Friston y el Principio de Minimización de Energía Libre explican que el cerebro siempre está adivinando el futuro inmediato porque tiene un &ldquo;retraso&rdquo; biológico. Al tratar de sincronizarse con el entorno, genera inevitablemente una división ilusoria: el &ldquo;Yo&rdquo; (agencia) vs el &ldquo;No-Yo&rdquo; (el entorno). La identidad es el solenoide biológico limitante para poder jugar el juego de la termodinámica.</p>

      <h3>4. Individualismo Abierto: Los &ldquo;Brazos&rdquo; de la Existencia</h3>

      <figure className="my-16 group">
        <div className="w-full overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/grinberg-monism.png" alt="El Monismo: Una sola luz, miles de máscaras"
            className="w-full h-72 md:h-96 object-cover grayscale opacity-50 transition-all duration-1000 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105" />
        </div>
        <figcaption className="mt-4 border-l border-purple-500/30 pl-4">
          <p className="font-mono text-[10px] text-[#8A8881] tracking-widest uppercase">El Monismo de Campo</p>
          <p className="font-serif text-sm text-[#c4c2bc] italic">Una única fuente de luz iluminando simultáneamente miles de millones de avatares-casilleros.</p>
        </figcaption>
      </figure>

      <p>Si la identidad es una máscara, ¿quién está detrás? El filósofo Daniel Kolak en su teoría del Individualismo Abierto demuestra que, matemáticamente, solo existe un sujeto de experiencia en todo el cosmos.</p>
      <p>Aunque tengamos distintas memorias y cuerpos, el &ldquo;Sujeto de Sí Mismo&rdquo; —la sensación profunda de &ldquo;yo estoy consciente&rdquo;— es literalmente el mismo principio en todas las mentes.</p>

      <div className="my-8 p-6 border-l-2 border-purple-500/50 bg-[#0a0a0a]/50 text-sm">
        <p className="font-mono text-[10px] tracking-widest text-purple-400 uppercase mb-2">Corolario Ético</p>
        <p className="italic text-[#c4c2bc] m-0">El Individualismo Abierto destruye el Solipsismo. Al mirar al otro, estás observando a la misma Conciencia Primaria que te habita, asomándose desde una ventana topológica diferente. <strong>Dañar a un tercero no es una metáfora de crueldad; es matemáticamente auto-sadismo.</strong></p>
      </div>

      <h3>Conclusión del Instituto Arché: La Influencia del Pensamiento</h3>
      <p>El escrutinio cruzado interdisciplinario derriba definitivamente el dogma de que nuestra conciencia es un accidente bioquímico. El universo es un sistema informacional primario. Nuestro pensamiento tiene una influencia y una gravedad sobre nuestro entorno inmensamente mayor de lo que el paradigma clásico nos hizo creer.</p>
      <p>La separación que experimentamos no es real; es simplemente una estratagema cibernética. Somos los tentáculos sensoriales con los que el propio universo, disipando la ilusión del vacío, logra por fin tocarse, experimentarse y despertarse a sí mismo.</p>

      <figure className="breakout-full h-[55vh] md:h-[75vh] my-20 overflow-hidden group relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/grinberg-final.png" alt="El observador tocando el universo"
          className="w-full h-full object-cover grayscale opacity-40 transition-all duration-[3s] ease-out group-hover:grayscale-0 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 pointer-events-none">
          <p className="font-serif text-lg md:text-2xl text-white/60 italic text-center max-w-lg px-4 group-hover:text-white/90 transition-colors duration-1000">
            &ldquo;Somos los tentáculos sensoriales con los que el universo logra, por fin, tocarse a sí mismo.&rdquo;
          </p>
        </div>
      </figure>

      <div className="my-16 py-8 border-y border-white/10 text-center">
        <Hexagon className="w-6 h-6 mx-auto mb-4 text-purple-400/50" />
        <p className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase">FIN DE LA INVESTIGACIÓN</p>
      </div>

      <details className="mt-8 mb-16 p-6 border border-white/10 bg-[#0a0a0a]/50 rounded-sm cursor-pointer group">
        <summary className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase list-none flex justify-between items-center group-hover:text-purple-400 transition-colors">
          <span>Fuentes y Referencias Académicas (Mostrar / Ocultar)</span>
          <span className="text-lg leading-none">+</span>
        </summary>
        <div className="mt-6 text-sm text-[#8A8881] font-mono leading-relaxed space-y-2 h-64 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
          <p>• Grinberg-Zylberbaum, J. et al. (1994). The Einstein-Podolsky-Rosen Paradox in the Brain. Physics Essays.</p>
          <p>• Bohm, D. (1980). Wholeness and the Implicate Order. Routledge.</p>
          <p>• Stapp, H. (2007). Mind, Matter and Quantum Mechanics. Springer.</p>
          <p>• Penrose, R. &amp; Hameroff, S. (2014). Consciousness in the Universe: Orch OR Theory. Physics of Life Reviews.</p>
          <p>• Wheeler, J.A. (1990). Information, Physics, Quantum: The Search for Links.</p>
          <p>• Hoffman, D. (2019). The Case Against Reality. W.W. Norton &amp; Company.</p>
          <p>• Friston, K. (2010). The free-energy principle: a unified brain theory? Nature Reviews Neuroscience.</p>
          <p>• Kolak, D. (2004). I Am You: The Metaphysical Foundations for Global Ethics. Springer.</p>
        </div>
      </details>
    </>
  )
}

function ArticuloTDAH() {
  return (
    <>
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
        La investigación de fenómenos que trascienden los límites convencionales de la percepción sensorial ha sido históricamente relegada. No obstante, el TDAH ofrece una ventana científica única profunda.
      </p>

      <p>El estudio riguroso de la neurodivergencia, específicamente el Trastorno por Déficit de Atención con Hiperactividad (TDAH), ofrece una ventana científica única para comprender cómo el cerebro procesa la información de manera no lineal. El síntoma clínico de &quot;terminar las frases de los demás&quot; no es meramente una manifestación de impulsividad motora, sino un indicador de un motor predictivo hiper-activado que opera bajo principios bayesianos de inferencia.</p>

      <h3>Epistemología de la Parapsicología y el Legado de la Investigación Rigurosa</h3>
      <p>Para abordar la telepatía con seriedad científica, es imperativo reconocer el trabajo de instituciones que han aplicado métodos cuantitativos a fenómenos anómalos durante casi un siglo. El Centro de Investigación Rhine fue pionero en este campo, estableciendo que la telepatía y la clarividencia son realidades observables en entornos controlados mediante estadística avanzada. Instituciones como el Instituto de Ciencias Noéticas (IONS) continúan esta labor, sugiriendo que la intuición no es un evento místico, sino un proceso biológico que puede estar particularmente acentuado en cerebros con conectividad atípica.</p>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm text-left text-[#c4c2bc] bg-[#0a0a0a] border border-white/10">
          <thead className="text-xs text-[#8A8881] uppercase bg-black/50 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-mono">Institución</th>
              <th className="px-6 py-4 font-mono">Enfoque Principal</th>
              <th className="px-6 py-4 font-mono">Metodología Clave</th>
              <th className="px-6 py-4 font-mono">Hallazgos Relevantes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-serif">
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Centro Rhine</td>
              <td className="px-6 py-4 italic">Mecanismos de Psi y PK</td>
              <td className="px-6 py-4">Pruebas de cartas Zener, aleatoriedad</td>
              <td className="px-6 py-4">Repetibilidad de PES por encima del azar</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">IONS</td>
              <td className="px-6 py-4 italic">Conciencia No-Local</td>
              <td className="px-6 py-4">Inventario NSI, neuroimagen EEG 3D</td>
              <td className="px-6 py-4">Validación de 12 factores de saber directo</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Univ. de Virginia (DOPS)</td>
              <td className="px-6 py-4 italic">Reencarnación</td>
              <td className="px-6 py-4">Estudios de casos neuropsiquiátricos</td>
              <td className="px-6 py-4">Evidencia de telepatía en autismo</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>La Fenomenología del TDAH: Del Síntoma a la Capacidad Predictiva</h3>
      <p>Uno de los indicadores más reveladores en las escalas de diagnóstico para adultos es la tendencia a terminar las oraciones de las personas antes de que estas las completen. Este comportamiento revela una arquitectura cognitiva que procesa los patrones a una velocidad superior a la entrega de datos sensoriales.</p>

      <h4>Codificación Predictiva y el Cerebro Bayesiano</h4>
      <p>La teoría postula que el cerebro no espera a recibir toda la información sensorial para construir una interpretación; genera modelos internos. En el TDAH, este proceso opera con un sesgo hacia las expectativas internas, permitiendo &quot;leer&quot; la intención del interlocutor. Existe una alteración en la asignación de precisión a los errores de predicción: el cerebro otorga un peso excesivo a sus propias predicciones internas (top-down), resultando en la sensación clarividente de &quot;saber&quot; lo que vendrá.</p>

      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm text-left text-[#c4c2bc] bg-[#0a0a0a] border border-white/10">
          <thead className="text-xs text-[#8A8881] uppercase bg-black/50 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-mono">Proceso Cognitivo</th>
              <th className="px-6 py-4 font-mono">Modelo Neurotípico</th>
              <th className="px-6 py-4 font-mono">Modelo TDAH / Intuitivo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-serif">
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Construcción de Sentencias</td>
              <td className="px-6 py-4 italic">Pasiva / Secuencial</td>
              <td className="px-6 py-4">Activa / Estructural anticipatoria</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Manejo del Error</td>
              <td className="px-6 py-4 italic">Ajuste lento a la evidencia</td>
              <td className="px-6 py-4">Re-enrutamiento rápido predictivo</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-bold text-[#E8E6E1]">Enfoque de Atención</td>
              <td className="px-6 py-4 italic">Filtrado de distractores</td>
              <td className="px-6 py-4">Captura de patrones colaterales holísticos</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Arquitectura Neuroanatómica de la Intuición</h3>
      <h4>La Corteza Prefrontal Ventromedial (vmPFC)</h4>
      <p>La vmPFC es el centro de funciones ejecutivas &quot;calientes&quot;, integrando señales somáticas o &quot;marcadores intestinales&quot;. En individuos con TDAH hay una reducción en la activación de la vmPFC, por lo que el control fino sobre cuándo aplicar intuiciones se desregula hacia la impulsividad psíquica.</p>

      <h4>La DMN y la Simulación Social</h4>
      <p>La Red Neuronal por Defecto (DMN) es fundamental para la Teoría de la Mente (modelar lo que otros piensan). En neurotípicos, se apaga durante el trabajo. En el TDAH permanece activa. Este cerebro está constantemente ejecutando simulaciones sociales telepáticas en segundo plano, interpretadas como intuición pura.</p>

      <h3>Capacidades Anómalas: El Caso de la Telepatía y Disociación</h3>
      <p>Expertos como Diane Hennacy Powell sugieren que la telepatía es una capacidad humana primordial &quot;enterrada&quot; bajo el desarrollo del lenguaje. En autistas no verbales o perfiles fuertemente neurodivergentes, el cerebro compensa manteniendo acceso al campo de conciencia compartido. A su vez, estudios de IONS indican que traumas inducen una &quot;alter-asociación&quot; disociativa (clarividencia post-traumática) como mecanismo hipervigilante hiperadaptativo.</p>

      <h3>Farmacología: El Efecto de la Atomoxetina en la Intuición</h3>
      <p>La atomoxetina (ISRN) fortalece la anticorrelación entre la DMN y las redes de control cognitivo, normalizando la hiper-simulación. ¿Disminuye esto la intuición?</p>
      <ul>
        <li className="mb-2"><strong>Reducción de Intuición Intrusiva:</strong> Disminuye las ráfagas incontrolables (ej. cortar frases ajenas) al silenciar el ruido de la DMN.</li>
        <li className="mb-2"><strong>Clarificación de la Señal (Psi):</strong> Al tener menos distracción (top-down), las intuiciones genuinas se pueden diferenciar limpiamente de la ansiedad paranoica.</li>
        <li><strong>En resumen:</strong> No &quot;borra&quot; la clarividencia; le proporciona el andamiaje ejecutivo para gestionarla conscientemente.</li>
      </ul>

      <div className="my-16 py-8 border-y border-white/10 text-center">
        <Hexagon className="w-6 h-6 mx-auto mb-4 text-purple-400/50" />
        <p className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase">FIN DE LA INVESTIGACIÓN</p>
      </div>

      <details className="mt-8 mb-16 p-6 border border-white/10 bg-[#0a0a0a]/50 rounded-sm cursor-pointer group">
        <summary className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase list-none flex justify-between items-center group-hover:text-purple-400 transition-colors">
          <span>Bibliografía de Respaldo (Mostrar / Ocultar)</span>
          <span className="text-lg leading-none">+</span>
        </summary>
        <div className="mt-6 text-sm text-[#8A8881] font-mono leading-relaxed space-y-2 h-64 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
          <p>• Predictive coding - Wikipedia & Neuroscience News</p>
          <p>• The Noetic Signature Inventory: Development, Exploration, and Initial Validation - PMC</p>
          <p>• Telepathy in Autistic Savants with Diane Hennacy Powell, MD.</p>
          <p>• The Default Mode Network: why your distracted brain is actually generating ideas</p>
          <p>• Atomoxetine Treatment Strengthens an Anti-Correlated Relationship between Functional Brain Networks - PMC</p>
        </div>
      </details>
    </>
  )
}

// ── CONTENIDO DEL ARTÍCULO 05: NEUROCIENCIA TRASCENDENCIA ───────────────
function ArticuloTrascendencia() {
  return (
    <>
      <div className="flex items-center gap-4 mb-16 py-6 border-y border-white/5">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <Hexagon className="w-5 h-5 text-purple-400/50" />
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-widest text-[#E8E6E1]">CURACIÓN Y EDICIÓN POR</p>
          <p className="font-serif text-lg text-[#8A8881] italic">Instituto Arché</p>
        </div>
      </div>

      <p className="mb-12 text-2xl md:text-3xl text-[#E8E6E1] font-light italic border-l-2 border-purple-500/30 pl-8 leading-snug">
        Una inmersión profunda en cómo las experiencias místicas, la meditación y la oración alteran físicamente las estructuras neuronales humanas.
      </p>

      <p>La espiritualidad ha sido una constante en la psique humana a lo largo de los milenios, sirviendo como respuesta ante la incertidumbre material y como puente hacia lo inefable. Tradicionalmente, la ciencia materialista categorizaba estos eventos como meros subproductos emocionales de la cultura o ilusiones cognitivas.</p>
      
      <p>No obstante, la neurociencia moderna ha superado la antigua fricción filosófica para abordar empíricamente aquello que los místicos han reportado por siglos: <strong>El cerebro humano posee una arquitectura intrínsecamente diseñada para experimentar a Dios o lo Absoluto.</strong></p>

      <h3>1. Anatomía Funcional de lo Sagrado</h3>
      <p>Cuando un individuo entra en estados profundos de oración, meditación o éxtasis religioso, su cerebro no apaga sus funciones racionales, sino que orquesta una sinfonía neuroquímica y eléctrica altamente específica.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 items-center">
        <div className="order-2 md:order-1">
          <p className="font-serif text-lg text-[#E8E6E1] leading-relaxed mb-4">
            Investigaciones han demostrado que durante las simulaciones de prácticas religiosas profundas, se produce un cambio hemodinámico radical. El <strong>córtex prefrontal medio</strong> (vinculado al razonamiento moral y evaluación existencial) modula su actividad, mientras que el <strong>núcleo accumbens</strong> y el cuerpo estriado (el epicentro de los circuitos de recompensa y motivación) se iluminan intensamente.
          </p>
          <p className="font-serif text-lg text-[#8A8881] leading-relaxed">
            Se desata una liberación enzimática en cadena: las sinapsis son inundadas por <i>dopamina</i>, <i>serotonina</i> y <i>oxitocina</i>. Estas moléculas generan fisiológicamente la misma sensación de comunión cósmica, empatía incondicional y trascendencia de los límites del ego que describen doctrinas budistas, meditaciones sufíes o rezos cristianos inmersivos.
          </p>
        </div>
        <figure className="order-1 md:order-2 group relative">
          <div className="w-full overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-sm">
            <img src="/meditacion-trance.webp" alt="Actividad Neurobiológica" className="w-full h-auto object-cover grayscale opacity-60 transition-all duration-[2s] group-hover:grayscale-[0.3] group-hover:opacity-100 group-hover:scale-105" />
          </div>
          <figcaption className="mt-4 border-l border-purple-500/30 pl-4">
            <p className="font-mono text-[10px] text-[#8A8881] tracking-widest uppercase">EVIDENCIA TOMOGRÁFICA</p>
            <p className="font-serif text-sm text-[#c4c2bc] italic">Activación de la circuitería prefrontal y de recompensa durante el trance.</p>
          </figcaption>
        </figure>
      </div>

      <h4>El Circuito de la Materia Gris Periacueductal (SCP)</h4>
      <p>Los investigadores han aislado lo que podría llamarse el circuito primordial del cerebro, localizado profundamente en la <strong>Materia Gris Periacueductal Trasera (SCP)</strong> u homóloga mesencefálica. Esta red milenaria y evolutivamente preservada coordina respuestas extremas: por un lado, condiciona el terror atávico, y por el otro, modula el dolor crónico mediante la analgesia endógena y fomenta comportamientos de altruismo absoluto.</p>
      
      <p>Es aquí donde lo metafísico toca el nervio biológico. Las lesiones o disfunciones en esta área correlacionan directamente con afecciones paradójicas que oscilan entre el rechazo a cualquier ideología espiritual, a cuadros opuestos de hiper-religiosidad intensa.</p>

      {/* Imagen ancha 1 (GIF de la neurociencia) */}
      <figure className="breakout-full h-[40vh] md:h-[60vh] my-20 overflow-hidden group relative bg-[#050505]">
        <img
          src="https://www.lapericana.com.ar/wp-content/uploads/2025/10/Medicina-cuantica-2.gif"
          alt="Medicina Cuántica y Cerebro"
          className="w-full h-full object-cover grayscale opacity-40 transition-all duration-[1.5s] mix-blend-screen group-hover:grayscale-0 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute bottom-6 right-8 text-right pointer-events-none z-10">
          <p className="font-mono text-[10px] tracking-widest text-[#E8E6E1] uppercase">DINÁMICA CEREBRAL</p>
          <p className="font-serif text-sm text-white/50 italic">El oscilador biológico interactuando con la consciencia</p>
        </div>
      </figure>

      <h3>2. Impacto en la Estructura de la Realidad y la Identidad</h3>
      <p>Históricamente, los pilares psicoanalíticos propuestos por Freud encuadraban la religión sombríamente, percibiéndola como un vestigio del instinto animal reprimido o una ilusión infantil ante la abrumadora realidad natural. Sin embargo, Carl Jung contrapuso a esto una perspectiva mucho más afín a la neurociencia moderna: la experiencia espiritual como la activación de arquetipos sagrados incrustados en la red del <i>inconsciente colectivo</i>.</p>
      
      <p>La mente inmersa rutinariamente en disciplinas contemplativas experimenta profundos cambios neurológicos permanentes. La comunión mística no es un estado alucinatorio inestable, sino que deviene en "neuroplasticidad autogestionada".</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 items-start">
        <figure className="group">
          <div className="overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-sm aspect-[4/3] relative">
            <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <img src="https://www.revistaesfinge.com/wp-content/uploads/2019/03/e2bf03d29c489ee57637a8f534afa56b.jpg" alt="Experiencia Mística" className="w-full h-full object-cover grayscale opacity-70 transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-110" />
          </div>
        </figure>
        <figure className="group md:mt-24">
          <div className="overflow-hidden bg-[#0a0a0a] border border-white/5 rounded-sm aspect-square relative">
            <img src="https://www.24high.es/files/?id=2575.jpg&file=spirituals.jpg" alt="Consciencia Expandida" className="w-full h-full object-cover grayscale opacity-60 transition-all duration-[2s] group-hover:grayscale-[0.2] group-hover:opacity-100" />
          </div>
        </figure>
      </div>

      <h3>3. Homeostasis Clínica y Neuroética</h3>
      <p>Más allá de validaciones contemplativas, ¿cuáles son las implicaciones prácticas de estos descubrimientos? Múltiples estudios hospitalarios han documentado sistemáticamente que pacientes enfrentando pronósticos severos (por ejemplo, VIH/SIDA o cuadros oncológicos) exhiben marcadores crónicos de ansiedad exponencialmente menores si logran sostener y abrazar sistemas espirituales sólidos.</p>

      <div className="my-8 p-6 bg-[#0a0a0a]/50 border-l border-purple-500/30 rounded-r-sm">
        <p className="font-mono text-[10px] tracking-widest text-purple-400 uppercase mb-2">LA RE-CALIBRACIÓN TERAPÉUTICA</p>
        <p className="italic text-[#c4c2bc] m-0">La comunidad clínica corre el riesgo de subestimar crónicamente las redes psíquicas. La neuroética actual se plantea no <i>si</i> debe o no atender la dimensión trascendental, sino <i>cómo</i> integrar la espiritualidad del paciente –libre de imposiciones ajenas o sesgos– para propulsar la homeostasis biológica integral y mitigar el miedo orgánico.</p>
      </div>

      <p>El cerebro que reza, que medita, o que se difumina intencionalmente en ritos atávicos comunitarios está reestructurando su tejido a través de comandos electromagnéticos voluntarios. Está obligando al <i>mecanismo de supervivencia primitivo</i> a regenerarse bajo los códigos del amor universal; atemperando permanentemente las redes del pánico.</p>

      <div className="my-20 py-8 border-y border-white/10 text-center">
        <Hexagon className="w-6 h-6 mx-auto mb-4 text-purple-400/50" />
        <p className="font-mono text-[10px] tracking-widest text-[#E8E6E1] uppercase mb-4">CRÉDITOS Y FUNDAMENTACIÓN CIENTÍFICA</p>
        <p className="font-serif text-sm text-[#8A8881] italic max-w-2xl mx-auto">
          Este ensayo es una curaduría y traducción inmersiva realizada bajo la dirección científica del Instituto Arché. Las conclusiones neurobiológicas derivan del estudio base de revisión sistemática:<br/><br/>
          <strong>"Intersection Between Spirituality and Neuroscience: Biological Bases of Transcendental Experiences"</strong> (2023). <br/>
          <i>Autores: M.A. Cerqueira Rodrigues, F.C. Barbosa, G.C. Dias Lopes, L. Santacroce, P.C. Pereira Lopes en la RGSA - Revista de Gestão Social e Ambiental. DOI: 10.24857/rgsa.v17n9-015.</i><br/>Libre de derechos bajo la licencia de Atribución CC BY 4.0 Creative Commons.
        </p>
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

  // 🍪 Extraemos la galleta de seguridad
  const cookieStore = await cookies()
  const hasAccessCookie = cookieStore.get(`arche_unlocked_${slug}`)
  const isUnlocked = !!hasAccessCookie?.value

  return (
    <main className="relative w-full min-h-screen pb-32 bg-[#050505]">

      {/* JSON-LD Structured Data — Schema.org Article */}
      <ArticleJsonLd slug={slug} />

      {/* Hero del artículo */}
      <header className="relative w-full min-h-[70vh] flex flex-col justify-between px-8 md:px-32 pb-16 pt-32">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={paper.heroImage} alt={paper.title} className="w-full h-full object-cover opacity-20 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        </div>

        <div className="relative z-10 w-full">
          {/* Botón volver */}
          <Link
            href="/investigaciones"
            className="inline-flex items-center gap-2 font-mono text-[10px] text-[#8A8881] tracking-widest hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ARCHIVO
          </Link>
        </div>

        <div className="relative z-10 max-w-4xl mt-12">
          <div className="flex gap-4 font-mono text-[10px] text-[#8A8881] tracking-widest mb-6">
            <span>{paper.date}</span>
            <span>/</span>
            <span className={paper.access === 'locked' ? 'text-red-400/70' : 'text-purple-400/70'}>
              {paper.type}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-0 flex items-center gap-6 text-[#E8E6E1]">
            {paper.access === 'locked' && <Lock className="w-10 h-10 text-white/20 hidden md:block" />}
            {paper.title}
          </h1>
        </div>
      </header>

      {/* Contenido */}
      <div className="relative w-full px-8 md:px-0 max-w-2xl mx-auto font-serif text-lg md:text-xl leading-relaxed text-[#c4c2bc] article-content">
        {paper.slug === 'gatos-magia-neurociencia' && <ArticuloGatos isUnlocked={isUnlocked} />}
        {paper.slug === 'tdah-y-telepatia-medicacion' && <ArticuloTDAH />}
        {paper.slug === 'neurociencia-de-la-trascendencia' && <ArticuloTrascendencia />}
        {paper.slug === 'grinberg-teoria-sinteargica' && <ArticuloGrinberg />}
        {paper.slug !== 'gatos-magia-neurociencia' && paper.slug !== 'tdah-y-telepatia-medicacion' && paper.slug !== 'neurociencia-de-la-trascendencia' && paper.slug !== 'grinberg-teoria-sinteargica' && paper.access === 'public' && (
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
