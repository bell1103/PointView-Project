import React, { useState, useEffect } from 'react';
import './Upload.css';
import Sidebar from "../Sidebar";
import Notes from "../Notes";
import { fetchNotes } from "../utils/fetchNotes"; // import thisimport uuid from "react-uuid";
import Search from "../utils/Search";
import { uploadVideo } from "../utils/uploadVideo";
import { saveNote } from "../utils/saveNote";
import { deleteNote } from '../utils/deleteNote';
import { UserAuth } from "../../context/AuthContext";




export default function Upload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const { user } = UserAuth();


  useEffect(() => {
    const loadNotes = async () => {
      if (user?.id) {
        const userNotes = await fetchNotes(user.id);
        setNotes(userNotes);
      }
    };
    loadNotes();
  }, [user]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !user) return;
  
    setFile(selectedFile);
  
    const videoUrl = await uploadVideo(selectedFile, user.id);
    
    const active = getActiveNote();
    if (videoUrl && active) {
      const updatedNote = {
        ...getActiveNote(),
        video_url: videoUrl,
        lastModified: Date.now(),
        user_id: user.id,
      };
  
      onUpdateNote(updatedNote);
      await saveNote(updatedNote);
    }
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  const onAddNote = async () => {
    if (!user) return;

    const newNote = {
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
      user_id: user.id
    };
    

    const { data, error } = await saveNote(newNote);

    if (error || !data ||!data.id) {
      console.error("Failed to save note:", error, data);
      return;
    }
    
    setNotes((prevNotes) => [data, ...prevNotes]);
    setActiveNote(data.id);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
    saveNote(updatedNote);
  };


  const onDeleteNote = async (idToDelete) => {
    const { error } = await deleteNote(idToDelete);
  
    if (error) {
      console.error("Failed to delete note from Supabase:", error);
      return;
    }
  
    setNotes(notes.filter((note) => note.id !== idToDelete));
  
    // If the deleted note was active, clear it
    if (activeNote === idToDelete) {
      setActiveNote(null);
    }
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  

  return (
    <div className="page-container">

      <div className="notes-container">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}

        />
        <Notes 
          activeNote={getActiveNote()} 
          onUpdateNote={onUpdateNote} 
        />

      </div>

      <div className="search-container">
        <Search 
          notesData={notes} 
          setNotesData={setNotes} 
          setActiveNote={setActiveNote}
        />
      </div>


      <div className="upload-container">
        <h1>Upload Video</h1>

        <div
          className={`upload-box ${dragActive ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p>Drag & drop your video here, or click to select</p>
          )}

          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            id="fileInput"
            style={{ display: 'none' }}
          />
          <label htmlFor="fileInput" className="upload-label">
            Browse Files
          </label>
        </div>
      </div>
    </div>
  );

}
