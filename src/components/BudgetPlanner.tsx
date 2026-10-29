import React, { useState } from 'react';
import { DollarSign, PieChart, AlertCircle, CheckCircle, TrendingUp, Wallet, Shield } from 'lucide-react';
import { BudgetSummary, BudgetCategoryItem } from '../types/travel';

interface BudgetPlannerProps {
  initialTotalBudget?: number;
  durationDays?: number;
  travelersCount?: number;
}

const DEFAULT_ITEMS: BudgetCategoryItem[] = [
  { id: 'b_flights', category: 'flights', label: 'International Flights', plannedAmount: 850, actualAmount: 790, notes: 'Direct roundtrip' },
  { id: 'b_lodging', category: 'lodging', label: 'Boutique & Heritage Stays', plannedAmount: 960, actualAmount: 960, notes: '3 nights in machiya' },
  { id: 'b_dining', category: 'dining', label: 'Cultural Dining & Teahouses', plannedAmount: 480, actualAmount: 420, notes: 'Obanzai, tea tasting, market strolls' },
  { id: 'b_activities', category: 'activities', label: 'Experiences & Museum Entry', plannedAmount: 220, actualAmount: 180, notes: 'Temple verandas & vinyl bars' },
  { id: 'b_transit', category: 'transit', label: 'Local Transit & High-Speed Rail', plannedAmount: 160, actualAmount: 140, notes: 'IC card & regional pass' },
  { id: 'b_misc', category: 'misc', label: 'Artisan Goods & Incidentals', plannedAmount: 250, actualAmount: 210, notes: 'Ceramics & local green tea' },
];

export const BudgetPlanner: React.FC<BudgetPlannerProps> = ({
  initialTotalBudget = 3000,
  durationDays = 4,
  travelersCount = 1,
}) => {
  const [totalBudget, setTotalBudget] = useState(initialTotalBudget);
  const [items, setItems] = useState<BudgetCategoryItem[]>(DEFAULT_ITEMS);

  const totalPlanned = items.reduce((sum, item) => sum + item.plannedAmount, 0);
  const totalActual = items.reduce((sum, item) => sum + item.actualAmount, 0);
  const remainingBudget = totalBudget - totalPlanned;
  const perDayCost = Math.round(totalPlanned / Math.max(durationDays, 1));
  const perPersonCost = Math.round(totalPlanned / Math.max(travelersCount, 1));

  const handleUpdateItem = (id: string, plannedAmount: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, plannedAmount } : item))
    );
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'flights': return '#38bdf8';
      case 'lodging': return '#00c5b2';
      case 'dining': return '#f59e0b';
      case 'activities': return '#a855f7';
      case 'transit': return '#10b981';
      default: return '#e8c582';
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#00c5b2] mb-2 flex items-center justify-center gap-1.5">
          <Wallet className="w-3.5 h-3.5" />
          <span>Cultural Expense Intelligence</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f7f3eb]">
          Smart Travel Budget Planner
        </h2>
        <p className="mt-2 text-sm text-[#d9d2c5]">
          Balance flights, heritage lodging, artisanal dining, and experiential investments with zero hidden surprises.
        </p>
      </div>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-5 shadow-lg">
          <div className="text-xs uppercase tracking-wider text-[#d9d2c5]/60">Total Target Budget</div>
          <div className="text-2xl font-bold font-display text-[#f7f3eb] mt-1">
            ${totalBudget.toLocaleString()} <span className="text-xs font-normal text-[#d9d2c5]/60">USD</span>
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="1000"
              max="10000"
              step="100"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="w-full accent-[#00c5b2]"
            />
          </div>
        </div>

        <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-5 shadow-lg">
          <div className="text-xs uppercase tracking-wider text-[#d9d2c5]/60">Total Planned Allocation</div>
          <div className="text-2xl font-bold font-display text-[#00c5b2] mt-1">
            ${totalPlanned.toLocaleString()} <span className="text-xs font-normal text-[#d9d2c5]/60">USD</span>
          </div>
          <div className="text-xs text-[#d9d2c5]/70 mt-1">
            {remainingBudget >= 0 ? (
              <span className="text-[#10b981] flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                ${remainingBudget.toLocaleString()} remaining buffer
              </span>
            ) : (
              <span className="text-[#f43f5e] flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                ${Math.abs(remainingBudget).toLocaleString()} over target
              </span>
            )}
          </div>
        </div>

        <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-5 shadow-lg">
          <div className="text-xs uppercase tracking-wider text-[#d9d2c5]/60">Daily Cadence Rate</div>
          <div className="text-2xl font-bold font-display text-[#e8c582] mt-1">
            ${perDayCost} <span className="text-xs font-normal text-[#d9d2c5]/60">/ day</span>
          </div>
          <div className="text-xs text-[#d9d2c5]/70 mt-1">
            Based on {durationDays} cultural days
          </div>
        </div>

        <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-5 shadow-lg">
          <div className="text-xs uppercase tracking-wider text-[#d9d2c5]/60">Per Traveler Metric</div>
          <div className="text-2xl font-bold font-display text-[#f7f3eb] mt-1">
            ${perPersonCost} <span className="text-xs font-normal text-[#d9d2c5]/60">/ person</span>
          </div>
          <div className="text-xs text-[#d9d2c5]/70 mt-1">
            For {travelersCount} traveler{travelersCount > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Visual Multi-Segment Allocation Bar */}
      <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs text-[#d9d2c5]">
          <span className="font-semibold text-[#f7f3eb]">Budget Allocation Distribution</span>
          <span>{Math.round((totalPlanned / Math.max(totalBudget, 1)) * 100)}% of Total Allocated</span>
        </div>

        <div className="w-full h-3.5 bg-[#0b111e] rounded-full overflow-hidden flex">
          {items.map((item) => {
            const pct = (item.plannedAmount / Math.max(totalPlanned, 1)) * 100;
            return (
              <div
                key={item.id}
                style={{ width: `${pct}%`, backgroundColor: getCategoryColor(item.category) }}
                className="h-full transition-all duration-300"
                title={`${item.label}: $${item.plannedAmount} (${Math.round(pct)}%)`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-1.5 text-xs text-[#d9d2c5]">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: getCategoryColor(item.category) }}
              />
              <span>{item.label} (${item.plannedAmount})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Adjustment Table */}
      <div className="bg-[#121b2f] border border-[#1b2844] rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="font-display font-bold text-lg text-[#f7f3eb]">
          Category Breakdown & Adjustment
        </h3>

        <div className="divide-y divide-[#1b2844]/80">
          {items.map((item) => (
            <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-3.5 h-3.5 rounded-md"
                  style={{ backgroundColor: getCategoryColor(item.category) }}
                />
                <div>
                  <div className="text-sm font-semibold text-[#f7f3eb]">{item.label}</div>
                  <div className="text-xs text-[#d9d2c5]/60">{item.notes}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#0b111e] border border-[#1b2844] rounded-xl px-3 py-1.5">
                  <span className="text-xs text-[#d9d2c5]/60 font-mono">$</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={item.plannedAmount}
                    onChange={(e) => handleUpdateItem(item.id, Number(e.target.value))}
                    className="w-24 bg-transparent text-sm text-[#f7f3eb] font-mono focus:outline-none text-right"
                  />
                  <span className="text-xs text-[#d9d2c5]/60">USD</span>
                </div>

                <div className="w-24 text-right text-xs text-[#d9d2c5]/70">
                  {Math.round((item.plannedAmount / Math.max(totalPlanned, 1)) * 100)}% of total
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
