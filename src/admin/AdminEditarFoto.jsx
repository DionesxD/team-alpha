import { useState } from 'react'
import { supabase } from '../lib/supabase'

// ⚙️ PARAMETRIZAÇÃO — edite estes valores para ajustar os limites
const MAX_IMAGE_SIZE = 5 * 1024 * 1024      // 5 MB
const MAX_VIDEO_SIZE = 10 * 1024 * 1024     // 10 MB
const MAX_VIDEO_DURATION = 30               // 30 segundos
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ACCEPTED_VIDEO_TYPES = ['video/mp4', 'video/webm']

// Helper: extrai duração do vídeo em segundos
function getVideoDuration(file) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      resolve(video.duration)
      URL.revokeObjectURL(video.src)
    }
    video.onerror = () => resolve(0)
    video.src = URL.createObjectURL(file)
  })
}

export default function AdminEditarFoto({ foto, onSaved, onCancel }) {
  const isEditing = Boolean(foto?.id)
  const [titulo, setTitulo] = useState(foto?.titulo || '')
  const [descricao, setDescricao] = useState(foto?.descricao || '')
  const [destaque, setDestaque] = useState(foto?.destaque || false)
  const [ordem, setOrdem] = useState(foto?.ordem ?? 0)
  const [file, setFile] = useState(null)
  const [tipo, setTipo] = useState(foto?.tipo || 'imagem')
  const [preview, setPreview] = useState(foto?.imagem_url || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return

    setError('')

    // Detecta tipo
    const isVideo = f.type.startsWith('video/')
    const isImage = f.type.startsWith('image/')
    const novoTipo = isVideo ? 'video' : 'imagem'

    if (isVideo) {
      // Valida tipo
      if (!ACCEPTED_VIDEO_TYPES.includes(f.type)) {
        setError('Vídeo deve ser MP4 ou WebM.')
        return
      }
      // Valida tamanho
      if (f.size > MAX_VIDEO_SIZE) {
        setError(`Vídeo muito grande. Máximo: ${MAX_VIDEO_SIZE / 1024 / 1024} MB.`)
        return
      }
      // Valida duração
      const duration = await getVideoDuration(f)
      if (duration > MAX_VIDEO_DURATION) {
        setError(`Vídeo muito longo: ${duration.toFixed(0)}s. Máximo: ${MAX_VIDEO_DURATION}s.`)
        return
      }
    } else if (isImage) {
      if (!ACCEPTED_IMAGE_TYPES.includes(f.type)) {
        setError('Imagem deve ser JPG, PNG ou WebP.')
        return
      }
      if (f.size > MAX_IMAGE_SIZE) {
        setError(`Imagem muito grande. Máximo: ${MAX_IMAGE_SIZE / 1024 / 1024} MB.`)
        return
      }
    } else {
      setError('Selecione um arquivo de imagem ou vídeo válido.')
      return
    }

    setTipo(novoTipo)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let imagem_url = foto?.imagem_url || ''
      let imagem_path = foto?.imagem_path || ''

      // Se tem arquivo novo, faz upload
      if (file) {
        const ext = file.name.split('.').pop().toLowerCase()
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`
        const filePath = `galeria/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('galeria')
          .upload(filePath, file, { cacheControl: '3600', upsert: false })

        if (uploadError) throw uploadError

        // Pega URL pública
        const { data: publicUrlData } = supabase.storage
          .from('galeria')
          .getPublicUrl(filePath)

        imagem_url = publicUrlData.publicUrl
        imagem_path = filePath

        // Se estava editando e tinha imagem antiga, deleta do storage
        if (isEditing && foto?.imagem_path) {
          await supabase.storage.from('galeria').remove([foto.imagem_path])
        }
      } else if (!isEditing) {
        throw new Error('Selecione uma imagem ou vídeo.')
      }

      const payload = {
        titulo: titulo.trim(),
        descricao: descricao.trim() || null,
        imagem_url,
        imagem_path,
        destaque,
        ordem: Number(ordem) || 0,
        tipo,
      }

      if (isEditing) {
        const { error: updateError } = await supabase
          .from('galeria_fotos')
          .update(payload)
          .eq('id', foto.id)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase
          .from('galeria_fotos')
          .insert(payload)
        if (insertError) throw insertError
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
    if (!confirm('Tem certeza que deseja excluir esta foto?')) return
    setLoading(true)
    try {
      if (foto?.imagem_path) {
        await supabase.storage.from('galeria').remove([foto.imagem_path])
      }
      const { error: deleteError } = await supabase
        .from('galeria_fotos')
        .delete()
        .eq('id', foto.id)
      if (deleteError) throw deleteError
      onSaved()
    } catch (err) {
      setError(err.message || 'Erro ao excluir.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] bg-alpha-black/95 backdrop-blur-md overflow-y-auto">
      <div className="min-h-full flex items-start justify-center p-4 sm:p-8">
        <div className="w-full max-w-2xl card-elevated p-6 sm:p-8 my-4">
          <h2 className="font-display text-3xl uppercase tracking-wide mb-6">
            {isEditing ? 'Editar foto' : 'Nova foto'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Preview da imagem/vídeo */}
            {preview && (
              <div className="relative aspect-video rounded-lg overflow-hidden border border-alpha-gray-line bg-alpha-black">
                {tipo === 'video' ? (
                  <video src={preview} controls className="w-full h-full object-cover" />
                ) : (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                )}
                {tipo === 'video' && (
                  <span className="absolute top-2 left-2 px-2 py-1 rounded-full bg-alpha-red text-white text-[10px] font-bold uppercase tracking-wider">
                    ▶ Vídeo
                  </span>
                )}
              </div>
            )}

            {/* Upload */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                {isEditing ? 'Trocar arquivo (opcional)' : 'Arquivo *'}
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                onChange={handleFileChange}
                className="block w-full text-sm text-white/70 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:bg-alpha-red file:text-white file:font-semibold file:uppercase file:tracking-wider file:cursor-pointer hover:file:bg-alpha-red-dark file:transition-colors cursor-pointer"
              />
              <p className="text-white/40 text-xs mt-1.5">
                Imagem: JPG/PNG/WebP até {MAX_IMAGE_SIZE / 1024 / 1024} MB · Vídeo: MP4/WebM até {MAX_VIDEO_SIZE / 1024 / 1024} MB e {MAX_VIDEO_DURATION}s
              </p>
            </div>

            {/* Título */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                Título *
              </label>
              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Campeonato Estadual 2024"
                className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white placeholder:text-white/30 focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                Descrição (opcional)
              </label>
              <textarea
                rows="2"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Aluno com medalha de ouro na categoria até 75kg"
                className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white placeholder:text-white/30 focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30 resize-none"
              />
            </div>

            {/* Destaque + Ordem */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                  Destaque
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={destaque}
                    onChange={(e) => setDestaque(e.target.checked)}
                    className="w-5 h-5 accent-alpha-red cursor-pointer"
                  />
                  <span className="text-sm text-white/70">
                    Aparecer como banner largo no topo da galeria
                  </span>
                </label>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold">
                  Ordem
                </label>
                <input
                  type="number"
                  min="0"
                  value={ordem}
                  onChange={(e) => setOrdem(e.target.value)}
                  className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30"
                />
                <p className="text-white/40 text-xs mt-1">
                  Menor número aparece primeiro (0 = topo)
                </p>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-md bg-alpha-red/10 border border-alpha-red/40 text-alpha-red-light text-sm">
                {error}
              </div>
            )}

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 disabled:opacity-60"
              >
                {loading ? 'Salvando…' : isEditing ? 'Salvar alterações' : 'Adicionar'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="btn-ghost flex-1"
              >
                Cancelar
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-6 py-3 rounded-md border border-alpha-red/40 text-alpha-red hover:bg-alpha-red hover:text-white font-semibold uppercase tracking-wide text-sm transition-all disabled:opacity-60"
                >
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