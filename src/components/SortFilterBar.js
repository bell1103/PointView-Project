import React from 'react';

export default function SortFilterBar({
  sortOrder,
  setSortOrder,
  matchTypeFilter,
  setMatchTypeFilter,
  timeFrame,
  setTimeFrame,
}) {
  return (
    <div className="sort-filter-bar">
      {/* Sort by Date */}
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="newest">Sort by Newest</option>
        <option value="oldest">Sort by Oldest</option>
      </select>

      {/* Filter by Match Type */}
      <select
        value={matchTypeFilter}
        onChange={(e) => setMatchTypeFilter(e.target.value)}
      >
        <option value="">All Match Types</option>
        <option value="Singles">Singles</option>
        <option value="Doubles">Doubles</option>
      </select>

      {/* Filter by Time Frame */}
      <select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
        <option value="">All Time</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="custom">Custom Range</option>
      </select>
    </div>
  );
}
