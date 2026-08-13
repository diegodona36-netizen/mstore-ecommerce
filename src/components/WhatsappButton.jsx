import React, { useState } from 'react';
import { MessageSquare, X, Send, User, Bot, CheckCheck } from 'lucide-react';

export const WhatsappButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '👋 ¡Hola! Bienvenido a M Store. ¿En qué podemos ayudarte hoy? Un asesor responderá a tus dudas.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isSending, setIsSending] = useState(false);

  // Send message to internal API / Database
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = inputText.trim();
    if (!text) return;

    const userMessageTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgObj = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: userMessageTime
    };

    // Append user message immediately
    setMessages(prev => [...prev, userMsgObj]);
    setInputText('');
    setIsSending(true);

    try {
      // Internal API Integration Placeholder for future Admin Dashboard response
      // Example: await fetch('/api/chat/send', { method: 'POST', body: JSON.stringify(userMsgObj) });
      
      // Simulate rapid server delivery & auto-confirmation response
      setTimeout(() => {
        const botResponseObj = {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Tu mensaje ha sido enviado a un asesor. Te responderemos por aquí en breve.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponseObj]);
        setIsSending(false);
      }, 600);

    } catch (error) {
      console.error('Error enviando mensaje a la API interna:', error);
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end font-sans">
      
      {/* Ventana Flotante del Chat Interno */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn flex flex-col h-[420px]">
          
          {/* Header del Chat (Fondo Oscuro Premium slate-900) */}
          <div className="bg-slate-900 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-black text-xs">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900 animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-xs font-black text-white leading-snug">Soporte y Atención M Store</h4>
                <p className="text-[10px] text-emerald-400 font-extrabold">En línea • Asesoramiento en vivo</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Historial de Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none font-medium'
                  }`}
                >
                  {msg.text}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-400 font-semibold px-1">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium italic p-2">
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
          </div>

          {/* Formulario de Envío (Input Real + Submit) */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Escribe tu consulta aquí..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-100 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all shadow-sm shrink-0 active:scale-95"
              title="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Botón Flotante para Abrir Chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 border border-slate-700"
        aria-label="Abrir Chat de Atención al Cliente"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[9px] font-black text-white ring-2 ring-white">
          1
        </span>
        <MessageSquare className="w-6 h-6 text-white" />
      </button>

    </div>
  );
};
