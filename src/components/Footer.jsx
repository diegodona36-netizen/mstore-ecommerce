import React, { useState } from 'react';
import { Logo } from './Logo';
import { Send, ShieldCheck, Phone, MapPin, Clock, Check, MessageSquare } from 'lucide-react';

export const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#070606] relative pt-16 pb-8 overflow-hidden font-inter text-slate-300">
      
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00E5FF]/5 blur-[120px] pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 text-left">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="large" />
            <p className="text-xs text-slate-300 max-w-sm leading-relaxed pt-2">
              M Store es tu destino de confianza para la mejor tecnología en Venezuela. Televisores Smart 4K, Neveras Inverter, Cocinas, Smartphones Insignia y Audio High-End con atención y compras concretadas 100% por WhatsApp.
            </p>

            {/* Redes Sociales */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Instagram M Store"
                className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-[#00E5FF] border border-white/10 hover:border-[#00E5FF] text-slate-300 hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook M Store"
                className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-[#00E5FF] border border-white/10 hover:border-[#00E5FF] text-slate-300 hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Twitter X M Store"
                className="w-10 h-10 rounded-xl bg-white/[0.04] hover:bg-[#00E5FF] border border-white/10 hover:border-[#00E5FF] text-slate-300 hover:text-black flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Categorías Principales */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-space">Categorías Principales</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#catalogo-productos" className="hover:text-[#00E5FF] transition-colors">Smart TVs 4K & Neo QLED</a></li>
              <li><a href="#catalogo-productos" className="hover:text-[#00E5FF] transition-colors">Neveras & Refrigeración Inverter</a></li>
              <li><a href="#catalogo-productos" className="hover:text-[#00E5FF] transition-colors">Cocinas de Inducción & Estufas</a></li>
              <li><a href="#catalogo-productos" className="hover:text-[#00E5FF] transition-colors">Lavadoras & Lavandería AI DD</a></li>
              <li><a href="#catalogo-productos" className="hover:text-[#00E5FF] transition-colors">Smartphones Insignia</a></li>
            </ul>
          </div>

          {/* Col 3: Atención al Cliente por WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-space">Atención por WhatsApp</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a 
                  href="https://wa.me/584120000000" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#00E5FF] transition-colors flex items-center gap-2 text-[#00E5FF] font-bold font-space"
                >
                  <Phone className="w-4 h-4 fill-[#00E5FF]" /> WhatsApp +58 (412) 000-0000
                </a>
              </li>
              <li><span className="flex items-center gap-1.5 text-slate-300"><MapPin className="w-3.5 h-3.5 text-[#00E5FF]" /> Av. Principal CC High-End, Caracas</span></li>
              <li><span className="flex items-center gap-1.5 text-slate-300"><Clock className="w-3.5 h-3.5 text-[#00E5FF]" /> Lun a Sáb: 9:00 AM - 8:00 PM</span></li>
            </ul>
          </div>

          {/* Col 4: Club M Store (Sin métodos de pago visibles, todo por WS) */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/40 space-y-1">
              <span className="text-[11px] font-extrabold text-[#00E5FF] uppercase font-space block">💬 Atención & Pagos Directos</span>
              <p className="text-[11px] text-slate-200 leading-snug">
                Todas las compras, métodos de pago en $USD y despachos se coordinan directamente por WhatsApp.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-[11px] font-bold uppercase tracking-wider text-white font-space">Novedades M Store</h5>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  aria-label="Correo electrónico para newsletter"
                  className="w-full bg-white/[0.04] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00E5FF] min-h-[44px]"
                />
                <button
                  type="submit"
                  aria-label="Suscribirse al boletín"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl shrink-0 font-extrabold text-xs flex items-center justify-center min-h-[44px] shadow-sm active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {subscribed && (
                <div className="text-[10px] font-bold font-space text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> ¡Gracias por suscribirte a M Store!
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 M Store. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#00E5FF]" /> 
            <span>Compras & Asesoría 100% Protegidas por WhatsApp</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
