import Navbar from './components/Navbar'
import Hero from './components/Hero'
import NovoTime from './components/NovoTime'
import Numeros from './components/Numeros'
import Professores from './components/Professores'
import Conquistas from './components/Conquistas'
import Galeria from './components/Galeria'
import Planos from './components/Planos'
import Unidades from './components/Unidades'
import Contato from './components/Contato'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import AdminApp from './admin/AdminApp'

// Detecta se estamos na rota /admin (single-page com check simples de pathname).
// Não usamos react-router para manter o bundle leve.
function isAdminRoute() {
  if (typeof window === 'undefined') return false
  const p = window.location.pathname
  return p === '/admin' || p === '/admin/' || p.startsWith('/admin/')
}

export default function App() {
  if (isAdminRoute()) {
    return <AdminApp />
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NovoTime />
        <Numeros />
        <Professores />
        <Conquistas />
        <Galeria />
        <Planos />
        <Unidades />
        <Contato />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
