import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MapPin, Compass, ArrowRight, CornerDownLeft } from 'lucide-react';
import { CulturalEntity, TravelPreferences } from '../types/travel';
import { RecommendationCard } from './RecommendationCard';
import { EntityDetailModal } from './EntityDetailModal';

interface ConversationalAssistantProps {
  savedEntities: CulturalEntity[];
  onToggleSave: (entity: CulturalEntity) => void;
  onApplyPreferencesToDiscover: (prefs: Partial<TravelPreferences>) => void;
}

interface ChatItem {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  extractedPreferences?: Partial<TravelPreferences>;
  recommendations?: CulturalEntity[];
  suggestedPrompts?: string[];
}

const DEFAULT_STARTER_PROMPTS = [
  'I enjoy Pakistani food, historic architecture, and peaceful places. Suggest experiences for a weekend trip.',
  'I love vinyl jazz listening bars, quiet gardens, and brutalist architecture in Kyoto.',
  'Recommend natural wine cellars and authentic tile artisans in Lisbon.',
  'I want ancestral mezcal distilleries and indigenous textile weavers in Oaxaca.',
];

export const ConversationalAssistant: React.FC<ConversationalAssistantProps> = ({
  savedEntities,
  onToggleSave,
  onApplyPreferencesToDiscover,
}) => {
  const [messages, setMessages] = useState<ChatItem[]>([
    {
      id: 'welcome_1',
      sender: 'assistant',
      text: "Hello! I'm your TasteTrail AI Cultural Concierge. Tell me about what you genuinely enjoy—your favorite music, architectural styles, culinary obsessions, or travel moods—and I will connect your taste to Qloo-powered cultural discoveries.",
      suggestedPrompts: DEFAULT_STARTER_PROMPTS,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeDetailEntity, setActiveDetailEntity] = useState<CulturalEntity | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isTyping) return;

    const userMessageItem: ChatItem = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: userText,
    };

    setMessages((prev) => [...prev, userMessageItem]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.slice(-4).map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMessageItem: ChatItem = {
        id: `assistant_${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "Here are cultural recommendations matching your taste profile.",
        extractedPreferences: data.extractedPreferences,
        recommendations: data.recommendations || [],
        suggestedPrompts: data.suggestedFollowUps || [],
      };

      setMessages((prev) => [...prev, assistantMessageItem]);
    } catch (err: any) {
      console.error('Assistant error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant_err_${Date.now()}`,
          sender: 'assistant',
          text: "I encountered a brief hiccup reaching the cultural intelligence endpoint. However, here are recommendations tailored to your architectural and quiet exploration preferences.",
          recommendations: [],
          suggestedPrompts: DEFAULT_STARTER_PROMPTS.slice(0, 2),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const isEntitySaved = (id: string) => savedEntities.some((item) => item.id === id);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header bar */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#0b111e] p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00c5b2] to-[#121b2f] text-[#070b14]">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-[#f7f3eb]">
              Conversational Travel Discovery Agent
            </h2>
            <p className="text-xs text-[#d9d2c5]">
              Natural language taste extraction powered by Qloo Cultural Intelligence & Gemini.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="rounded-2xl border border-[#1b2844] bg-[#070b14] p-4 sm:p-6 min-h-[500px] max-h-[700px] overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Message Bubble */}
            <div
              className={`max-w-[85%] rounded-2xl p-4 sm:p-5 text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-[#00c5b2] text-[#070b14] font-medium shadow-md'
                  : 'bg-[#0b111e] border border-[#1b2844] text-[#f7f3eb]'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 text-xs opacity-75">
                {msg.sender === 'user' ? (
                  <>
                    <User className="h-3.5 w-3.5" />
                    <span>Your Taste Inquiry</span>
                  </>
                ) : (
                  <>
                    <Bot className="h-3.5 w-3.5 text-[#00c5b2]" />
                    <span>TasteTrail Concierge</span>
                  </>
                )}
              </div>
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* Extracted Preferences badge strip if present */}
              {msg.extractedPreferences && (
                <div className="mt-4 pt-3 border-t border-[#1b2844] text-xs text-[#d9d2c5]">
                  <div className="flex items-center gap-1.5 font-semibold text-[#00c5b2] mb-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Extracted Cultural Signals:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {msg.extractedPreferences.destination && (
                      <span className="rounded bg-[#121b2f] border border-[#1b2844] px-2 py-0.5 text-[11px] text-[#f7f3eb]">
                        Destination: {msg.extractedPreferences.destination}
                      </span>
                    )}
                    {msg.extractedPreferences.interests?.map((i) => (
                      <span
                        key={i}
                        className="rounded bg-[#121b2f] border border-[#1b2844] px-2 py-0.5 text-[11px] text-[#00c5b2]"
                      >
                        Interest: {i.replace('_', ' ')}
                      </span>
                    ))}
                    {msg.extractedPreferences.travelMood && (
                      <span className="rounded bg-[#121b2f] border border-[#1b2844] px-2 py-0.5 text-[11px] text-[#e8c582]">
                        Mood: {msg.extractedPreferences.travelMood}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onApplyPreferencesToDiscover(msg.extractedPreferences!)}
                    className="mt-3 flex items-center gap-1 text-xs text-[#00c5b2] hover:underline"
                  >
                    <span>Load these into Discovery Engine</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Embedded Recommended Entities right inside the chat feed! */}
            {msg.recommendations && msg.recommendations.length > 0 && (
              <div className="mt-4 w-full max-w-4xl space-y-3">
                <div className="text-xs font-semibold text-[#00c5b2] uppercase tracking-wider">
                  Recommended Cultural Entities ({msg.recommendations.length}):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {msg.recommendations.map((entity) => (
                    <RecommendationCard
                      key={entity.id}
                      entity={entity}
                      isSaved={isEntitySaved(entity.id)}
                      onToggleSave={onToggleSave}
                      onOpenDetails={setActiveDetailEntity}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Follow-ups */}
            {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 max-w-[85%]">
                {msg.suggestedPrompts.map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    className="rounded-lg border border-[#1b2844] bg-[#0b111e] px-3 py-1.5 text-xs text-[#d9d2c5] hover:border-[#00c5b2]/40 hover:text-[#00c5b2] transition-colors text-left"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#00c5b2] bg-[#0b111e] border border-[#1b2844] rounded-xl px-4 py-3 w-fit">
            <div className="h-2 w-2 animate-bounce rounded-full bg-[#00c5b2]" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-[#00c5b2] delay-100" />
            <div className="h-2 w-2 animate-bounce rounded-full bg-[#00c5b2] delay-200" />
            <span className="ml-2 font-mono text-[11px]">Connecting cultural signals...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="relative flex items-center"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Describe your travel desires (e.g., "I love historic architecture, quiet places, and local food...")'
          className="w-full rounded-xl border border-[#1b2844] bg-[#0b111e] py-3.5 pl-4 pr-14 text-sm text-[#f7f3eb] placeholder-[#d9d2c5]/40 focus:border-[#00c5b2] focus:outline-none focus:ring-1 focus:ring-[#00c5b2]"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#00c5b2] text-[#070b14] hover:bg-[#02e0cb] disabled:opacity-40 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      {/* Detail Modal */}
      <EntityDetailModal
        entity={activeDetailEntity}
        onClose={() => setActiveDetailEntity(null)}
        isSaved={activeDetailEntity ? isEntitySaved(activeDetailEntity.id) : false}
        onToggleSave={onToggleSave}
      />
    </div>
  );
};
