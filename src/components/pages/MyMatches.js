import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../utils/fetchNotes';
import SearchBar from '../SearchBar';
import SortFilterBar from '../SortFilterBar';
import VideoThumbnail from '../VideoThumbnail'
import './MyMatches.css';
import Footer from '../Footer';
import {useNavigate} from 'react-router-dom';

export default function MyMatches() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [matchType, setMatchType] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const navigate = useNavigate();

  const handleMatchClick = (id) => {
    navigate(`/play/${id}`);
  };


  useEffect(() => {
    const loadNotes = async () => {
      const { data, error } = await fetchNotes();
      if (!error) {
        setNotes(data);
        setFilteredNotes(data);
      }
    };
    loadNotes();
  }, []);

  useEffect(() => {
    let result = [...(notes || [])];

    // Search filter
    if (search.trim()) {
      result = result.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Match type filter
    if (matchType) {
      result = result.filter((note) => note.match_type === matchType);
    }

    // Time frame filter
    if (timeFrame) {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setDate(now.getDate() - parseInt(timeFrame));
      result = result.filter((note) => new Date(note.date) >= cutoff);
    }

    // Sort
    result.sort((a, b) => {
      const dA = new Date(a.date);
      const dB = new Date(b.date);
      return sortOrder === 'newest' ? dB - dA : dA - dB;
    });

    setFilteredNotes(result);
  }, [search, sortOrder, matchType, timeFrame, notes]);

  return (
    <div className="matches-page">
      <h2>All My Matches</h2>

      {/* Search Bar */}
      <SearchBar handleSearch={setSearch} />

      {/* Sort & Filter Bar */}
      <SortFilterBar
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        matchTypeFilter={matchType}
        setMatchTypeFilter={setMatchType}
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
      />

      {/* Matches Grid */}
    <div className="matches-grid">
        {filteredNotes && filteredNotes.length > 0 ? (
        filteredNotes.map((note) => (
        <div 
            key={note.id} 
            className="match-card"
            onClick={() => handleMatchClick(note.id)}
        >
            {note.video_url ? (
            <VideoThumbnail
                videoUrl={note.video_url}
                defaultImage="/images/note_icon.png" 
            />
            ) : (
            <img
                src="/images/note_icon.png"
                alt="No video thumbnail"
                className="video-thumb"
            />
            )}
            <h4>{note.title}</h4>
            <p>{note.match_type}</p>
            <p>{note.date?.split('T')[0]}</p>
        </div>
        ))
        ) : (
        <p>No matches found.</p>
        )}
        </div>
        <footer className="matches-footer">
            <Footer/>
        </footer>
    </div>
  );
}
