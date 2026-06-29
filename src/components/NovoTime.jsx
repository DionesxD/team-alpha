export default function NovoTime() {
  return (
    <section id="time" className="py-16 md:py-28 bg-transparent relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative border border-alpha-red/30 rounded-2xl p-5 sm:p-10 md:p-12 card-elevated overflow-hidden">
          {/* Detalhe vermelho no canto */}
          <div className="absolute top-0 left-0 w-2 h-full bg-alpha-red" />
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-alpha-red/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Ícone de destaque */}
            <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-alpha-red/15 border border-alpha-red/30 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-alpha-red"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h7v8l10-12h-7z" />
              </svg>
            </div>

            <div className="flex-1">
              <span className="section-eyebrow">Um novo capítulo</span>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl uppercase leading-none mb-5">
                O fim de um ciclo. <br />
                <span className="text-alpha-red">O começo de uma nova era.</span>
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-white/75 leading-relaxed max-w-3xl">
                <p>
                  A Team Alpha nasce da experiência de anos de tatame e ringue. Depois de uma
                  longa trajetória na academia anterior, o professor Thiago Barbudo decidiu
                  unir forças em um projeto próprio — feito por lutador, para lutadores. Aqui, o
                  aluno não é apenas mais um número: é parte de um time que treina junto, vence
                  junto e cresce junto.
                </p>
                <p>
                  Mantemos a mesma garra que nos trouxe até aqui, mas com um novo nome, uma nova
                  casa e um novo compromisso: formar campeões dentro e fora das competições.
                  Hoje contamos com 3 unidades espalhadas pela cidade para você treinar onde
                  for mais conveniente — sempre com a mesma metodologia, a mesma energia e o
                  mesmo cuidado com cada aluno.
                </p>
                <p className="text-white font-semibold">
                  Bem-vindo à nova era da Team Alpha. {' '}
                  <span className="text-alpha-red">A garra continua a mesma.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
