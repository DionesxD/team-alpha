import { useState } from 'react'
import { useAuth } from './AuthContext'
import { useGaleriaFotos } from '../hooks/useGaleriaFotos'
import { useConquistas } from '../hooks/useConquistas'
import AdminEditarFoto from './AdminEditarFoto'
import AdminEditarConquista from './AdminEditarConquista'

export default function AdminPainel() {
  const { signOut, session } = useAuth()
  const { fotos, loading: loadingFotos, error: errorFotos, refetch: refetchFotos } = useGaleriaFotos()
  const { conquistas, loading: loadingCons, error: errorCons, refetch: refetchCons } = useConquistas()
  const [aba, setAba] = useState('galeria') // 'galeria' | 'conquistas'
  const [editando, setEditando] = useState(null)

  const refetch = aba === 'galeria' ? refetchFotos : refetchCons
  const handleSaved = () => { setEditando(null); refetch() }

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-alpha-red/8 blur-[120px]" />
      </div>

      <header className="relative border-b border-alpha-gray-line/60 bg-alpha-black/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl uppercase tracking-wide leading-none">
              Painel <span className="text-alpha-red">Team Alpha</span>
            </h1>
            <p className="text-white/40 text-xs mt-0.5">Logado como {session?.user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="hidden sm:inline-flex text-sm text-white/60 hover:text-alpha-red transition-colors">Ver site ↗</a>
            <button onClick={signOut} className="px-4 py-2 rounded-md border border-alpha-gray-line hover:border-alpha-red text-white/80 hover:text-alpha-red text-sm font-semibold uppercase tracking-wider transition-all">Sair</button>
          </div>
        </div>
      </header>

      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Abas */}
        <div className="flex gap-2 mb-8 border-b border-alpha-gray-line/40">
          <button
            onClick={() => setAba('galeria')}
            className={`px-5 py-3 font-display text-lg uppercase tracking-wider transition-all border-b-2 -mb-px ${aba === 'galeria' ? 'border-alpha-red text-white' : 'border-transparent text-white/50 hover:text-white'}`}
          >
            Galeria ({fotos.length})
          </button>
          <button
            onClick={() => setAba('conquistas')}
            className={`px-5 py-3 font-display text-lg uppercase tracking-wider transition-all border-b-2 -mb-px ${aba === 'conquistas' ? 'border-alpha-red text-white' : 'border-transparent text-white/50 hover:text-white'}`}
          >
            Conquistas ({conquistas.length})
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="font-display text-3xl uppercase tracking-wide leading-none">
            {aba === 'galeria' ? 'Fotos da galeria' : 'Conquistas'}
          </h2>
          <button onClick={() => setEditando({})} className="btn-primary">
            {aba === 'galeria' ? 'Adicionar foto' : 'Adicionar conquista'}
          </button>
        </div>

        {(aba === 'galeria' ? errorFotos : errorCons) && (
          <div className="p-4 rounded-md bg-alpha-red/10 border border-alpha-red/40 text-alpha-red-light mb-6 text-sm">
            Erro ao carregar: {(aba === 'galeria' ? errorFotos : errorCons)?.message}
          </div>
        )}

        {(aba === 'galeria' ? loadingFotos : loadingCons) ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-alpha-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : aba === 'galeria' ? (
          fotos.length === 0 ? (
            <div className="text-center py-16 card-elevated">
              <p className="text-white/60 mb-2">Nenhuma foto cadastrada.</p>
              <button onClick={() => setEditando({})} className="btn-primary mt-4">Adicionar primeira foto</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {fotos.map((f) => (
                <article key={f.id} className="group card-elevated overflow-hidden hover:border-alpha-red/50 transition-all cursor-pointer" onClick={() => setEditando(f)}>
                  <div className="relative aspect-video bg-alpha-black">
                    <img src={f.imagem_url} alt={f.titulo} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {f.destaque && <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-alpha-red text-white text-[10px] font-bold uppercase tracking-wider">★ Destaque</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg uppercase tracking-wide leading-tight text-white truncate">{f.titulo}</h3>
                    <p className="text-white/30 text-[10px] mt-2 uppercase tracking-wider">Ordem: {f.ordem}</p>
                  </div>
                </article>
              ))}
            </div>
          )
        ) : (
          // Aba conquistas
          conquistas.length === 0 ? (
            <div className="text-center py-16 card-elevated">
              <p className="text-white/60 mb-2">Nenhuma conquista cadastrada.</p>
              <button onClick={() => setEditando({})} className="btn-primary mt-4">Adicionar primeira conquista</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {conquistas.map((c) => (
                <article key={c.id} className="group card-elevated p-5 hover:border-alpha-red/50 transition-all cursor-pointer" onClick={() => setEditando(c)}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-display text-lg uppercase tracking-wide leading-tight text-white">{c.campeonato}</h3>
                    <span className="text-2xl shrink-0">{c.medalha}</span>
                  </div>
                  <p className="text-alpha-red text-xs font-semibold uppercase tracking-wider">{c.modalidade} · {c.vezes}x</p>
                  {c.descricao && <p className="text-white/50 text-xs mt-1">{c.descricao}</p>}
                </article>
              ))}
            </div>
          )
        )}
      </main>

      {editando && (
        aba === 'galeria'
          ? <AdminEditarFoto foto={editando} onSaved={handleSaved} onCancel={() => setEditando(null)} />
          : <AdminEditarConquista conquista={editando} onSaved={handleSaved} onCancel={() => setEditando(null)} />
      )}
    </div>
  )
}