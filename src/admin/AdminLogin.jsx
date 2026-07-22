import { useState } from 'react'
import { useAuth } from './AuthContext'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email.trim(), password)
      // AuthContext vai atualizar o session e o AdminApp redireciona
    } catch (err) {
      setError(
        err.message?.includes('Invalid login')
          ? 'E-mail ou senha incorretos.'
          : err.message || 'Erro ao fazer login.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
      {/* Glow vermelho de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-alpha-red/15 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-alpha-red/10 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl uppercase tracking-wide leading-none mb-2">
            TEAM <span className="text-alpha-red">ALPHA</span>
          </h1>
          <p className="text-white/50 text-sm uppercase tracking-[0.25em]">
            Painel administrativo
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card-elevated p-6 sm:p-8 space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white placeholder:text-white/30 focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30 transition-colors"
              placeholder="thiago@teamalpha.com.br"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-semibold"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-md bg-alpha-black border border-alpha-gray-line text-white placeholder:text-white/30 focus:border-alpha-red focus:outline-none focus:ring-2 focus:ring-alpha-red/30 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 rounded-md bg-alpha-red/10 border border-alpha-red/40 text-alpha-red-light text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>

          <p className="text-center text-white/40 text-xs pt-1">
            Acesso restrito ao mestre Thiago Barbudo.
          </p>
        </form>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white/50 hover:text-alpha-red text-sm transition-colors"
          >
            ← Voltar para o site
          </a>
        </div>
      </div>
    </div>
  )
}
