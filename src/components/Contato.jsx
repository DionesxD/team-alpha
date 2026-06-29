import { useState } from 'react'
import { WHATSAPP, MENSAGENS, whatsappLink } from '../data/contato'

// Mapa da Matriz por padrão (você pode trocar pela URL de qualquer unidade)
const GOOGLE_MAPS_EMBED_URL =
  import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ||
  'https://www.google.com/maps?q=Avenida+Automovel+Clube+2686+Vilar+dos+Teles+Sao+Joao+de+Meriti&output=embed'

const horarios = [
  { dia: 'Matriz (Seg·Qua·Sex)', horario: '08h–09h30 · 14h–15h30' },
  { dia: 'Matriz (Ter·Qui)', horario: '20h30–22h' },
  { dia: 'AcquaClub (Seg·Qua)', horario: '20h–21h30' },
  { dia: 'Ação Esporte (Ter·Qui)', horario: '09h–10h30 · 14h–15h30' },
]

export default function Contato() {
  const [form, setForm] = useState({ nome: '', telefone: '', mensagem: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // Monta a mensagem que será enviada no WhatsApp com os dados do form
  const buildWhatsAppMessage = () => {
    const linhas = [
      'Olá Team Alpha! Gostaria de mais informações.',
      '',
      `*Nome:* ${form.nome || '-'}`,
      `*Telefone:* ${form.telefone || '-'}`,
      `*Mensagem:* ${form.mensagem || '-'}`,
    ]
    return linhas.join('\n')
  }

  const handleWhatsApp = (e) => {
    e.preventDefault()
    // Abre o WhatsApp com a mensagem pré-preenchida (geral)
    window.open(whatsappLink(WHATSAPP.geral, buildWhatsAppMessage()), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contato" className="py-20 md:py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-eyebrow">Estamos te esperando</span>
          <h2 className="section-title">
            <span className="text-alpha-red">Contato</span> e horários
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Tirou dúvida, quer marcar uma aula experimental ou só bater um papo? Preencha
            seus dados e fale com a gente direto no WhatsApp — sem formulário chato,
            sem espera.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário que abre WhatsApp */}
          <div className="p-6 md:p-8 card-elevated">
            <h3 className="font-display text-2xl uppercase tracking-wide mb-2">
              Envie sua mensagem
            </h3>
            <p className="text-white/50 text-xs mb-6 flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-[#25D366]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24z" />
              </svg>
              O botão abaixo abre o WhatsApp com sua mensagem já pronta.
            </p>

            <form onSubmit={handleWhatsApp} className="space-y-4">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold"
                >
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white placeholder:text-white/30 focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold"
                >
                  Telefone / WhatsApp
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  required
                  value={form.telefone}
                  onChange={handleChange}
                  placeholder="(21) 99999-9999"
                  className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white placeholder:text-white/30 focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="mensagem"
                  className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold"
                >
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows="5"
                  value={form.mensagem}
                  onChange={handleChange}
                  placeholder="Qual modalidade você quer? Já treinou antes? Tem algum objetivo específico?"
                  className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white placeholder:text-white/30 focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
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
                Enviar pelo WhatsApp
              </button>

              <p className="text-center text-white/40 text-xs pt-1">
                Não enviamos e-mail. Sua mensagem abre direto no WhatsApp do time.
              </p>
            </form>
          </div>

          {/* Coluna lateral: horários, WhatsApp e mapa */}
          <div className="flex flex-col gap-6">
            {/* Horários */}
            <div className="p-6 md:p-8 card-elevated">
              <h3 className="font-display text-2xl uppercase tracking-wide mb-2 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-alpha-red"
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
                Horários por unidade
              </h3>
              <p className="text-white/50 text-xs mb-4">
                Veja os endereços completos na seção{' '}
                <a
                  href="#unidades"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#unidades')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-alpha-red hover:underline"
                >
                  Unidades
                </a>
                .
              </p>
              <ul className="divide-y divide-alpha-gray-line/40">
                {horarios.map((h) => (
                  <li
                    key={h.dia}
                    className="flex items-center justify-between py-3 text-sm"
                  >
                    <span className="text-white/70 uppercase tracking-wider">
                      {h.dia}
                    </span>
                    <span className="font-semibold text-white">{h.horario}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp geral */}
            <a
              href={whatsappLink(WHATSAPP.geral, MENSAGENS.geral)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/15 border border-[#25D366]/40 hover:border-[#25D366] transition-all group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#25D366] font-semibold">
                  Atendimento geral
                </p>
                <p className="font-display text-xl uppercase tracking-wide text-white group-hover:text-[#25D366] transition-colors">
                  Falar no WhatsApp
                </p>
              </div>
            </a>

            {/* Mapa */}
            <div className="p-2 card-elevated overflow-hidden">
              <iframe
                title="Localização da Team Alpha — Matriz"
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="280"
                style={{ border: 0, borderRadius: '12px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <p className="text-center text-xs text-white/40 px-4 py-3">
                Mostrando a <strong className="text-white/60">Unidade Matriz</strong> (Av. Automóvel Clube, 2686 — Vilar dos Teles).
                Para as outras unidades, veja a seção acima.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
