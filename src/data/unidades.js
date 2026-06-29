// src/data/unidades.js
// ============================================================
// Unidades reais da Team Alpha.
// Os mapsEmbed usam o endereço como query (funciona sem API key).
// Se quiser um embed mais preciso, pegue o iframe no Google Maps:
//   → Abrir o endereço no Google Maps
//   → Compartilhar → Incorporar mapa → copiar a URL do src
//   → Substituir o mapsEmbed abaixo
// ============================================================

export const unidades = [
  {
    id: 'matriz',
    nome: 'Unidade Matriz',
    apelido: 'Matriz',
    endereco: 'Av. Automóvel Clube, 2686 — Vilar dos Teles',
    cidade: 'São João de Meriti — RJ',
    horarios: [
      { dias: 'Seg · Qua · Sex', horario: '08h às 09h30  ·  14h às 15h30' },
      { dias: 'Ter · Qui', horario: '20h30 às 22h' },
    ],
    modalidades: ['Kickboxing', 'MMA', 'Muay Thai', 'Boxe'],
    destaque: true,
    whatsapp: '5521999999999', // TODO: WHATSAPP_UNIDADE_MATRIZ
    mapsEmbed: 'https://www.google.com/maps?q=Avenida+Automovel+Clube+2686+Vilar+dos+Teles+Sao+Joao+de+Meriti&output=embed',
    mapsLink: 'https://maps.app.goo.gl/Qbga2osmDqtCt4ow5',
  },
  {
    id: 'acqua-club',
    nome: 'Unidade AcquaClub',
    apelido: 'AcquaClub',
    endereco: 'Avenida Covancá, 58',
    cidade: 'Rio de Janeiro — RJ',
    horarios: [
      { dias: 'Seg · Qua', horario: '20h às 21h30' },
    ],
    modalidades: ['Kickboxing', 'MMA'],
    destaque: false,
    whatsapp: '5521999999999', // TODO: WHATSAPP_UNIDADE_ACQUA
    mapsEmbed: 'https://www.google.com/maps?q=Avenida+Covanca+58+Rio+de+Janeiro&output=embed',
    mapsLink: 'https://maps.app.goo.gl/se2o4rpjBfrhBykr6',
  },
  {
    id: 'acao-esporte',
    nome: 'Academia Ação Esporte',
    apelido: 'Ação Esporte',
    endereco: 'R. Moacir Saraíva de Carvalho, 59',
    cidade: 'Rio de Janeiro — RJ',
    horarios: [
      { dias: 'Ter · Qui', horario: '09h às 10h30  ·  14h às 15h30' },
    ],
    modalidades: ['Kickboxing', 'Muay Thai'],
    destaque: false,
    whatsapp: '5521999999999', // TODO: WHATSAPP_UNIDADE_ACAO
    mapsEmbed: 'https://www.google.com/maps?q=Rua+Moacir+Saraiva+de+Carvalho+59+Rio+de+Janeiro&output=embed',
    mapsLink: 'https://maps.app.goo.gl/a2awMmfxMosFLpn86',
  },
]
