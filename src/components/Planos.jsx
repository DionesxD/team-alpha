import { WHATSAPP, MENSAGENS, whatsappLink } from '../data/contato'

const planos = [
  {
    id: 'kickboxing',
    modalidade: 'Kickboxing',
    descricao:
      'Aulas focadas em trocação, footwork, defesa e estratégia de ringue. Do iniciante ao competidor.',
    horarios: 'Horário a agendar',
    whatsapp: WHATSAPP.thiago,
    mensagem: MENSAGENS.thiago,
    accent: 'from-alpha-red to-alpha-red-dark',
  },
  {
    id: 'kickboxing-mma-competicoes',
    modalidade: 'Kickboxing / MMA',
    subtitulo: 'Voltado para Competições',
    descricao:
      'Treino avançado combinando kickboxing e MMA, com foco em preparação para competições. Condicionamento de alto nível, técnica apurada e estratégia de luta.',
    horarios: 'Horário a agendar',
    whatsapp: WHATSAPP.thiago,
    mensagem: 'Olá Thiago, tenho interesse no treino de Kickboxing/MMA voltado para competições!',
    accent: 'from-alpha-red to-alpha-red-dark',
  },
]

export default function Planos() {
  return (
    <section id="planos" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
      {/* Glow vermelho central sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-alpha-red/6 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-eyebrow">Comece hoje</span>
          <h2 className="section-title">
            Escolha sua <span className="text-alpha-red">modalidade</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Sem tabela de preços escondida. Escolha a modalidade e fale direto com o
            professor Thiago pelo WhatsApp — ele vai montar o melhor plano para você.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {planos.map((p) => (
            <article
              key={p.id}
              className="relative p-8 md:p-10 card-elevated hover:border-alpha-red/60 transition-all duration-300 flex flex-col"
            >
              {/* faixa de cor no topo */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.accent} rounded-t-2xl`} />

              <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-alpha-red/10 text-alpha-red text-xs font-bold uppercase tracking-wider mb-4">
                  Modalidade
                </span>
                <h3 className="font-display text-4xl md:text-5xl uppercase tracking-wide leading-none mb-1">
                  {p.modalidade}
                </h3>
                {p.subtitulo && (
                  <p className="text-alpha-red font-semibold text-sm uppercase tracking-wider mb-2">
                    {p.subtitulo}
                  </p>
                )}
                <p className="text-white/60 text-sm">
                  Professor: <span className="text-white font-semibold">Thiago Barbudo</span>
                </p>
              </div>

              <p className="text-white/75 leading-relaxed mb-6 flex-1">
                {p.descricao}
              </p>

              <div className="mb-7 p-4 rounded-lg bg-alpha-black/60 border border-alpha-gray-line/40">
                <p className="text-[10px] uppercase tracking-[0.25em] text-alpha-red font-semibold mb-1">
                  Horários
                </p>
                <p className="text-white/80 text-sm">{p.horarios}</p>
              </div>

              <a
                href={whatsappLink(p.whatsapp, p.mensagem)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-md bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#25D366]/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Falar no WhatsApp
              </a>
            </article>
          ))}
        </div>

        <p className="text-center text-white/40 text-sm mt-8">
          Primeira aula experimental gratuita · Vagas limitadas por turma
        </p>
      </div>
    </section>
  )
}
