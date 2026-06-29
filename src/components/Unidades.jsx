import { unidades } from '../data/unidades'
import { whatsappLink } from '../data/contato'

export default function Unidades() {
  return (
    <section id="unidades" className="py-20 md:py-28 bg-[#0f0f0f] border-y border-alpha-gray-line/40 relative overflow-hidden">
      {/* Glow vermelho sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-alpha-red/6 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-eyebrow">Onde treinar</span>
          <h2 className="section-title">
            Nossas <span className="text-alpha-red">unidades</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Três endereços para você treinar perto de casa ou do trabalho. Mesma estrutura,
            mesmo professor, mesma garra campeã.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unidades.map((u) => (
            <article
              key={u.id}
              className={`group relative flex flex-col p-6 card-elevated transition-all duration-300 hover:-translate-y-1 ${
                u.destaque ? 'border-alpha-red/60 lg:scale-[1.02]' : 'hover:border-alpha-red/50'
              }`}
            >
              {/* Badge de destaque */}
              {u.destaque && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-alpha-red text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-alpha-red/30">
                  ★ Matriz
                </span>
              )}

              {/* Cabeçalho com nome da unidade */}
              <div className="mb-4">
                <h3 className="font-display text-3xl uppercase tracking-wide leading-none mb-1">
                  {u.apelido}
                </h3>
                <p className="text-white/50 text-xs uppercase tracking-wider">
                  {u.nome}
                </p>
              </div>

              {/* Endereço */}
              <div className="mb-4 flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-alpha-red mt-0.5 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="text-sm">
                  <p className="text-white/80 leading-snug">{u.endereco}</p>
                  <p className="text-white/50 text-xs mt-0.5">{u.cidade}</p>
                </div>
              </div>

              {/* Horário (pode ter múltiplos turnos) */}
              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-[0.25em] text-alpha-red font-semibold mb-2 flex items-center gap-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Horários
                </p>
                <ul className="space-y-1.5">
                  {u.horarios.map((h, idx) => (
                    <li key={idx} className="text-sm">
                      <span className="text-white/60 text-xs uppercase tracking-wider block">
                        {h.dias}
                      </span>
                      <span className="text-white/85">{h.horario}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modalidades */}
              <div className="mb-5">
                <p className="text-[10px] uppercase tracking-[0.25em] text-alpha-red font-semibold mb-2">
                  Modalidades
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {u.modalidades.map((m) => (
                    <span
                      key={m}
                      className="inline-block px-2.5 py-1 rounded-full bg-alpha-black/60 border border-alpha-gray-line/60 text-xs text-white/70"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini mapa */}
              <div className="mb-5 rounded-lg overflow-hidden border border-alpha-gray-line/40 aspect-[16/9]">
                <iframe
                  title={`Mapa — ${u.nome}`}
                  src={u.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '120px' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* CTAs: Como chegar + WhatsApp */}
              <div className="mt-auto grid grid-cols-2 gap-2">
                <a
                  href={u.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-md bg-alpha-red/10 hover:bg-alpha-red/20 text-alpha-red border border-alpha-red/40 hover:border-alpha-red font-semibold text-[11px] uppercase tracking-wider transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Como chegar
                </a>
                <a
                  href={whatsappLink(u.whatsapp, `Olá Team Alpha! Tenho interesse em conhecer a unidade ${u.apelido}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-md bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 hover:border-[#25D366] font-semibold text-[11px] uppercase tracking-wider transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-white/40 text-sm mt-8">
          Não encontrou uma unidade perto de você?{' '}
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="text-alpha-red hover:underline"
          >
            Fale com a gente
          </a>{' '}
          — estamos sempre expandindo.
        </p>
      </div>
    </section>
  )
}
