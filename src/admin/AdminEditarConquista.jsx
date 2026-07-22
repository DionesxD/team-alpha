import { useState } from 'react'
import { supabase } from '../lib/supabase'

const MODALIDADES = ['Kickboxing', 'MMA', 'Muay Thai', 'Boxe', 'Interno']
const MEDALHAS = [
  { value: '🥇', label: 'Ouro' },
  { value: '🥈', label: 'Prata' },
  { value: '🥉', label: 'Bronze' },
  { value: '🏆', label: 'Troféu' },
]

export default function AdminEditarConquista({ conquista, onSaved, onCancel }) {
  const isEditing = Boolean(conquista?.id)
  const [campeonato, setCampeonato] = useState(conquista?.campeonato || '')
  const [modalidade, setModalidade] = useState(conquista?.modalidade || 'Kickboxing')
  const [medalha, setMedalha] = useState(conquista?.medalha || '🥇')
  const [vezes, setVezes] = useState(conquista?.vezes ?? 1)
  const [descricao, setDescricao] = useState(conquista?.descricao || '')
  const [ordem, setOrdem] = useState(conquista?.ordem ?? 0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = {
        campeonato: campeonato.trim(),
        modalidade,
        medalha,
        vezes: Number(vezes) || 1,
        descricao: descricao.trim() || null,
        ordem: Number(ordem) || 0,
      }
      if (isEditing) {
        const { error } = await supabase.from('conquistas').update(payload).eq('id', conquista.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('conquistas').insert(payload)
        if (error) throw error
      }
      onSaved()
    } catch (err) {
      setError(err.message || 'Erro ao salvar.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!isEditing) return
    if (!confirm('Excluir esta conquista?')) return
    setLoading(true)
    try {
      const { error } = await supabase.from('conquistas').delete().eq('id', conquista.id)
      if (error) throw error
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-alpha-black/95 backdrop-blur-md overflow-y-auto">
      <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl card-elevated p-6 sm:p-8 my-4">
          <h2 className="font-display text-3xl uppercase tracking-wide mb-6">
            {isEditing ? 'Editar conquista' : 'Nova conquista'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                Campeonato *
              </label>
              <input
                type="text" required value={campeonato}
                onChange={(e) => setCampeonato(e.target.value)}
                placeholder="Ex: Jungle Fight"
                className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white placeholder:text-white/30 focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                  Modalidade
                </label>
                <select
                  value={modalidade}
                  onChange={(e) => setModalidade(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30"
                >
                  {MODALIDADES.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                  Medalha
                </label>
                <select
                  value={medalha}
                  onChange={(e) => setMedalha(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30"
                >
                  {MEDALHAS.map((m) => <option key={m.value} value={m.value}>{m.value} {m.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                  Vezes
                </label>
                <input
                  type="number" min="1" value={vezes}
                  onChange={(e) => setVezes(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                Descrição (opcional)
              </label>
              <input
                type="text" value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: 4x Campeão"
                className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white placeholder:text-white/30 focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                Ordem
              </label>
              <input
                type="number" min="0" value={ordem}
                onChange={(e) => setOrdem(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30"
              />
              <p className="text-white/40 text-xs mt-1">Menor número aparece primeiro</p>
            </div>

            {error && (
              <div className="p-3 rounded-md bg-alpha-red/10 border border-alpha-red/40 text-alpha-red-light text-sm">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-60">
                {loading ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Adicionar conquista'}
              </button>
              <button type="button" onClick={onCancel} disabled={loading} className="btn-ghost flex-1">
                Cancelar
              </button>
              {isEditing && (
                <button type="button" onClick={handleDelete} disabled={loading}
                  className="px-6 py-3 rounded-md border border-alpha-red/40 text-alpha-red hover:bg-alpha-red hover:text-white font-semibold uppercase tracking-wide text-sm transition-all disabled:opacity-60">
                  Excluir
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}