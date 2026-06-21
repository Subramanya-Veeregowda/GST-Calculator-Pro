import React from 'react';
import { Search } from 'lucide-react';

export const HistoryFilters = ({ searchQuery, onSearchChange, filterType, onFilterChange, activeTab }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={activeTab === 'calculations' ? "Search amount or rate..." : "Search invoice, customer, or phone..."}
          className="w-full pl-10 pr-4 py-2.5 bg-bg-base border border-border rounded-xl text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-text-muted text-text-primary"
        />
      </div>
      <div className="w-full md:w-48">
        <select
          value={filterType}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-bg-base border border-border rounded-xl text-sm text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          {activeTab === 'invoices' && (
            <>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </>
          )}
        </select>
      </div>
    </div>
  );
};
