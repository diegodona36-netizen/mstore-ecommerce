import React from 'react';
import { Logo } from './Logo';
import { Send, ShieldCheck, Heart, KeyRound } from 'lucide-react';

export const Footer = ({ onOpenAdmin }) => {
  return (
    <footer className="border-t border-white/10 bg-[#070606] relative pt-16 pb-8 overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00E5FF]/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="large" />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed pt-2">
              M Store es tu destino de confianza para la tecnología de más alta gama. Smartphones insignia, wearables de titanio y audio espacial con garantía oficial y envío VIP a todo el país.
            </p>

            {/* Social Icons SVG */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-[#00E5FF]/20 border border-white/10 hover:border-[#00E5FF] text-slate-300 hover:text-[#00E5FF] flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-[#00E5FF]/20 border border-white/10 hover:border-[#00E5FF] text-slate-300 hover:text-[#00E5FF] flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-[#00E5FF]/20 border border-white/10 hover:border-[#00E5FF] text-slate-300 hover:text-[#00E5FF] flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Youtube */}
              <a href="#" className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-[#00E5FF]/20 border border-white/10 hover:border-[#00E5FF] text-slate-300 hover:text-[#00E5FF] flex items-center justify-center transition-all duration-300">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Categorías */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-space">Navegación</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#catalogo" className="hover:text-[#00E5FF] transition-colors">Smartphones Insignia</a></li>
              <li><a href="#bento" className="hover:text-[#00E5FF] transition-colors">Audio High-End</a></li>
              <li><a href="#bento" className="hover:text-[#00E5FF] transition-colors">Relojes Smartwatches</a></li>
              <li><a href="#bento" className="hover:text-[#00E5FF] transition-colors">Cargadores & MagSafe</a></li>
              <li><a href="#beneficios" className="hover:text-[#00E5FF] transition-colors">Garantía VIP</a></li>
            </ul>
          </div>

          {/* Col 3: Soporte */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-space">Atención al Cliente</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Rastrear mi Pedido</a></li>
              <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Políticas de Garantía</a></li>
              <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Términos del Servicio</a></li>
              <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-[#00E5FF] transition-colors">Contacto Directo</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-space">Club M Store VIP</h4>
            <p className="text-xs text-slate-400">
              Recibe lanzamientos exclusivos y descuentos Cyber en tu correo.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00E5FF]"
              />
              <button
                type="submit"
                className="btn-cyan-glow px-3 py-2.5 rounded-xl shrink-0 text-black font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 M Store. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" /> Compras 100% Encriptadas & Seguras
            </span>

            {/* Discrete Worker Access Lock Icon */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-slate-600 hover:text-[#00E5FF] transition-colors p-1"
              title="Acceso Privado para Empleados M Store (#admin)"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono">Panel Empleados</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
