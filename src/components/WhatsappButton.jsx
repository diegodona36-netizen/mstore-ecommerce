import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, CheckCheck } from 'lucide-react';

export const WhatsappButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '👋 ¡Hola! Bienvenido a M Store. ¿En qué podemos asesorarte hoy?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isSending, setIsSending] = useState(false);

  // Send message to internal API / WhatsApp
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

    setMessages(prev => [...prev, userMsgObj]);
    setInputText('');
    setIsSending(true);

    try {
      setTimeout(() => {
        const botResponseObj = {
          id: Date.now() + 1,
          sender: 'bot',
          text: 'Tu mensaje fue recibido. Un asesor de M Store te atenderá en unos momentos.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botResponseObj]);
        setIsSending(false);
      }, 600);
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop when chat is open */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden animate-fadeIn"
        />
      )}

      {/* Ventana Flotante del Chat */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-20 sm:bottom-24 sm:inset-x-auto sm:right-6 z-50 w-auto sm:w-96 max-w-sm mx-auto sm:mx-0 h-[420px] max-h-[70vh] bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col animate-fadeIn">
          
          {/* Header del Chat */}
          <div className="bg-slate-950 px-4 sm:px-5 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-black text-xs">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white leading-snug">Soporte y Atención M Store</h4>
                <p className="text-[10px] text-emerald-400 font-extrabold">En línea • Asesoramiento en vivo</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Historial de Mensajes */}
          <div className="flex-1 p-3.5 overflow-y-auto bg-slate-50 space-y-2.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
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
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:200ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:400ms]" />
              </div>
            )}
          </div>

          {/* Formulario de Envío */}
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
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white p-2.5 rounded-xl transition-all shadow-sm shrink-0 active:scale-95"
              title="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Botón Flotante para Abrir Chat */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 font-sans">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 hover:bg-black text-white shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border border-slate-800"
          aria-label="Abrir Chat de Atención al Cliente"
        >
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[9px] font-black text-white ring-2 ring-white">
            1
          </span>
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>
    </>
  );
};

export default WhatsappButton;
