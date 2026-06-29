import { WHATSAPP, MENSAGENS, whatsappLink } from '../data/contato'
import perfilThiago from '../assets/perfil-thiago.jpg'

export default function Professores() {
  return (
    <section id="professores" className="py-20 md:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-eyebrow">Quem te treina</span>
          <h2 className="section-title">
            O <span className="text-alpha-red">professor</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            À frente de todas as turmas da Team Alpha, um nome de peso — com experiência
            comprovada em ringue e a obsessão de fazer você evoluir todos os dias.
          </p>
        </div>

        {/* Card principal do professor — layout 2 colunas no desktop */}
        <article className="group relative max-w-5xl mx-auto p-8 md:p-12 card-elevated hover:border-alpha-red/60 transition-all duration-300 overflow-hidden">
          {/* glow vermelho no hover */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-alpha-red/0 group-hover:bg-alpha-red/10 blur-3xl transition-all duration-500 pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
            {/* Foto de perfil do Thiago (substitui avatar com iniciais) */}
            <div className="mx-auto md:mx-0 w-40 h-40 md:w-48 md:h-48 shrink-0 relative">
              {/* Glow vermelho atrás da foto */}
              <div className="absolute -inset-2 bg-alpha-red/20 blur-2xl rounded-2xl pointer-events-none" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-alpha-red shadow-lg shadow-alpha-red/30">
                <img
                  src={perfilThiago}
                  alt="Prof. Treinador Thiago Barbudo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Faixa decorativa no topo da foto */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-alpha-red" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-alpha-red/15 text-alpha-red text-xs font-bold uppercase tracking-wider mb-3">
                Mestre · Professor
              </span>
              <h3 className="font-display text-4xl md:text-5xl uppercase tracking-wide leading-none mb-2">
                Thiago <span className="text-alpha-red">Barbudo</span>
              </h3>
              <p className="text-alpha-red font-semibold text-sm uppercase tracking-wider mb-5">
                Kickboxing · Luta Livre · MMA · Muay Thai · Boxe
              </p>

              <p className="text-white/75 leading-relaxed mb-7 max-w-2xl">
                Atleta e treinador com ampla experiência em ringue e competições nacionais.
                Forma lutadores completos — do chão à trocação — com metodologia focada em
                base técnica, condicionamento e inteligência de luta. Treina desde
                iniciantes buscando uma vida mais saudável até atletas de competição,
                sempre com foco em técnica, distância, timing e estratégia.
              </p>

              {/* Lista de diferenciais */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7 max-w-2xl">
                {[
                  'Kickboxing (trocação e ringue)',
                  'MMA (chão, quedas e trocação)',
                  'Muay Thai e Boxe',
                  'Metodologia para iniciantes e atletas',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-alpha-red mt-0.5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink(WHATSAPP.thiago, MENSAGENS.thiago)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] font-semibold text-sm uppercase tracking-wider transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Falar com Thiago
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

