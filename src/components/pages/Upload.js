import React, { useState, useEffect} from 'react';
// import './Upload.css';
import Sidebar from "../Sidebar";
import Notes from "../Notes";
import { fetchNotes } from "../utils/fetchNotes"; 
import { fetchVideosMetadata } from '../utils/fetchVideosMetadata';
import Search from "../utils/Search";
import { uploadVideo } from "../utils/uploadVideo";
import { saveNote } from "../utils/saveNote";
import { deleteNote } from '../utils/deleteNote';
import { UserAuth } from "../../context/AuthContext";





export default function Upload() {
  const [video, setVideos] = useState([]);
  const { user } = UserAuth();

  



  useEffect(() => {
    const loadData = async () => {
      if (!user?.id) return; 
      
      try {
        const userNotes = await fetchNotes(user.id);
        setNotes(userNotes || []);

        const userVideos = await fetchVideosMetadata(user.id);
        setVideos(userVideos || []);
      } catch (error) {
        console.error("Error loading data:", error);
        setNotes([]);
        setVideos([]);
      }
  
    };

    loadData();
  }, [user]);

  // const handleFileChange = async (e) => {
  //   const selectedFile = e.target.files[0];
  //   if (!selectedFile || !user || !activeNote) return;
  
  //   const noteToUpdate = getActiveNote();
  //   if (!noteToUpdate) {
  //     console.error("No active note selected to attach the video.");
  //     return;
  //   }
  
  //   const videoUrl = await uploadVideo(selectedFile, user.id);
  //   if (!videoUrl) return;
  
  //   const updatedNote = {
  //     ...noteToUpdate,
  //     video_url: videoUrl,
  //     date: noteToUpdate.date || new Date().toISOString(),
  //   };
  
  //   const { data, error } = await saveNote(updatedNote);
  //   if (error) {
  //     console.error("Error saving note with video URL:", error);
  //     return;
  //   }
  
  //   setNotes((prevNotes) =>
  //     prevNotes.map((note) =>
  //       note.id === data.id ? data : note
  //     )
  //   );
  
    
  //   setActiveNote(String(data.id));
  // };
  

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
      video_url: null,

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
        <div className="note-and-video">
          <Notes 
            activeNote={getActiveNote()} 
            onUpdateNote={onUpdateNote} 
          />
  
        </div>
      </div>
  
      <div className="search-container">
        <Search 
          notesData={notes} 
          setNotesData={setNotes} 
          setActiveNote={setActiveNote}
        />
      </div>
    </div>
  );

}
  