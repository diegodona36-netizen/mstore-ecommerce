import React from 'react';
import { MapPin, Clock, Phone, Navigation, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const LocationSection = ({ 
  isLightBg = true, 
  googleMapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.123456!2d-66.9!3d10.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDMwJzAwLjAiTiA2NsKwNTQnMDAuMCJX!5e0!3m2!1ses!2s!4v1625000000000!5m2!1ses!2s" 
}) => {
  return (
    <section id="ubicacion" className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/90 shadow-sm font-sans space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100/80 shrink-0">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Visita Nuestra <span className="text-blue-600">Tienda Física</span>
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
              Sucursal Principal & Centro Oficial de Garantías en Caracas
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-50 border border-emerald-200 text-emerald-700 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Atención Inmediata</span>
        </div>
      </div>

      {/* Enterprise Grid: Business Info Card + Google Maps Embed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Business Details */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between border border-slate-200/90 shadow-md text-slate-900">
            
            <div className="space-y-5">
              
              {/* Header Info */}
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100/80 shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight">M Store Flagship Hub</h3>
                  <p className="text-xs text-slate-500 font-medium">Tienda Oficial & Centro de Garantías</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Ubicación</h4>
                  <p className="text-xs leading-relaxed text-slate-600 font-medium">
                    Av. Principal de Tecnología, Centro Comercial High-End, Nivel 1, Local M-10.
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Horario de Atención</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    <strong className="text-slate-900">Lunes a Sábado:</strong> 9:00 AM – 8:00 PM<br/>
                    <strong className="text-slate-900">Domingos y Feriados:</strong> 10:00 AM – 5:00 PM
                  </p>
                </div>
              </div>

              {/* Phone & Direct Support */}
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Atención WhatsApp VIP</h4>
                  <p className="text-xs text-slate-600 font-semibold">
                    +58 412 000 0000 / +58 424 000 0000
                  </p>
                </div>
              </div>

            </div>

            {/* CTA Button: How to get there */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20 active:scale-95"
              >
                <Navigation className="w-4 h-4 text-white" />
                <span>Cómo Llegar en Google Maps &rarr;</span>
              </a>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Estacionamiento privado y seguridad 24H</span>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-3 border border-slate-200/90 shadow-md min-h-[380px] flex flex-col overflow-hidden">
            <div className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden border border-slate-200">
              <iframe
                title="Ubicación M Store Google Maps"
                src={googleMapsUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-2xl"
              />
            </div>
          </div>

        </div>
    </section>
  );
};
