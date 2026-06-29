import { useState, useMemo } from 'react'
import { conquistas, modalidades, totalConquistas } from '../data/conquistas'

const medalhaStyles = {
  '🥇': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/40',
  '🥈': 'bg-gray-400/15 text-gray-300 border-gray-400/40',
  '🥉': 'bg-orange-700/15 text-orange-500 border-orange-700/40',
  '🏆': 'bg-alpha-red/15 text-alpha-red border-alpha-red/40',
}

const modalidadeCores = {
  'Kickboxing': 'bg-alpha-red/15 text-alpha-red border-alpha-red/40',
  'MMA': 'bg-purple-500/15 text-purple-400 border-purple-500/40',
  'Muay Thai': 'bg-orange-600/15 text-orange-400 border-orange-600/40',
  'Boxe': 'bg-blue-500/15 text-blue-400 border-blue-500/40',
  'Interno': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
}

function MedalhaBadge({ medalha, vezes }) {
  return (
    <span
      className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
        medalhaStyles[medalha] || medalhaStyles['🏆']
      }`}
    >
      <span className="text-base leading-none">{medalha}</span>
      <span>{vezes}x</span>
    </span>
  )
}

export default function Conquistas() {
  const [filtro, setFiltro] = useState('Todas')

  const lista = useMemo(() => {
    if (filtro === 'Todas') return conquistas
    return conquistas.filter((c) => c.modalidade === filtro)
  }, [filtro])

  return (
    <section
      id="conquistas"
      className="py-20 md:py-28 bg-[#0f0f0f] border-y border-alpha-gray-line/40 relative overflow-hidden"
    >
      {/* Padrão de carbono sutil no fundo */}
      <div className="absolute inset-0 bg-carbon opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="section-eyebrow">Resultados falam por si</span>
          <h2 className="section-title">
            Nossas <span className="text-alpha-red">conquistas</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Cada pódio é o resultado de horas de treino, disciplina e dedicação. Conheça
            os campeonatos onde o Prof. Thiago Barbudo e os alunos da Team Alpha brilharam.
          </p>
        </div>

        {/* Resumo agregado: total + ouro + prata + bronze */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
          <div className="text-center p-3 rounded-lg bg-alpha-black/40 border border-alpha-gray-line/40">
            <div className="font-display text-3xl text-white">{totalConquistas.total}</div>
            <div className="text-[10px] uppercase tracking-wider text-white/50">Pódios</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
            <div className="font-display text-3xl text-yellow-400">{totalConquistas.ouro}</div>
            <div className="text-[10px] uppercase tracking-wider text-yellow-400/70">🥇 Ouro</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-400/10 border border-gray-400/30">
            <div className="font-display text-3xl text-gray-300">{totalConquistas.prata}</div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400/70">🥈 Prata</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-orange-700/10 border border-orange-700/30">
            <div className="font-display text-3xl text-orange-500">{totalConquistas.bronze}</div>
            <div className="text-[10px] uppercase tracking-wider text-orange-500/70">🥉 Bronze</div>
          </div>
        </div>

        {/* Tabs de filtro */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {modalidades.map((m) => (
            <button
              key={m}
              onClick={() => setFiltro(m)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 border ${
                filtro === m
                  ? 'bg-alpha-red border-alpha-red text-white shadow-lg shadow-alpha-red/20'
                  : 'bg-transparent border-alpha-gray-line text-white/70 hover:text-alpha-red hover:border-alpha-red/50'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Grid de conquistas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {lista.map((c) => (
            <article
              key={c.id}
              className="group p-5 sm:p-6 rounded-xl card-elevated hover:border-alpha-red/50 transition-all duration-200 hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <h3 className="font-display text-lg sm:text-xl uppercase tracking-wide leading-tight text-white">
                  {c.campeonato}
                </h3>
                <span
                  className={`shrink-0 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                    modalidadeCores[c.modalidade] || modalidadeCores['Kickboxing']
                  }`}
                >
                  {c.modalidade}
                </span>
              </div>

              {/* Lista de medalhas */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {c.medalhas.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <MedalhaBadge medalha={m.medalha} vezes={m.vezes} />
                  </div>
                ))}
              </div>

              {/* Descrição das colocações */}
              <div className="mt-4 pt-3 border-t border-alpha-gray-line/40 space-y-1">
                {c.medalhas.map((m, idx) => (
                  <p key={idx} className="text-xs text-white/60 flex items-center gap-1.5">
                    <span className="text-sm">{m.medalha}</span>
                    <span>{m.descricao}</span>
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {lista.length === 0 && (
          <p className="text-center text-white/50 py-12">
            Nenhuma conquista cadastrada para este filtro ainda.
          </p>
        )}
      </div>
    </section>
  )
}
