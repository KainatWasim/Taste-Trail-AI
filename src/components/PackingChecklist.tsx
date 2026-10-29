import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Plus, Trash2, RotateCcw, Sparkles } from 'lucide-react';
import { PackingChecklistItem } from '../types/travel';

const STORAGE_KEY = 'tastetrail_packing_checklist';

const DEFAULT_PACKING_ITEMS: PackingChecklistItem[] = [
  // Documents
  { id: 'p_1', item: 'Valid Passport (6+ months) & physical photocopies', category: 'documents', isPacked: false, isEssential: true },
  { id: 'p_2', item: 'Flight confirmations & offline QR codes', category: 'documents', isPacked: false, isEssential: true },
  { id: 'p_3', item: 'Travel medical insurance policy details', category: 'documents', isPacked: false, isEssential: true },
  // Clothing
  { id: 'p_4', item: 'Slip-on comfortable shoes for temple verandas and tatami', category: 'clothing', isPacked: false, isEssential: true, tip: 'Avoid laces if visiting 3+ shrines daily' },
  { id: 'p_5', item: 'Breathable linen / lightweight layers for humid evenings', category: 'clothing', isPacked: false, isEssential: false },
  { id: 'p_6', item: 'Modest shoulder-covering attire for historic cathedrals', category: 'clothing', isPacked: false, isEssential: true },
  // Electronics
  { id: 'p_7', item: 'Universal plug adapter & USB-C fast charger', category: 'electronics', isPacked: false, isEssential: true },
  { id: 'p_8', item: 'Compact portable power bank (under 100Wh for airline safety)', category: 'electronics', isPacked: false, isEssential: true },
  { id: 'p_9', item: 'Noise-canceling headphones for train journeys & flights', category: 'electronics', isPacked: false, isEssential: false },
  // Toiletries
  { id: 'p_10', item: 'Electrolyte hydration tablets & personal medication', category: 'toiletries', isPacked: false, isEssential: true },
  { id: 'p_11', item: 'Small hand towel / tenugui (many shrines do not have paper towels)', category: 'toiletries', isPacked: false, isEssential: false, tip: 'Traditional Japanese tenugui is ideal' },
  // Cultural Etiquette
  { id: 'p_12', item: 'Coin pouch for Yen / Euro coins and vending machines', category: 'cultural_etiquette', isPacked: false, isEssential: true },
  { id: 'p_13', item: 'Pocket notebook & fine ink pen for stamps (Goshuin) or notes', category: 'cultural_etiquette', isPacked: false, isEssential: false },
];

export const PackingChecklist: React.FC = () => {
  const [items, setItems] = useState<PackingChecklistItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse stored packing list', e);
    }
    return DEFAULT_PACKING_ITEMS;
  });

  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PackingChecklistItem['category']>('clothing');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save packing list to localStorage', e);
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPacked: !item.isPacked } : item))
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem: PackingChecklistItem = {
      id: `p_custom_${Date.now()}`,
      item: newItemText.trim(),
      category: newItemCategory,
      isPacked: false,
      isEssential: false,
    };

    setItems((prev) => [newItem, ...prev]);
    setNewItemText('');
  };

  const handleReset = () => {
    if (window.confirm('Reset packing checklist to standard cultural defaults?')) {
      setItems(DEFAULT_PACKING_ITEMS);
    }
  };

  const packedCount = items.filter((i) => i.isPacked).length;
  const progressPct = Math.round((packedCount / Math.max(items.length, 1)) * 100);

  const categories = [
    { key: 'documents', label: 'Travel Documents' },
    { key: 'clothing', label: 'Clothing & Tactile Footwear' },
    { key: 'electronics', label: 'Electronics & Audio' },
    { key: 'toiletries', label: 'Wellness & Comfort' },
    { key: 'cultural_etiquette', label: 'Cultural & Ritual Essentials' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2 flex items-center justify-center gap-1.5">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Curated Travel Gear</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
          Smart Cultural Packing Checklist
        </h2>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          Essential items tailored to temple etiquette, acoustic walking routes, and regional electrical standards.
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex items-center justify-between text-xs text-[#d9d2c5]">
          <span className="font-semibold text-[#f7f3eb]">
            Packing Progress ({packedCount} of {items.length} items packed)
          </span>
          <span className="font-mono text-[#00c5b2] font-bold">{progressPct}%</span>
        </div>

        <div className="w-full h-3 bg-[#0b111e] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00c5b2] transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleReset}
            className="text-xs text-[#d9d2c5]/60 hover:text-[#d9d2c5] flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset to Defaults</span>
          </button>
        </div>
      </div>

      {/* Add Item Form */}
      <form
        onSubmit={handleAddItem}
        className="bg-[#121b2f]/80 border border-[#1b2844] rounded-2xl p-4 shadow-md flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add custom travel item (e.g. Field Audio Recorder)..."
          className="flex-1 bg-[#0b111e] border border-[#1b2844] rounded-xl px-4 py-2.5 text-sm text-[#f7f3eb] focus:outline-none focus:border-[#00c5b2]"
        />

        <select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value as any)}
          aria-label="Item category"
          className="bg-[#0b111e] border border-[#1b2844] text-[#f7f3eb] text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#00c5b2]"
        >
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-5 py-2.5 bg-[#00c5b2] hover:bg-[#02e0cb] text-[#070b14] font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Categorized Lists */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const categoryItems = items.filter((item) => item.category === cat.key);
          if (categoryItems.length === 0) return null;

          return (
            <div
              key={cat.key}
              className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-5 shadow-xl space-y-3"
            >
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-[#00c5b2]">
                {cat.label}
              </h3>

              <div className="divide-y divide-[#1b2844]/60">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 flex items-start justify-between gap-3 group"
                  >
                    <div
                      onClick={() => toggleItem(item.id)}
                      className="flex items-start gap-3 cursor-pointer flex-1"
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-[#00c5b2] flex-shrink-0"
                        aria-label={item.isPacked ? 'Mark as unpacked' : 'Mark as packed'}
                      >
                        {item.isPacked ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : (
                          <Square className="w-5 h-5 text-[#d9d2c5]/40" />
                        )}
                      </button>

                      <div>
                        <span
                          className={`text-sm ${
                            item.isPacked
                              ? 'line-through text-[#d9d2c5]/50'
                              : 'text-[#f7f3eb]'
                          }`}
                        >
                          {item.item}
                        </span>

                        {item.tip && (
                          <div className="text-xs text-[#e8c582] mt-0.5 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>{item.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 text-[#d9d2c5]/40 hover:text-red-400 p-1 transition-all"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
