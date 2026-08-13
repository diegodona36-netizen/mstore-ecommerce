import React from 'react';
import { MapPin, Clock, Phone, Navigation, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const LocationSection = ({ 
  isLightBg = true, 
  googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.123456!2d-66.9!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDMwJzAwLjAiTiA2NsKwNTQnMDAuMCJX!5e0!3m2!1ses!2s!4v1625000000000!5m2!1ses!2s" 
}) => {
  return (
    <section id="ubicacion" className={`py-16 sm:py-20 relative overflow-hidden ${isLightBg ? 'bg-[#F8FAFC]' : 'bg-[#0A0908]'}`}>
      
      {/* Background glow effects */}
      {!isLightBg && (
        <>
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00E5FF]/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00F2FE]/10 blur-[120px] rounded-full pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold font-space uppercase tracking-wider ${
            isLightBg 
              ? 'bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#0066FF]' 
              : 'bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF]'
          }`}>
            <MapPin className="w-3.5 h-3.5" />
            <span>Sucursal Principal M Store</span>
          </div>
          
          <h2 className={`text-3xl sm:text-4xl font-extrabold font-space tracking-tight ${isLightBg ? 'text-slate-900' : 'text-white'}`}>
            Visita Nuestra <span className="text-[#0066FF]">Tienda Física</span>
          </h2>
          
          <p className={`text-sm font-inter ${isLightBg ? 'text-slate-600' : 'text-slate-400'}`}>
            Conoce nuestra exhibición de smartphones flagship, audio hi-fi y electrodomésticos inteligentes. Atención personalizada VIP y asesoría técnica directa.
          </p>
        </div>

        {/* Enterprise Grid: Business Info Card + Google Maps Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Business Details */}
          <div className={`lg:col-span-5 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between ${
            isLightBg 
              ? 'bg-white border-2 border-slate-200 shadow-md text-slate-900' 
              : 'glass-card border border-white/10 text-white shadow-[0_15px_40px_rgba(0,0,0,0.8)]'
          }`}>
            
            <div className="space-y-6">
              
              {/* Header Info */}
              <div className={`flex items-center gap-3 pb-4 border-b ${isLightBg ? 'border-slate-200' : 'border-white/10'}`}>
                <div className={`p-3 rounded-2xl ${isLightBg ? 'bg-[#00E5FF]/15 text-[#0066FF] border border-[#00E5FF]/40' : 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30'}`}>
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold font-space ${isLightBg ? 'text-slate-900' : 'text-white'}`}>M Store Technology Hub</h3>
                  <p className={`text-xs ${isLightBg ? 'text-slate-500' : 'text-slate-400'}`}>Tienda Física & Centro de Garantía</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl shrink-0 ${isLightBg ? 'bg-slate-100 text-[#0066FF]' : 'bg-white/5 text-[#00E5FF]'}`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className={`text-xs font-bold font-space uppercase tracking-wider ${isLightBg ? 'text-slate-900' : 'text-white'}`}>Dirección Principal</h4>
                  <p className={`text-xs leading-relaxed font-inter ${isLightBg ? 'text-slate-600' : 'text-slate-300'}`}>
                    Av. Principal de Tecnología, Centro Comercial High-End, Nivel 1, Local M-10.
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl shrink-0 ${isLightBg ? 'bg-slate-100 text-[#0066FF]' : 'bg-white/5 text-[#00E5FF]'}`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className={`text-xs font-bold font-space uppercase tracking-wider ${isLightBg ? 'text-slate-900' : 'text-white'}`}>Horario de Atención</h4>
                  <p className={`text-xs font-inter ${isLightBg ? 'text-slate-600' : 'text-slate-300'}`}>
                    <strong className={isLightBg ? 'text-slate-900' : 'text-white'}>Lunes a Sábado:</strong> 9:00 AM – 8:00 PM<br/>
                    <strong className={isLightBg ? 'text-slate-900' : 'text-white'}>Domingos y Feriados:</strong> 10:00 AM – 5:00 PM
                  </p>
                </div>
              </div>

              {/* Phone & Direct Support */}
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-xl shrink-0 ${isLightBg ? 'bg-slate-100 text-[#0066FF]' : 'bg-white/5 text-[#00E5FF]'}`}>
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className={`text-xs font-bold font-space uppercase tracking-wider ${isLightBg ? 'text-slate-900' : 'text-white'}`}>Atención WhatsApp VIP</h4>
                  <p className={`text-xs font-inter ${isLightBg ? 'text-slate-600' : 'text-slate-300'}`}>
                    +58 412 000 0000 / +58 424 000 0000
                  </p>
                </div>
              </div>

            </div>

            {/* CTA Button: How to get there */}
            <div className={`pt-4 border-t space-y-3 ${isLightBg ? 'border-slate-200' : 'border-white/10'}`}>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <Navigation className="w-4 h-4 text-white" />
                <span>Cómo Llegar en Google Maps &rarr;</span>
              </a>

              <div className={`flex items-center justify-center gap-2 text-[11px] ${isLightBg ? 'text-slate-500' : 'text-slate-400'}`}>
                <ShieldCheck className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Estacionamiento privado y seguridad 24H</span>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed */}
          <div className={`lg:col-span-7 rounded-3xl p-3 overflow-hidden relative group min-h-[380px] flex flex-col ${
            isLightBg ? 'bg-white border-2 border-slate-200 shadow-md' : 'glass-card border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.8)]'
          }`}>
            <div className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                title="Ubicación M Store Google Maps"
                src={googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px', filter: isLightBg ? 'none' : 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
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
