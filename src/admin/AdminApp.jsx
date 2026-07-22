import { AuthProvider, useAuth } from './AuthContext'
import AdminLogin from './AdminLogin'
import AdminPainel from './AdminPainel'

function AdminContent() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="inline-block w-8 h-8 border-2 border-alpha-red border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return session ? <AdminPainel /> : <AdminLogin />
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminContent />
    </AuthProvider>
  )
}
