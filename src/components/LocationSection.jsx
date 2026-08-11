import React from 'react';
import { MapPin, Clock, Phone, Navigation, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const LocationSection = ({ googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.123456!2d-66.9!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDMwJzAwLjAiTiA2NsKwNTQnMDAuMCJX!5e0!3m2!1ses!2s!4v1625000000000!5m2!1ses!2s" }) => {
  return (
    <section id="ubicacion" className="py-16 sm:py-20 relative overflow-hidden bg-[#0A0908]">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00F2FE]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-10">
        
        {/* Section Header (Odoo Style) */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold font-space uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Sucursal Principal M Store</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold font-space text-white tracking-tight">
            Visita Nuestra <span className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">Tienda Física</span>
          </h2>
          
          <p className="text-sm text-slate-400 font-inter">
            Conoce nuestra exhibición de smartphones flagship, audio hi-fi y electrodomésticos inteligentes. Atención personalizada VIP y asesoría técnica directa.
          </p>
        </div>

        {/* Odoo Style Grid: Business Info Card + Google Maps Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Business Details (Odoo Enterprise Card) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
            
            <div className="space-y-6">
              
              {/* Header Info */}
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="p-3 rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-space text-white">M Store Technology Hub</h3>
                  <p className="text-xs text-slate-400">Tienda Física & Centro de Garantía</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#00E5FF] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold font-space text-white uppercase tracking-wider">Dirección Principal</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-inter">
                    Av. Principal de Tecnología, Centro Comercial High-End, Nivel 1, Local M-10.
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#00E5FF] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold font-space text-white uppercase tracking-wider">Horario de Atención</h4>
                  <p className="text-xs text-slate-300 font-inter">
                    <strong className="text-white">Lunes a Sábado:</strong> 9:00 AM – 8:00 PM<br/>
                    <strong className="text-white">Domingos y Feriados:</strong> 10:00 AM – 5:00 PM
                  </p>
                </div>
              </div>

              {/* Phone & Direct Support */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 text-[#00E5FF] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold font-space text-white uppercase tracking-wider">Atención WhatsApp VIP</h4>
                  <p className="text-xs text-slate-300 font-inter">
                    +52 1 55 5555 5555 / +52 1 55 8888 8888
                  </p>
                </div>
              </div>

            </div>

            {/* CTA Button: How to get there (Google Maps Direct Link) */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-cyan-glow py-3 rounded-2xl font-bold text-xs font-space text-black flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              >
                <Navigation className="w-4 h-4" />
                <span>Cómo Llegar en Google Maps &rarr;</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Estacionamiento privado y seguridad 24H</span>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed (Odoo Style) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-3 border border-white/10 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative group min-h-[380px] flex flex-col">
            <div className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden border border-white/10">
              <iframe
                title="Ubicación M Store Google Maps"
                src={googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px', filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-2xl"
              ></iframe>

              {/* Overlay badge */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-[#00E5FF]/40 text-[#00E5FF] text-[11px] font-bold font-space flex items-center gap-2 pointer-events-none">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Mapa Interactivo Google Maps API</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
