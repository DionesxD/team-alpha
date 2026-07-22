import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

/**
 * Lista todas as fotos da galeria, ordenadas por destaque + ordem + data.
 * Não exige login (política pública de leitura).
 */
export function useGaleriaFotos() {
  const [fotos, setFotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFotos = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('galeria_fotos')
      .select('*')
      .order('destaque', { ascending: false }) // destaques primeiro
      .order('ordem', { ascending: true })
      .order('criado_em', { ascending: false })

    if (error) {
      setError(error)
      setFotos([])
    } else {
      setFotos(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchFotos()
  }, [fetchFotos])

  return { fotos, loading, error, refetch: fetchFotos }
}
