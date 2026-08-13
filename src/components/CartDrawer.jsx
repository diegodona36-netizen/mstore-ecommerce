import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-900 text-white">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Tu Carrito</h2>
                <p className="text-xs text-slate-500">{cartItems.length} producto(s) seleccionados</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-white px-6 py-4 border-b border-slate-200">
            <div className="flex justify-between text-xs mb-1.5 font-bold">
              <span className="text-slate-600">
                {subtotal >= freeShippingThreshold 
                  ? '¡Envío Gratis Desbloqueado!' 
                  : `Faltan $${(freeShippingThreshold - subtotal).toLocaleString()} para Envío Gratis`}
              </span>
              <span className="text-slate-900">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-900 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingCart className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-base font-bold text-slate-900">Tu carrito está vacío</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Explora el catálogo y añade los mejores smartphones y accesorios.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-xs font-bold shadow-sm transition-all"
                >
                  Explorar Productos
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-xl bg-white border border-slate-200 flex gap-4 items-center hover:border-slate-400 transition-all shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-slate-50 p-2 shrink-0 border border-slate-100 flex items-center justify-center">
                    <img src={item.image} alt={item.name} className="h-full object-contain" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight">{item.name}</h4>
                    <p className="text-xs font-black text-slate-900 mt-1 flex items-baseline gap-1">
                      <span>${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      <span className="text-[10px] text-slate-500">USD</span>
                    </p>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors shrink-0 rounded-lg hover:bg-red-50"
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
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="text-slate-900 font-bold">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Envío Exprés</span>
                  <span className="text-slate-900 font-bold">
                    {subtotal >= freeShippingThreshold ? 'GRATIS' : '$15 USD'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm font-black text-slate-900 pt-3 mt-2 border-t border-slate-200">
                  <span>Total Pedido:</span>
                  <div className="flex items-baseline gap-1 text-right">
                    <span className="text-lg text-slate-900 font-black">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    <span className="text-xs text-slate-500 font-bold">USD</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Primary Action */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white shadow-sm active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white shrink-0" />
                <span className="truncate">Comprar por WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-700" />
                <span>Pago contra entrega o transferencia protegida por M Store</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
