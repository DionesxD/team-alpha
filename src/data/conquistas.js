// src/data/conquistas.js
// ============================================================
// Conquistas reais do Prof. Treinador Thiago Barbudo e alunos da Team Alpha.
// Estrutura: um card por campeonato, podendo ter múltiplas medalhas.
//   id          — identificador único
//   campeonato  — nome do campeonato
//   modalidade  — 'Kickboxing' | 'MMA' | 'Muay Thai' | 'Boxe' | 'Interno'
//   destino     — 'Profissional' | 'Amador' | 'Interno' (filtro opcional)
//   medalhas    — array de { medalha: '🥇'|'🥈'|'🥉', vezes: number, descricao: string }
// ============================================================

export const conquistas = [
  // ===== MMA =====
  {
    id: 1,
    campeonato: 'Jungle Fight',
    modalidade: 'MMA',
    medalhas: [
      { medalha: '🥇', vezes: 4, descricao: '4x Campeão' },
    ],
  },
  {
    id: 2,
    campeonato: 'America Fight',
    modalidade: 'MMA',
    medalhas: [
      { medalha: '🥇', vezes: 2, descricao: '2x Campeão' },
    ],
  },
  {
    id: 3,
    campeonato: 'WOCS MMA',
    modalidade: 'MMA',
    medalhas: [
      { medalha: '🥈', vezes: 1, descricao: '1x Vice-Campeão' },
    ],
  },
  {
    id: 4,
    campeonato: 'Power Fight MMA',
    modalidade: 'MMA',
    medalhas: [
      { medalha: '🏆', vezes: 1, descricao: 'Participação de destaque' },
    ],
  },
  {
    id: 5,
    campeonato: 'Arena Global',
    modalidade: 'MMA',
    medalhas: [
      { medalha: '🥈', vezes: 1, descricao: '1x Vice-Campeão' },
    ],
  },
  {
    id: 6,
    campeonato: 'Rio Challenger',
    modalidade: 'MMA',
    medalhas: [
      { medalha: '🥇', vezes: 1, descricao: '1x Campeão' },
    ],
  },

  // ===== Kickboxing =====
  {
    id: 7,
    campeonato: 'Mundial de Kickboxing',
    modalidade: 'Kickboxing',
    medalhas: [
      { medalha: '🥉', vezes: 1, descricao: '1x 3º Lugar' },
    ],
  },
  {
    id: 8,
    campeonato: 'Estadual de Kickboxing',
    modalidade: 'Kickboxing',
    medalhas: [
      { medalha: '🥇', vezes: 5, descricao: '5x Campeão' },
      { medalha: '🥈', vezes: 4, descricao: '4x Vice-Campeão' },
    ],
  },
  {
    id: 9,
    campeonato: 'Intermunicipal',
    modalidade: 'Kickboxing',
    medalhas: [
      { medalha: '🥇', vezes: 3, descricao: '3x Campeão' },
      { medalha: '🥈', vezes: 2, descricao: '2x Vice-Campeão' },
    ],
  },
  {
    id: 10,
    campeonato: 'Copa Brasil de Kickboxing',
    modalidade: 'Kickboxing',
    medalhas: [
      { medalha: '🥇', vezes: 1, descricao: '1x Campeão' },
      { medalha: '🥈', vezes: 1, descricao: '1x Vice-Campeão' },
    ],
  },
  {
    id: 11,
    campeonato: 'Brasileiro de Kickboxing',
    modalidade: 'Kickboxing',
    medalhas: [
      { medalha: '🥈', vezes: 1, descricao: '1x Vice-Campeão' },
    ],
  },
  {
    id: 12,
    campeonato: 'Taça Guanabara de Kickboxing',
    modalidade: 'Kickboxing',
    medalhas: [
      { medalha: '🥇', vezes: 4, descricao: '4x Campeão' },
      { medalha: '🥈', vezes: 3, descricao: '3x Vice-Campeão' },
    ],
  },
  {
    id: 13,
    campeonato: 'Taça Rio de Kickboxing',
    modalidade: 'Kickboxing',
    medalhas: [
      { medalha: '🥇', vezes: 1, descricao: '1x Campeão' },
    ],
  },
  {
    id: 14,
    campeonato: 'Copa Carioca de Kickboxing',
    modalidade: 'Kickboxing',
    medalhas: [
      { medalha: '🥇', vezes: 2, descricao: '2x Campeão' },
      { medalha: '🥉', vezes: 1, descricao: '1x 3º Lugar' },
    ],
  },

  // ===== Muay Thai =====
  {
    id: 15,
    campeonato: 'Campeonato Estadual de Muay Thai',
    modalidade: 'Muay Thai',
    medalhas: [
      { medalha: '🥇', vezes: 1, descricao: '1x Campeão' },
    ],
  },
  {
    id: 16,
    campeonato: 'Empire Of Stadium Muay Thai',
    modalidade: 'Muay Thai',
    medalhas: [
      { medalha: '🥇', vezes: 1, descricao: '1x Campeão' },
    ],
  },
  {
    id: 17,
    campeonato: 'UTC Muay Thai',
    modalidade: 'Muay Thai',
    medalhas: [
      { medalha: '🥇', vezes: 2, descricao: '2x Campeão' },
      { medalha: '🥈', vezes: 1, descricao: '1x Vice-Campeão' },
    ],
  },

  // ===== Boxe =====
  {
    id: 18,
    campeonato: 'Boxe de Praia',
    modalidade: 'Boxe',
    medalhas: [
      { medalha: '🥇', vezes: 1, descricao: '1x Campeão' },
      { medalha: '🥈', vezes: 2, descricao: '2x Vice-Campeão' },
    ],
  },
  {
    id: 19,
    campeonato: 'Boxe',
    modalidade: 'Boxe',
    medalhas: [
      { medalha: '🥈', vezes: 2, descricao: '2x Vice-Campeão' },
    ],
  },

  // ===== Campeonatos Internos =====
  {
    id: 20,
    campeonato: 'Campeonato Interno — 1ª Edição',
    modalidade: 'Interno',
    medalhas: [
      { medalha: '🥈', vezes: 1, descricao: 'Vice-Campeão' },
    ],
  },
  {
    id: 21,
    campeonato: 'Campeonato Interno — 2ª Edição',
    modalidade: 'Interno',
    medalhas: [
      { medalha: '🥉', vezes: 1, descricao: '3º Lugar' },
    ],
  },
  {
    id: 22,
    campeonato: 'Campeonato Interno — 3ª Edição',
    modalidade: 'Interno',
    medalhas: [
      { medalha: '🥇', vezes: 1, descricao: 'Campeão' },
    ],
  },
  {
    id: 23,
    campeonato: 'Campeonato Interno — 4ª Edição',
    modalidade: 'Interno',
    medalhas: [
      { medalha: '🥇', vezes: 1, descricao: 'Campeão' },
    ],
  },
  {
    id: 24,
    campeonato: 'Campeonato Interno — 5ª Edição',
    modalidade: 'Interno',
    medalhas: [
      { medalha: '🥇', vezes: 1, descricao: 'Campeão' },
    ],
  },
]

export const modalidades = ['Todas', 'Kickboxing', 'MMA', 'Muay Thai', 'Boxe', 'Interno']

// Totais agregados (para exibição em destaque, se desejar)
export const totalConquistas = conquistas.reduce(
  (acc, c) => {
    c.medalhas.forEach((m) => {
      acc.total += m.vezes
      if (m.medalha === '🥇') acc.ouro += m.vezes
      if (m.medalha === '🥈') acc.prata += m.vezes
      if (m.medalha === '🥉') acc.bronze += m.vezes
    })
    return acc
  },
  { total: 0, ouro: 0, prata: 0, bronze: 0 }
)
