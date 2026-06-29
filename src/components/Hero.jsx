import treinadorDesktop from '../assets/hero-treinador.jpg'
import treinadorMobile from '../assets/hero-treinador-mobile.jpg'

export default function Hero() {
  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="topo"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Fundo: preto profundo */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />

      {/* Glow vermelho sutil no fundo (decorativo, atrás de tudo) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-alpha-red/12 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/4 w-[400px] h-[400px] rounded-full bg-alpha-red/8 blur-[100px]" />
      </div>

      {/* Padrão de hexágonos decorativo */}
      <div className="absolute inset-0 pointer-events-none bg-hex-pattern opacity-30" />

      {/* Container principal: 2 colunas no desktop, 1 coluna no mobile */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* === COLUNA ESQUERDA: Texto + CTAs === */}
          <div className="max-w-2xl order-2 lg:order-1">
            <span className="section-eyebrow animate-fade-in">
              Artes Marciais · Luta Livre · MMA · Kickboxing
            </span>

            <h1 className="font-display text-[2.5rem] leading-[1] sm:text-7xl lg:text-8xl uppercase tracking-wide mb-6 animate-slide-up">
              Um novo time.
              <br />
              <span className="text-alpha-red">A mesma garra</span>
              <br />
              campeã.
            </h1>

            <p className="text-base sm:text-xl text-white/70 max-w-2xl mb-8 sm:mb-10 leading-relaxed animate-slide-up">
              <strong className="text-white">150+ alunos.</strong>{' '}
              <strong className="text-white">3 unidades.</strong>{' '}
              <strong className="text-white">Resultados reais.</strong> Treine na Team Alpha e
              descubra o lutador que existe em você.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <a
                href="#planos"
                onClick={(e) => scrollTo(e, '#planos')}
                className="btn-primary text-base"
              >
                Treinar agora
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#conquistas"
                onClick={(e) => scrollTo(e, '#conquistas')}
                className="btn-ghost text-base"
              >
                Ver conquistas
              </a>
            </div>
          </div>

          {/* === COLUNA DIREITA: Imagem do treinador === */}
          <div className="relative order-1 lg:order-2 animate-fade-in">
            {/* Glow vermelho atrás da imagem */}
            <div className="absolute -inset-4 sm:-inset-6 bg-alpha-red/15 blur-3xl rounded-3xl pointer-events-none" />

            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden border-2 border-alpha-red/30 shadow-2xl shadow-alpha-red/20">
              {/* Imagem desktop (landscape com personagem + nome à direita) */}
              <img
                src={treinadorDesktop}
                alt="Prof. Thiago Barbudo — Treinador de Kickboxing da Team Alpha"
                className="hidden sm:block w-full h-full object-cover object-center"
                loading="eager"
              />
              {/* Imagem mobile (portrait com personagem + nome) */}
              <img
                src={treinadorMobile}
                alt="Prof. Thiago Barbudo — Treinador de Kickboxing da Team Alpha"
                className="sm:hidden w-full h-full object-cover object-top"
                loading="eager"
              />

              {/* Overlay gradiente para mesclar com o fundo escuro do site */}
              <div className="absolute inset-0 bg-gradient-to-t from-alpha-black/80 via-transparent to-alpha-black/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-alpha-black/40 via-transparent to-transparent" />

              {/* Faixa decorativa vermelha no topo */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-alpha-red via-alpha-red-dark to-alpha-red" />

              {/* Etiqueta com nome do professor no canto SUPERIOR ESQUERDO */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <div className="inline-flex flex-col bg-alpha-black/85 backdrop-blur-md border border-alpha-red/50 rounded-lg px-4 py-2.5 sm:px-5 sm:py-3 shadow-lg">
                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-alpha-red font-semibold mb-0.5">
                    Prof. Treinador
                  </span>
                  <span className="font-display text-lg sm:text-2xl uppercase tracking-wide text-white leading-none">
                    Thiago Barbudo
                  </span>
                  <span className="text-[10px] sm:text-xs text-white/60 mt-0.5">
                    Kickboxing · MMA
                  </span>
                </div>
              </div>
            </div>

            {/* Detalhe decorativo: número/badge no canto */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-alpha-red border-4 border-alpha-black flex items-center justify-center shadow-lg shadow-alpha-red/40 z-10">
              <span className="font-display text-xl sm:text-2xl text-white leading-none">150+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll (apenas desktop) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
