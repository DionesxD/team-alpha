const stats = [
  {
    value: '150+',
    label: 'Alunos ativos',
    sub: 'treinando hoje na Team Alpha',
  },
  {
    value: '3',
    label: 'Unidades',
    sub: 'Matriz · Centro · Zona Sul',
  },
  {
    value: '20+',
    label: 'Títulos conquistados',
    sub: 'pódios em campeonatos regionais e nacionais',
  },
]

export default function Numeros() {
  return (
    <section className="py-16 md:py-20 bg-[#0f0f0f] border-y border-alpha-gray-line/40 relative overflow-hidden">
      {/* Glow vermelho sutil no centro */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-alpha-red/5 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative p-8 card-elevated hover:border-alpha-red/50 transition-colors group"
            >
              {/* detalhe superior vermelho */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-alpha-red/0 via-alpha-red to-alpha-red/0 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="font-display text-6xl md:text-7xl text-alpha-red leading-none mb-3">
                {s.value}
              </div>
              <div className="font-display text-xl uppercase tracking-wider text-white mb-1">
                {s.label}
              </div>
              <p className="text-sm text-white/55 leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
