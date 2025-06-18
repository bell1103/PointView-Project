import React, { useState, useRef, useMemo } from 'react'
import { saveNote } from './utils/saveNote';
import { uploadVideo } from './utils/uploadVideo';
import './Notes.css';


function Notes({ activeNote, onUpdateNote }) {

    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const[file, setFile] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setDragActive(false);


  if (!activeNote || !e.dataTransfer.files?.length) return;

  const file = e.dataTransfer.files[0];
  const videoUrl = await uploadVideo(file, activeNote.user_id);
  if (!videoUrl) return;

  const updatedNote = {
    ...activeNote,
    video_url: videoUrl,
  };

  onUpdateNote(updatedNote);

  const { error } = await saveNote(updatedNote);
  if (error) {
    console.error("Error saving dropped video:", error);
  }
};

const handleClick = () => fileInputRef.current?.click();

  const onEditField = async (key, value) => {
    const updatedNote = {
      ...activeNote,
      video_url: activeNote.video_url,
      
      [key]: key === "date" ? new Date(value).toISOString() : value
    };

    onUpdateNote(updatedNote);
    

    const { error, data } = await saveNote(updatedNote);

    if (error) {
      console.error('Error saving note:', error);
    } else if (data && !updatedNote.id) {
      // New note inserted - update note with assigned ID
      onUpdateNote(data);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeNote) return;

    setFile(file);
    const videoUrl = await uploadVideo(file, activeNote.user_id);

    if (videoUrl) {
        const updatedNote = {
          ...activeNote,
          video_url: videoUrl,
        };
    
        onUpdateNote(updatedNote); // update UI immediately
    
        const { error, data } = await saveNote(updatedNote); // save to DB
        if (error) {
          console.error("Error saving video_url to note:", error);
        } else {
          console.log("Saved note with video URL:", data);
        }
      }
    };

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
      
  if (!activeNote) return <div className="no-active-note">No note selected</div>;


 

  return (
    <div className="app-main-note-edit">
  <input
    type="text"
    value={activeNote.title}
    onChange={(e) => onEditField("title", e.target.value)}
  />
  <textarea
    value={activeNote.body}
    onChange={(e) => onEditField("body", e.target.value)}
  />
  <input
    type="date"
    value={activeNote.date ? activeNote.date.split('T')[0] : ''}
    onChange={(e) => onEditField("date", e.target.value)}
  />

    <select
        value={activeNote.match_type || ''}
        onChange={(e) => onEditField('match_type', e.target.value)}
    >
     <option value="" disabled>
        Select Match Type
    </option>
    <option value="Singles">Singles</option>
    <option value="Doubles">Doubles</option>
    </select>


  {/* Drag/drop area */}
  <div
    className={`upload-box ${dragActive ? "active-drop" : ""}`}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    onClick={handleClick}
  >
    <p>Drag and drop a video file here, or click to select</p>
    <input
      type="file"
      accept="video/*"
      ref={fileInputRef}
      onChange={handleFileChange}
      style={{ display: "none" }}
    />
  </div>

  {/* Video container below notes */}
  {activeNote.video_url ? (
    <div className="note-video-container">
      <video controls>
        <source src={activeNote.video_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={() => onEditField("video_url", "")}>Remove Video</button>
    </div>
  ) : (
    <p>No video attached to this note yet.</p>
  )}
</div>


  );
  
}

export default Notes;