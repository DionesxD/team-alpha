import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'O Time', href: '#time' },
  { label: 'Professor', href: '#professores' },
  { label: 'Conquistas', href: '#conquistas' },
  { label: 'Unidades', href: '#unidades' },
  { label: 'Contato', href: '#contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-alpha-black/90 backdrop-blur-md border-b border-alpha-gray-line/60'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#topo"
          onClick={(e) => handleNav(e, '#topo')}
          className="flex items-center gap-3 group"
          aria-label="Team Alpha — Home"
        >
          <img
            src={logo}
            alt="Team Alpha"
            className="w-11 h-11 object-contain transition-transform group-hover:scale-105"
          />
          <span className="font-display text-2xl tracking-wider leading-none">
            TEAM <span className="text-alpha-red">ALPHA</span>
          </span>
        </a>

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-alpha-red transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA desktop */}
        <a
          href="#planos"
          onClick={(e) => handleNav(e, '#planos')}
          className="hidden md:inline-flex btn-primary !py-2.5 !px-5 text-sm"
        >
          Treinar agora
        </a>

        {/* Botão hambúrguer mobile */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              open ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all ${
              open ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Menu mobile colapsável */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-alpha-black/95 backdrop-blur-md border-b border-alpha-gray-line/60 ${
          open ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <ul className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="block py-3 px-3 text-base font-semibold uppercase tracking-wider text-white/80 hover:text-alpha-red hover:bg-white/5 rounded-md transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#planos"
              onClick={(e) => handleNav(e, '#planos')}
              className="block mt-2 py-3 px-3 text-center btn-primary"
            >
              Treinar agora
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
