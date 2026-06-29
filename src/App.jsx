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

export default function App() {
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
