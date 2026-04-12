import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { Lock, Unlock, ArrowLeft, Hexagon } from 'lucide-react'
import { getInvestigationBySlug, getAllSlugs } from '@/data/investigations'
import Paywall from '@/components/Paywall'

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

      {/* ── PAYWALL o CONTENIDO DESBLOQUEADO ── */}
      {!isUnlocked ? (
        <Paywall 
          checkoutUrl="https://archefoundation.lemonsqueezy.com/checkout/buy/d0b36218-6191-4643-9421-4f6fead3aa18" 
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
            <h3>Relación Práctica entre el Gato y el Mago Iniciático</h3>
            <p>Una vez desglosados los fundamentos científicos, es imperativo analizar la dinámica operativa. En las sendas iniciáticas contemporáneas, la relación no se basa en el vasallaje, sino en una simbiosis voluntaria transdimensional.</p>
          </div>
          
          <h4>El Guardián del Umbral y el Ancla del Viaje Astral</h4>
          <p>El currículo del mago iniciático implica la inducción de estados de trance profundo. Durante estos procesos de desplazamiento extracorpóreo, el vehículo físico queda inerte. La función del gato es la de un centinela electromagnético. Debido a su visión UV y radar geomagnético, detecta intrusiones sutiles en la habitación. En momentos de peligro metafísico, el gato actuará para interrumpir súbitamente el trance del mago, sirviendo de ancla de emergencia hacia la vigilia física.</p>

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
            <li><strong>Pelaje:</strong> Se quema para producir negro de humo empleado como tinta ritual poderosa para el trazado de sigilos y talismanes.</li>
          </ul>

          <figure className="my-16 group">
            <div className="w-full h-56 md:h-72 overflow-hidden bg-[#0a0a0a] border border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://static.dw.com/image/74939776_906.jpg" alt="Iconografía Egipcia Felina" className="w-full h-full object-cover object-top grayscale opacity-50 transition-all duration-[2s] group-hover:grayscale-0 group-hover:opacity-100 group-hover:object-center" />
            </div>
          </figure>

          <h4>2. Correspondencias Esotéricas por Fenotipo y Coloración</h4>
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
          <p>La fenomenología del gato exige ser observada desde el cruce multidisciplinario que abarca la arqueología histórica, la filosofía, la parapsicología teórica y la biomedicina. La modernidad científica ha procedido a desempaquetar y validar estos arquetipos mágicos a través del empirismo: la propiedad oscilatoria de los 25 a 150 Hz del ronroneo proporciona una base médica ineludible a las leyendas curativas, y los análisis espectrofotométricos sustentan biológicamente su presunta capacidad clarividente.</p>
          
          <p>Para el mago iniciático contemporáneo, el felino es un socio, un centinela transdimensional, un osciloscopio espiritual vivo y un ancla en el mar caótico de la Luz Astral. Mediante la adopción de una verdadera "filosofía felina" de desapego, el practicante perfecciona el uso de la magia simpática y encuentra, en el misterio de los ojos reflectantes del gato, el modelo definitivo del adepto hermético: alerta en el reposo, implacable en la acción, e irremediablemente anclado entre dos mundos.</p>
          
          <div className="my-16 py-8 border-y border-white/10 text-center">
            <Hexagon className="w-6 h-6 mx-auto mb-4 text-purple-400/50" />
            <p className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase">FIN DEL MANUSCRITO INICIÁTICO</p>
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
              <p>Para la bibliografía completa de más de 120 referencias científicas, veterinarias, parapsicológicas e históricas, contactar al programa académico de la Fundación Arché.</p>
            </div>
          </details>
        </>
      )}
    </>
  )
}

// ── CONTENIDO DEL ARTÍCULO 04: TDAH ───────────────────────────────────────
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
        <p className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase">FIN DEL ENSAYO NEURO-INICIÁTICO</p>
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
        {paper.slug === 'gatos-magia-neurociencia' && <ArticuloGatos isUnlocked={isUnlocked} />}
        {paper.slug === 'tdah-y-telepatia-medicacion' && <ArticuloTDAH />}
        {paper.slug !== 'gatos-magia-neurociencia' && paper.slug !== 'tdah-y-telepatia-medicacion' && paper.access === 'public' && (
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
