import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

export const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 1000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Generate WhatsApp order message
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let message = `*NUEVO PEDIDO DE M STORE*\n\n`;
    message += `*Detalle de la Orden:*\n`;
    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}\n`;
    });
    message += `\n*TOTAL A PAGAR:* $${subtotal.toLocaleString()}\n\n`;
    message += `Hola, me gustaría concretar esta compra en M Store. ¿Cuál es el proceso de pago y envío?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5215555555555?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0E14] border-l border-[#00E5FF]/30 shadow-2xl flex flex-col justify-between backdrop-blur-2xl">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-space text-white">Tu Carrito VIP</h2>
                <p className="text-xs text-slate-400">{cartItems.length} producto(s) seleccionados</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-white/[0.03] px-6 py-3 border-b border-white/5">
            <div className="flex justify-between text-xs mb-1.5 font-space">
              <span className="text-slate-300">
                {subtotal >= freeShippingThreshold 
                  ? '¡Envío VIP Gratis Desbloqueado!' 
                  : `Faltan $${(freeShippingThreshold - subtotal).toLocaleString()} para Envío Gratis`}
              </span>
              <span className="text-[#00E5FF] font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00E5FF] to-cyan-400 shadow-[0_0_10px_#00E5FF] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-16 h-16 text-slate-600 mb-4 opacity-50" />
                <p className="text-base font-bold font-space text-slate-300">Tu carrito está vacío</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Explora el catálogo y añade los mejores smartphones y accesorios de alta gama.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 btn-cyan-glow px-6 py-2.5 rounded-xl text-xs font-bold"
                >
                  Explorar Productos
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex gap-4 items-center hover:border-[#00E5FF]/30 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-black/50 p-2 shrink-0 border border-white/5 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="h-full object-contain" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white font-space line-clamp-2 leading-tight">{item.name}</h4>
                    <p className="text-xs font-extrabold text-[#00E5FF] mt-1 flex items-baseline gap-1">
                      <span>${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      <span className="text-[10px] text-slate-400 font-space">USD</span>
                    </p>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-slate-500 hover:text-red-400 transition-colors shrink-0"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-black/60 space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Envío Exprés</span>
                  <span className="text-emerald-400 font-bold">
                    {subtotal >= freeShippingThreshold ? 'GRATIS' : '$15 USD'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-extrabold text-white font-space pt-2 border-t border-white/10">
                  <span>Total Pedido:</span>
                  <div className="flex items-baseline gap-1 text-right">
                    <span className="text-lg text-[#00E5FF] font-extrabold">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <span className="text-xs text-[#00E5FF] font-bold">USD</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Primary Action */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 bg-[#00E5FF] hover:bg-[#00F2FE] text-black shadow-[0_0_20px_rgba(0,229,255,0.5)] active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-black shrink-0" />
                <span className="truncate">Comprar por WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                <span>Pago contra entrega o transferencia protegida por M Store</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
