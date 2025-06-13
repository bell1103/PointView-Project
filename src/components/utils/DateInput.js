import React from 'react';

export default function DateInput({ date, onDateChange }) {
  return (
    <div className="date-input-wrapper">
      <label htmlFor="date-input">Filter by Date:</label>
      <input
        id="date-input"
        type="date"
        value={date || ''}
        onChange={(e) => onDateChange(e.target.value)}
        placeholder="Enter a date"
      />
    </div>
  );
}
