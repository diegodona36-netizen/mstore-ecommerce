import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  MessageCircle, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  CreditCard,
  Sparkles
} from 'lucide-react';

export const CartDrawer = ({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * item.quantity,
    0
  );

  const freeShippingThreshold = 100;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let message = `🛒 *HOLA M STORE, DESEO REALIZAR UN PEDIDO:*\n\n`;
    
    cartItems.forEach((item, index) => {
      const itemTotal = (parseFloat(item.price) || 0) * item.quantity;
      message += `▪️ *${item.name}*\n`;
      if (item.selectedStorage) message += `   Capacidad: ${item.selectedStorage}\n`;
      if (item.selectedColor) message += `   Color: ${item.selectedColor}\n`;
      message += `   Cantidad: ${item.quantity} x $${parseFloat(item.price).toFixed(2)} = $${itemTotal.toFixed(2)} USD\n\n`;
    });

    message += `💰 *TOTAL A PAGAR: $${subtotal.toFixed(2)} USD*\n`;
    message += `🚚 *ENVÍO:* ${subtotal >= freeShippingThreshold ? 'Envío Gratis Nacional Calificado' : 'Envío por coordinar'}\n\n`;
    message += `¿Cuál es el procedimiento para el pago y la entrega? ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "584120000000"; // Placeholder or store WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          
          {/* 1. Header */}
          <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">Tu Carrito de Compras</h2>
                <p className="text-xs font-semibold text-slate-500">{cartItems.length} producto(s) en tu orden</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-200 transition-colors"
              title="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Free Shipping Bar */}
          <div className="bg-slate-900 text-white px-5 sm:px-6 py-3.5 border-b border-slate-800">
            <div className="flex justify-between items-center text-xs mb-2 font-bold">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                {subtotal >= freeShippingThreshold 
                  ? '¡Felicidades! Calificas para Envío Gratis' 
                  : `Agrega $${remainingForFreeShipping.toFixed(2)} USD más para Envío Gratis`}
              </span>
              <span className="text-emerald-400 font-black">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* 3. Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 bg-[#F8FAFC]">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-slate-900">Tu carrito está vacío</p>
                <p className="text-xs text-slate-500 mt-1.5 max-w-xs font-medium">
                  Agrega teléfonos, consolas o accesorios desde el catálogo.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-6 py-3 rounded-xl text-xs font-black shadow-md shadow-blue-600/30 transition-all"
                >
                  Explorar Productos
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemPrice = parseFloat(item.price) || 0;
                return (
                  <div 
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/90 flex gap-3.5 items-center hover:border-slate-300 transition-all shadow-xs"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-slate-50 p-2 shrink-0 border border-slate-100 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="h-full object-contain" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-extrabold text-slate-900 truncate leading-snug">{item.name}</h4>
                      
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-xs font-black text-blue-600 font-inter">
                          ${itemPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold">USD</span>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-md hover:bg-white text-slate-600 transition-colors"
                            title="Disminuir"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-slate-900 w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-white text-slate-600 transition-colors"
                            title="Aumentar"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors shrink-0 rounded-xl hover:bg-red-50"
                      title="Eliminar del carrito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* 4. Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-slate-200 bg-white space-y-4 shadow-lg">
              
              {/* Cashea Notice Badge */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="bg-[#FFE600] text-black px-1.5 py-0.5 rounded font-black text-[9px]">CASHEA</span>
                  <span className="font-bold text-amber-900 text-[11px]">Financiable en cuotas</span>
                </div>
                <span className="text-[11px] font-black text-amber-900">0% Interés</span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-semibold">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-black">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío Nacional</span>
                  <span className="font-bold text-emerald-600">
                    {subtotal >= freeShippingThreshold ? 'GRATIS' : 'Por calcular'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-2.5 border-t border-slate-100">
                  <span>Total Estimado:</span>
                  <div className="flex items-baseline gap-1 text-right">
                    <span className="text-xl text-blue-600 font-black">
                      ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">USD</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-md shadow-emerald-600/25 active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white shrink-0" />
                <span>Completar Pedido por WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-medium text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Garantía Oficial M Store 1 Año • Atención Inmediata</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
