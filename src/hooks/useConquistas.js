import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

export function useConquistas() {
  const [conquistas, setConquistas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchConquistas = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('conquistas')
      .select('*')
      .order('ordem', { ascending: true })
      .order('criado_em', { ascending: false })
    if (error) {
      setError(error)
      setConquistas([])
    } else {
      setConquistas(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchConquistas() }, [fetchConquistas])
  return { conquistas, loading, error, refetch: fetchConquistas }
}