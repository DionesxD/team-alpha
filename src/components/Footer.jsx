import logo from '../assets/logo.png'
import { REDES_SOCIAIS } from '../data/contato'

const navLinks = [
  { label: 'O Time', href: '#time' },
  { label: 'Professor', href: '#professores' },
  { label: 'Conquistas', href: '#conquistas' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Planos', href: '#planos' },
  { label: 'Unidades', href: '#unidades' },
  { label: 'Contato', href: '#contato' },
]

export default function Footer() {
  const handleNav = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-alpha-black-soft border-t border-alpha-gray-line/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Logo + descrição */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Team Alpha" className="w-12 h-12 object-contain" />
              <span className="font-display text-2xl tracking-wider leading-none">
                TEAM <span className="text-alpha-red">ALPHA</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Academia de artes marciais focada em Kickboxing, Luta Livre e MMA.
              Um novo time, a mesma garra campeã.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-4 text-white">
              Navegação
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleNav(e, l.href)}
                    className="text-sm text-white/60 hover:text-alpha-red transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociais */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-4 text-white">
              Siga o mestre
            </h4>
            <div className="flex gap-3">
              <a
                href={REDES_SOCIAIS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram — @treinadorbarbudo_oficial"
                className="w-11 h-11 rounded-lg bg-alpha-black-card border border-alpha-gray-line/60 hover:border-alpha-red hover:bg-alpha-red flex items-center justify-center transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            <p className="text-white/40 text-xs mt-4">
              <a
                href={REDES_SOCIAIS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-alpha-red transition-colors"
              >
                @treinadorbarbudo_oficial
              </a>
              <br />
              kickboxing · luta livre · mma · muay thai · boxe
            </p>
          </div>
        </div>

        {/* Separador + copyright */}
        <div className="pt-6 border-t border-alpha-gray-line/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Team Alpha. Todos os direitos reservados.
          </p>
          <p className="text-white/30 text-xs">
            Feito com <span className="text-alpha-red">●</span> para lutadores.
          </p>
        </div>
      </div>
    </footer>
  )
}
