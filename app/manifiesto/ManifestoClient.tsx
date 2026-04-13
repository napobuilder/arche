'use client'

import { motion } from 'framer-motion'

export default function ManifestoClient() {
  const fadeUp: any = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-[#E8E6E1] pb-32">
      {/* Spacer para el Navbar estático de arriba */}
      <div className="h-40 md:h-56" />

      <div className="max-w-6xl mx-auto px-8 md:px-12 w-full">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeUp}
          className="font-mono text-xs text-[#8A8881] mb-12 flex items-center gap-4"
        >
          <span className="w-8 h-[1px] bg-[#8A8881]" />
          <span>INSTITUTO ARCHÉ</span>
        </motion.div>

        {/* Sección 1 */}
        <motion.h1 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={fadeUp}
          className="font-serif text-4xl md:text-6xl lg:text-[5rem] leading-[1.1] mb-32 tracking-tight"
        >
          Existen preguntas que la ciencia<br /> convencional aún no sabe<br />
          <span className="italic text-[#8A8881]">—o no quiere—</span> responder.
        </motion.h1>
      </div>

      {/* Imagen ancha 1 (Parallax / Textura) */}
      <motion.div 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="w-full h-[50vh] md:h-[70vh] mb-32 relative overflow-hidden"
      >
        <video 
          src="/bg-hero.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover grayscale opacity-50 hover:scale-105 transition-transform duration-[3s]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-8 md:px-12 w-full">
        {/* Sección 2 */}
        <motion.h2 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-12 text-right ml-auto"
        >
          No somos ni completamente científicos,<br className="hidden md:block"/> ni completamente místicos.
        </motion.h2>

        <motion.h2 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={fadeUp}
          className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] mb-32 text-[#8A8881]"
        >
          Investigamos en el espacio fronterizo entre la neurociencia, la filosofía y el esoterismo.
        </motion.h2>

        {/* Imagen 2 y texto descriptivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-40">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeUp}
            className="order-2 md:order-1"
          >
            <p className="font-serif text-2xl md:text-3xl text-[#E8E6E1] leading-relaxed mb-6">
              Porque creemos que es allí donde viven las preguntas más importantes sobre la naturaleza humana.
            </p>
            <p className="font-serif text-lg md:text-xl text-[#8A8881] leading-relaxed">
              A través del Instituto Arché, exploramos y divulgamos estas fronteras en <i className="text-[#E8E6E1]">papers</i> digitales inmersivos que desafían la rigidez institucional.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 h-[450px] border border-white/5 bg-[#0a0a0a] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
              alt="Misterio humano" 
              className="w-full h-full object-cover grayscale opacity-50 hover:scale-110 transition-transform duration-[5s] ease-out" 
            />
          </motion.div>
        </div>

        {/* Sección 3 / Conclusión */}
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={fadeUp}
          className="border-l-2 border-purple-500/50 pl-8 md:pl-16 py-4"
        >
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] text-[#E8E6E1]">
            No somos dueños de la verdad.<br />
          </h2>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] text-[#8A8881] mt-4 mb-4">
            Somos exploradores del misterio humano,
          </h2>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] italic text-[#E8E6E1]">
            con rigurosidad y pragmatismo.
          </h2>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col items-start gap-6 max-w-sm group">
            <div className="overflow-hidden w-16 h-16 rounded-full ring-1 ring-white/10">
              <img 
                src="/napbak.png" 
                alt="Napoleon Baca" 
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
            </div>
            <div>
              <p className="font-mono text-sm tracking-widest text-[#E8E6E1] uppercase mb-2 group-hover:text-white transition-colors duration-500">
                Napoleon Baca
              </p>
              <p className="font-mono text-[10px] tracking-widest text-[#8A8881] uppercase leading-relaxed">
                Investigador Independiente <br/>
                Productor Musical & Desarrollador <br />
                Fundador, Instituto Arché
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
