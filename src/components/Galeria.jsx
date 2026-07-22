import { useState, useCallback, useEffect } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'
import { useGaleriaFotos } from '../hooks/useGaleriaFotos'

// Fallback: imagens locais (usadas quando Supabase não está configurado OU em dev sem .env)
import fotoReal from '../assets/galeria/foto-real-equipe.jpg'
import foto01 from '../assets/galeria/foto-01.jpg'
import foto02 from '../assets/galeria/foto-02.jpg'
import foto03 from '../assets/galeria/foto-03.jpg'
import foto04 from '../assets/galeria/foto-04.jpg'
import foto05 from '../assets/galeria/foto-05.jpg'
import foto06 from '../assets/galeria/foto-06.jpg'
import foto07 from '../assets/galeria/foto-07.jpg'
import foto08 from '../assets/galeria/foto-08.jpg'

const fotosFallback = [
  { id: 'fb-0', titulo: 'Camisa oficial Team Alpha', descricao: 'Camisa oficial do time com logo do urso', imagem_url: fotoReal, tipo: 'imagem', destaque: true, ordem: 0 },
  { id: 'fb-1', titulo: 'Campeonato Estadual 2024', descricao: '', imagem_url: foto01, tipo: 'imagem', destaque: false, ordem: 1 },
  { id: 'fb-2', titulo: 'Copa Alpha 2024', descricao: '', imagem_url: foto02, tipo: 'imagem', destaque: false, ordem: 2 },
  { id: 'fb-3', titulo: 'Brasileiro 2023', descricao: '', imagem_url: foto03, tipo: 'imagem', destaque: false, ordem: 3 },
  { id: 'fb-4', titulo: 'Fight Night Alpha', descricao: '', imagem_url: foto04, tipo: 'imagem', destaque: false, ordem: 4 },
  { id: 'fb-5', titulo: 'Open Rio 2023', descricao: '', imagem_url: foto05, tipo: 'imagem', destaque: false, ordem: 5 },
  { id: 'fb-6', titulo: 'Copa Rio 2024', descricao: '', imagem_url: foto06, tipo: 'imagem', destaque: false, ordem: 6 },
  { id: 'fb-7', titulo: 'Impact MMA 2024', descricao: '', imagem_url: foto07, tipo: 'imagem', destaque: false, ordem: 7 },
  { id: 'fb-8', titulo: 'Torneio Interno', descricao: '', imagem_url: foto08, tipo: 'imagem', destaque: false, ordem: 8 },
]

export default function Galeria() {
  const { fotos: fotosSupabase, loading, error } = useGaleriaFotos()
  const [active, setActive] = useState(null)

  // Se Supabase configurado: sempre lê do banco (mesmo vazio).
  // Senão (dev sem .env): mostra fallback de exemplo.
  const fotos = isSupabaseConfigured && !error ? fotosSupabase : fotosFallback

  const closeLightbox = useCallback(() => setActive(null), [])
  const prevPhoto = useCallback(() => {
    setActive((cur) => (cur === null ? null : (cur - 1 + fotos.length) % fotos.length))
  }, [fotos.length])
  const nextPhoto = useCallback(() => {
    setActive((cur) => (cur === null ? null : (cur + 1) % fotos.length))
  }, [fotos.length])

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, closeLightbox, prevPhoto, nextPhoto])

  // Separar destaque (banner) do restante (grid)
  const fotoDestaque = fotos.find((f) => f.destaque) || fotos[0]
  const fotosGrid = fotoDestaque ? fotos.filter((f) => f.id !== fotoDestaque.id) : fotos

  return (
    <section id="galeria" className="py-20 md:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-eyebrow">Vitórias eternizadas</span>
          <h2 className="section-title">
            <span className="text-alpha-red">Galeria</span> de pódios
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Um registro dos momentos em que o trabalho duro virou medalha. Clique em
            qualquer foto para ampliar.
          </p>
          {isSupabaseConfigured && !error && (
            <a
              href="/admin"
              className="inline-block mt-3 text-xs text-white/30 hover:text-alpha-red transition-colors"
            >
              ✎ Editar galeria (admin)
            </a>
          )}
        </div>

        {loading && fotos.length === 0 && (
          <div className="text-center py-8">
            <div className="inline-block w-6 h-6 border-2 border-alpha-red border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Estado vazio: Supabase configurado mas sem fotos */}
        {fotos.length === 0 && isSupabaseConfigured && !error && (
          <div className="text-center py-12 card-elevated mb-6">
            <p className="text-white/60 mb-1">Nenhuma foto na galeria ainda.</p>
            <p className="text-white/40 text-sm">
              Acesse <a href="/admin" className="text-alpha-red hover:underline">/admin</a> para adicionar a primeira foto.
            </p>
          </div>
        )}

        {/* Foto destaque (banner largo) */}
        {fotoDestaque && (
          <div className="mb-4 md:mb-6">
            <button
              onClick={() => setActive(fotos.indexOf(fotoDestaque))}
              className="group relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl border border-alpha-red/40 hover:border-alpha-red transition-all"
              aria-label={`Ampliar: ${fotoDestaque.titulo}`}
            >
              {fotoDestaque.tipo === 'video' ? (
                <video
                  src={fotoDestaque.imagem_url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={fotoDestaque.imagem_url}
                  alt={fotoDestaque.titulo}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-alpha-black via-alpha-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-left">
                <span className="inline-block px-3 py-1 rounded-full bg-alpha-red text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                  {fotoDestaque.tipo === 'video' ? '▶ Vídeo' : 'Foto oficial'}
                </span>
                <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-white">
                  {fotoDestaque.titulo}
                </h3>
                {fotoDestaque.descricao && (
                  <p className="text-white/70 text-sm mt-1">{fotoDestaque.descricao}</p>
                )}
                <p className="text-white/40 text-xs mt-1">Team Alpha · Kickboxing & MMA</p>
              </div>
            </button>
          </div>
        )}

        {/* Grid: 2 colunas mobile, 4 colunas desktop */}
        {fotosGrid.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {fotosGrid.map((f) => {
              const realIndex = fotos.indexOf(f)
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(realIndex)}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-alpha-black-card border border-alpha-gray-line/60 hover:border-alpha-red/60 transition-all"
                  aria-label={`Ampliar: ${f.titulo}`}
                >
                  {f.tipo === 'video' ? (
                    <video
                      src={f.imagem_url}
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <img
                      src={f.imagem_url}
                      alt={f.titulo}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  {/* Badge de vídeo */}
                  {f.tipo === 'video' && (
                    <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-alpha-black/80 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 z-10">
                      ▶ Vídeo
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-alpha-black via-alpha-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <span className="block text-xs font-semibold uppercase tracking-wider text-alpha-red">
                      Team Alpha
                    </span>
                    <span className="block text-sm text-white font-medium leading-tight truncate">
                      {f.titulo}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-alpha-black/60 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {active !== null && fotos[active] && (
        <div
          className="fixed inset-0 z-[100] bg-alpha-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/5 hover:bg-alpha-red text-white flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto() }}
            className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-alpha-red text-white flex items-center justify-center transition-colors"
            aria-label="Foto anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto() }}
            className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-alpha-red text-white flex items-center justify-center transition-colors"
            aria-label="Próxima foto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <figure
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {fotos[active].tipo === 'video' ? (
              <video
                src={fotos[active].imagem_url}
                controls
                autoPlay
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <img
                src={fotos[active].imagem_url}
                alt={fotos[active].titulo}
                className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              />
            )}
            <figcaption className="mt-4 text-center">
              <span className="block font-display text-2xl uppercase tracking-wide text-alpha-red">
                Team Alpha
              </span>
              <span className="block text-white/80">{fotos[active].titulo}</span>
              {fotos[active].descricao && (
                <span className="block text-white/50 text-sm mt-1">{fotos[active].descricao}</span>
              )}
              <span className="block text-white/40 text-xs mt-1">
                {active + 1} / {fotos.length} · use as setas ← → ou Esc
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}