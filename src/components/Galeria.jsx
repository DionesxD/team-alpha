import { useState, useCallback, useEffect } from 'react'

// Importa as imagens locais — adicione mais conforme tiver fotos reais.
import fotoReal from '../assets/galeria/foto-real-equipe.jpg'
import foto01 from '../assets/galeria/foto-01.jpg'
import foto02 from '../assets/galeria/foto-02.jpg'
import foto03 from '../assets/galeria/foto-03.jpg'
import foto04 from '../assets/galeria/foto-04.jpg'
import foto05 from '../assets/galeria/foto-05.jpg'
import foto06 from '../assets/galeria/foto-06.jpg'
import foto07 from '../assets/galeria/foto-07.jpg'
import foto08 from '../assets/galeria/foto-08.jpg'

const fotos = [
  { src: fotoReal, titulo: 'Camisa oficial Team Alpha', alt: 'Camisa oficial do time Team Alpha com logo do urso', destaque: true },
  { src: foto01, titulo: 'Campeonato Brasileiro de Kickboxing 2026', alt: 'Mestre com os premios' },
  { src: foto02, titulo: 'Copa Carioca de Kickboxing 2026', alt: 'Ringue copa carioca 2026' },
  { src: foto03, titulo: 'UTC', alt: 'UTC' },
  { src: foto04, titulo: 'Adicionar imagem', alt: 'Luta de MMA na Fight Night Alpha' },
  { src: foto05, titulo: 'Adicionar imagem', alt: 'Competidor no Open Rio de Kickboxing 2023' },
  { src: foto06, titulo: 'Adicionar imagem', alt: 'Aluno em ação na Copa Rio 2024' },
  { src: foto07, titulo: 'Adicionar imagem', alt: 'Lutador no Impact MMA Championship 2024' },
  { src: foto08, titulo: 'Adicionar imagem', alt: 'Torneio interno da Team Alpha' },
]

export default function Galeria() {
  const [active, setActive] = useState(null) // índice da foto aberta no lightbox

  const closeLightbox = useCallback(() => setActive(null), [])
  const prevPhoto = useCallback(() => {
    setActive((cur) => (cur === null ? null : (cur - 1 + fotos.length) % fotos.length))
  }, [])
  const nextPhoto = useCallback(() => {
    setActive((cur) => (cur === null ? null : (cur + 1) % fotos.length))
  }, [])

  // navegação por teclado dentro do lightbox
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

  return (
    <section id="galeria" className="py-20 md:py-28 bg-alpha-black">
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
        </div>

        {/* Foto real em destaque (banner largo) */}
        <div className="mb-4 md:mb-6">
          <button
            onClick={() => setActive(0)}
            className="group relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl border border-alpha-red/40 hover:border-alpha-red transition-all"
            aria-label={`Ampliar foto: ${fotos[0].titulo}`}
          >
            <img
              src={fotos[0].src}
              alt={fotos[0].alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-alpha-black via-alpha-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-alpha-red text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                Foto oficial
              </span>
              <h3 className="font-display text-3xl md:text-4xl uppercase tracking-wide text-white">
                {fotos[0].titulo}
              </h3>
              <p className="text-white/70 text-sm mt-1">Team Alpha · Kickboxing & MMA</p>
            </div>
          </button>
        </div>

        {/* Grid: 2 colunas mobile, 4 colunas desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {fotos.slice(1).map((f, i) => (
            <button
              key={i}
              onClick={() => setActive(i + 1)}
              className="group relative aspect-square overflow-hidden rounded-lg bg-alpha-black-card border border-alpha-gray-line/60 hover:border-alpha-red/60 transition-all"
              aria-label={`Ampliar foto: ${f.titulo}`}
            >
              <img
                src={f.src}
                alt={f.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* overlay com o título */}
              <div className="absolute inset-0 bg-gradient-to-t from-alpha-black via-alpha-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <span className="block text-xs font-semibold uppercase tracking-wider text-alpha-red">
                  Team Alpha
                </span>
                <span className="block text-sm text-white font-medium leading-tight">
                  {f.titulo}
                </span>
              </div>
              {/* ícone de expandir */}
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
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-alpha-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Botão fechar */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/5 hover:bg-alpha-red text-white flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Botão anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevPhoto()
            }}
            className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-alpha-red text-white flex items-center justify-center transition-colors"
            aria-label="Foto anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Botão próxima */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextPhoto()
            }}
            className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-alpha-red text-white flex items-center justify-center transition-colors"
            aria-label="Próxima foto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Imagem ampliada */}
          <figure
            className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fotos[active].src}
              alt={fotos[active].alt}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
            />
            <figcaption className="mt-4 text-center">
              <span className="block font-display text-2xl uppercase tracking-wide text-alpha-red">
                Team Alpha
              </span>
              <span className="block text-white/80">{fotos[active].titulo}</span>
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
