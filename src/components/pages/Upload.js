import React, { useState, useEffect, useMemo } from 'react';
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
      if (!user?.id) return; 

        const userNotes = await fetchNotes(user.id);
        setNotes(userNotes);
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
        user_id: user.id,
        date: active.date || new Date().toISOString(),
      };
  
      await onUpdateNote(updatedNote);
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
  const [activeNote, setActiveNote] = useState(null);

  const onAddNote = async () => {
    console.log("Add note clicked");
    if (!user) return;
    
    
    const newNote = {
      user_id: user.id,
      title: "Untitled Note",
      body: "",
      date: new Date().toISOString(), 

    };
    

    const { data, error } = await saveNote(newNote);

    if (error || !data ||!data.id) {
      console.error("Failed to save note:", error, data);
      return;
    }
    
    setNotes((prevNotes) => [data, ...prevNotes]);
    setActiveNote(String(data.id));
  };

  const onUpdateNote = async (updatedNote) => {
    const { error, data } = await saveNote(updatedNote);
    if (error) {
      console.error("Error saving note:", error);
      return;
    }
  
    setNotes((prevNotes) => {
      const updatedNotesArray = prevNotes.map((note) =>
        note.id === data.id ? data : note
      );
      return updatedNotesArray;
    });
  };
  
  

  const onEditDate = async (id, newDate) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, date: new Date(newDate).toISOString() } : note
    );
    setNotes(updatedNotes);
  
    const updatedNote = updatedNotes.find((note) => note.id === id);
    const { error } = await saveNote(updatedNote);
    if (error) {
      console.error("Error saving date from sidebar:", error);
    }
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

  const getActiveNote = () => notes.find(note => String(note.id) === String(activeNote));


  const videoElement = useMemo(() => {
    if (!file) return null;
  
    const videoURL = URL.createObjectURL(file);
    return (
      <div className="display-video">
        <p className="video-title">{file.name}</p>
        <video
          className="video-player"
          key={videoURL}
          controls
        >
          <source src={videoURL} type={file.type} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }, [file]);

  

  return (
    <div className="page-container">

      <div className="notes-container">
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
          onEditDate={onEditDate}
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
          {file ? videoElement: (
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
