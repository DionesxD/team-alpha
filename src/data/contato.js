// src/data/contato.js
// ============================================================
// Configurações centralizadas de contato da Team Alpha.
// Altere os números de WhatsApp aqui UMA vez e todos os
// componentes (Navbar, Professores, Planos, Contato,
// WhatsAppFloat) passam a usar os novos valores.
// ============================================================

// Números de WhatsApp — formato: DDI + DDD + número (apenas dígitos).
// Exemplo Brasil: 55 (DDI) + 21 (DDD) + 999999999 = '5521999999999'
// TODO: substitua pelos números reais do time.
export const WHATSAPP = {
  thiago: '5521966956173',   // Prof. Treinador Thiago Barbudo (Kickboxing / MMA)
  geral: '5521966956173',    // Atendimento geral do time
}

// Mensagens pré-preenchidas para cada contexto de contato.
export const MENSAGENS = {
  thiago: 'Olá Mestre Thiago, tenho interesse em treinar na Team Alpha!',
  geral: 'Olá Team Alpha! Gostaria de mais informações sobre as aulas.',
  unidade: (nome) => `Olá Team Alpha! Tenho interesse em conhecer a unidade ${nome}.`,
}

// Redes sociais da Team Alpha.
export const REDES_SOCIAIS = {
  instagram: 'https://instagram.com/treinadorbarbudo_oficial',
  // YouTube: não há canal oficial no momento.
}

// Helper: monta o link wa.me com mensagem pré-preenchida.
export function whatsappLink(numero, mensagem) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}
