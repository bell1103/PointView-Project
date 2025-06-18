import React, { useState } from 'react';
import './SearchBar.css'; // optional styling

export default function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value); // pass back to parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by note title..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
    </div>
  );
}
