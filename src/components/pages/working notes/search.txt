import React, { useState } from 'react';
import DateInput from './DateInput';

export default function Search({ notesData, setNotesData, setActiveNote }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDate, setSearchDate] = useState("");

    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleDateChange = (e) => {
        setSearchDate(e.target.value);
    };

    const filteredNotes = notesData.filter(note => {
        const matchesText = 
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.body.toLowerCase().includes(searchTerm.toLowerCase());
      
        // Validate date first
        const noteDate = new Date(note.date);
        const formattedNoteDate = !isNaN(noteDate) ? noteDate.toISOString().split('T')[0] : null;
      
        const matchesDate = searchDate === "" || formattedNoteDate === searchDate;
      
        return matchesText && matchesDate;
      });
      

    
    return (
        <div className="search-container">
        <div className="search-inputs">
        <input
            className="search-input"
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: '8px', padding: '5px' }}
        />

            <DateInput date={searchDate} onDateChange={handleDateChange} />

        </div>
        
        {searchTerm.trim() !== "" && (
        <div className="search-results">
            {filteredNotes.map(note => (
            <div 
                key={(note.id)} 
                className="search-result-box"
                onClick={() => {
                    setActiveNote(note.id); 
                    setSearchTerm('');
                }}

                style={{ cursor: 'pointer', padding: '5px' }}
            >
        
                <h3>
                    {note.title.length > 22
                    ? note.title.substr(0, 22) + '...'
                    : note.title}
                </h3>
            </div>
            ))}
        </div>
        )}
        </div>
    );
}