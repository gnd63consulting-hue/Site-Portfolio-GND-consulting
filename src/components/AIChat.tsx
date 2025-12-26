import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageCircle, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectUpdate: (projectDescription: string) => void;
}

export function AIChat({ isOpen, onClose, onProjectUpdate }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Bonjour ! Je suis votre assistant IA spécialisé dans les projets créatifs. Je vais vous aider à définir précisément vos besoins pour votre projet. Pouvez-vous me parler de votre entreprise et de ce que vous souhaitez réaliser ?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulation d'une réponse IA intelligente
    const responses = {
      greeting: [
        "Parfait ! Pour mieux vous conseiller, pouvez-vous me dire dans quel secteur d'activité vous évoluez ?",
        "Excellent ! Quel est votre secteur d'activité et quelle est la taille de votre entreprise ?"
      ],
      business: [
        "Intéressant ! Quels sont vos principaux objectifs avec ce projet ? Voulez-vous augmenter votre visibilité, générer plus de leads, ou améliorer votre image de marque ?",
        "Très bien ! Quel budget avez-vous prévu pour ce projet et dans quels délais souhaitez-vous le réaliser ?"
      ],
      objectives: [
        "Parfait ! Avez-vous déjà une identité visuelle établie ou faut-il tout créer de zéro ? Et sur quels canaux souhaitez-vous communiquer principalement ?",
        "Excellent ! Pour maximiser l'impact, recommanderiez-vous plutôt du contenu vidéo, des visuels statiques, ou un mix des deux ?"
      ],
      technical: [
        "Basé sur nos échanges, je recommande un package comprenant : création d'identité visuelle, production de contenu vidéo professionnel, et stratégie de communication digitale. Cela correspond parfaitement à vos besoins !",
        "D'après votre profil, un accompagnement complet avec production audiovisuelle 8K, design d'identité premium et stratégie IA serait idéal pour votre projet."
      ]
    };

    // Logique simple pour déterminer le type de réponse
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('entreprise') || lowerMessage.includes('société') || lowerMessage.includes('business')) {
      return responses.business[Math.floor(Math.random() * responses.business.length)];
    } else if (lowerMessage.includes('objectif') || lowerMessage.includes('but') || lowerMessage.includes('goal')) {
      return responses.objectives[Math.floor(Math.random() * responses.objectives.length)];
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('délai') || lowerMessage.includes('timing')) {
      return responses.technical[Math.floor(Math.random() * responses.technical.length)];
    } else {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }
  };

  const saveConversation = async (userMessage: string, aiResponse: string) => {
    try {
      await supabase.from('ai_conversations').insert({
        session_id: sessionId,
        message_user: userMessage,
        reponse_ai: aiResponse,
        intention_detectee: 'conseil_projet',
        sentiment: 'positif',
        niveau_interet: 4,
        lead_potentiel: true
      });
    } catch (error) {
      console.error('Erreur sauvegarde conversation:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulation du délai de réponse de l'IA
    setTimeout(async () => {
      const aiResponse = await generateAIResponse(inputText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Sauvegarder la conversation
      await saveConversation(inputText, aiResponse);

      // Mettre à jour la description du projet avec un résumé
      const projectSummary = messages
        .filter(m => m.isUser)
        .map(m => m.text)
        .join(' ');
      onProjectUpdate(projectSummary + ' ' + inputText);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="glass rounded-3xl w-full max-w-2xl h-[600px] border border-[#20C2A3]/30 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#20C2A3]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#20C2A3] to-[#40D4B8] rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Assistant IA GND</h3>
              <p className="text-[#A0AEC0] text-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Simulation GPT-4o (Demo)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-red-500/20 hover:bg-red-500/30 rounded-full flex items-center justify-center transition-all duration-300 border border-red-500/30"
          >
            <X className="w-4 h-4 text-red-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[400px]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-br from-[#20C2A3] to-[#40D4B8] text-black'
                    : 'glass border border-[#20C2A3]/20 text-white'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span className={`text-xs mt-2 block ${
                  message.isUser ? 'text-black/70' : 'text-[#A0AEC0]'
                }`}>
                  {message.timestamp.toLocaleTimeString('fr-FR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="glass border border-[#20C2A3]/20 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#20C2A3] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#20C2A3] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#20C2A3] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-[#A0AEC0] text-sm">L'IA réfléchit...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-[#20C2A3]/20">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Décrivez votre projet..."
              className="flex-1 px-4 py-3 bg-black/50 border border-[#20C2A3]/30 rounded-xl text-white text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#20C2A3]/20 focus:border-[#20C2A3] backdrop-blur-sm disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="w-12 h-12 bg-gradient-to-br from-[#20C2A3] to-[#40D4B8] rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* Effet holographique de fond */}
        <div className="absolute inset-0 holographic opacity-10 pointer-events-none"></div>
      </div>
    </div>
  );
}