import React, { useState, useRef, useEffect } from 'react';
import { getAssistantResponse } from '../services/geminiService';
import { useTranslation } from '../contexts/LanguageContext';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Assistant: React.FC = () => {
  const { t, locale } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: t('assistantWelcome') }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponseText = await getAssistantResponse(input, locale);
      const botMessage: Message = { text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { text: t('assistantError'), sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-lg shadow-md">
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && <i className="fa-solid fa-robot text-xl text-primary self-start"></i>}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-se-none'
                    : 'bg-secondary text-text-main rounded-ss-none'
                }`}
              >
                <p className="text-start">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
               <i className="fa-solid fa-robot text-xl text-primary self-start"></i>
              <div className="px-4 py-3 bg-secondary rounded-2xl rounded-ss-none">
                 <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t bg-gray-50">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('assistantPlaceholder')}
            className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || input.trim() === ''}
            className="bg-primary text-white rounded-full h-10 w-10 flex-shrink-0 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;