import { useState } from 'react'
import { useAuth } from './AuthContext'
import { useGaleriaFotos } from '../hooks/useGaleriaFotos'
import AdminEditarFoto from './AdminEditarFoto'

export default function AdminPainel() {
  const { signOut, session } = useAuth()
  const { fotos, loading, error, refetch } = useGaleriaFotos()
  const [editando, setEditando] = useState(null) // null | {} | foto

  const handleSaved = () => {
    setEditando(null)
    refetch()
  }

  const sair = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Glow de fundo */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-alpha-red/8 blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-alpha-gray-line/60 bg-alpha-black/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-display text-2xl uppercase tracking-wide leading-none">
                Painel <span className="text-alpha-red">Team Alpha</span>
              </h1>
              <p className="text-white/40 text-xs mt-0.5">
                Logado como {session?.user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden sm:inline-flex text-sm text-white/60 hover:text-alpha-red transition-colors"
            >
              Ver site ↗
            </a>
            <button
              onClick={sair}
              className="px-4 py-2 rounded-md border border-alpha-gray-line hover:border-alpha-red text-white/80 hover:text-alpha-red text-sm font-semibold uppercase tracking-wider transition-all"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl uppercase tracking-wide leading-none">
              Galeria de fotos
            </h2>
            <p className="text-white/50 text-sm mt-1">
              {fotos.length} {fotos.length === 1 ? 'foto cadastrada' : 'fotos cadastradas'}
            </p>
          </div>
          <button
            onClick={() => setEditando({})}
            className="btn-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Adicionar foto
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-md bg-alpha-red/10 border border-alpha-red/40 text-alpha-red-light mb-6">
            <p className="font-semibold mb-1">Erro ao carregar fotos:</p>
            <p className="text-sm">{error.message}</p>
            <p className="text-xs mt-2 text-white/60">
              Verifique se você executou o script SQL no Supabase (arquivo{' '}
              <code className="text-alpha-red">supabase-setup.sql</code>).
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-alpha-red border-t-transparent rounded-full animate-spin" />
            <p className="text-white/50 mt-3 text-sm">Carregando fotos…</p>
          </div>
        ) : fotos.length === 0 ? (
          <div className="text-center py-16 card-elevated">
            <p className="text-white/60 mb-2">Nenhuma foto cadastrada ainda.</p>
            <p className="text-white/40 text-sm mb-6">
              Clique em "Adicionar foto" para enviar a primeira.
            </p>
            <button onClick={() => setEditando({})} className="btn-primary">
              Adicionar primeira foto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {fotos.map((f) => (
              <article
                key={f.id}
                className="group card-elevated overflow-hidden hover:border-alpha-red/50 transition-all cursor-pointer"
                onClick={() => setEditando(f)}
              >
                <div className="relative aspect-video bg-alpha-black">
                  <img
                    src={f.imagem_url}
                    alt={f.titulo}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {f.destaque && (
                    <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-alpha-red text-white text-[10px] font-bold uppercase tracking-wider">
                      ★ Destaque
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg uppercase tracking-wide leading-tight text-white truncate">
                    {f.titulo}
                  </h3>
                  {f.descricao && (
                    <p className="text-white/50 text-xs mt-1 line-clamp-2">{f.descricao}</p>
                  )}
                  <p className="text-white/30 text-[10px] mt-2 uppercase tracking-wider">
                    Ordem: {f.ordem} · {new Date(f.criado_em).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {editando && (
        <AdminEditarFoto
          foto={editando}
          onSaved={handleSaved}
          onCancel={() => setEditando(null)}
        />
      )}
    </div>
  )
}
