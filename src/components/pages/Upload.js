import React, { useState } from 'react';
import { UserAuth } from "../../context/AuthContext";
import { saveNote } from "../utils/saveNote";
import { uploadVideo } from "../utils/uploadVideo";

export default function Upload() {
  const { user } = UserAuth();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!user || !title || !body || !videoFile) {
      setMessage("Please complete all fields and select a video.");
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      const videoUrl = await uploadVideo(videoFile, user.id);
      if (!videoUrl) throw new Error("Video upload failed.");

      const newNote = {
        user_id: user.id,
        title,
        body,
        date: new Date().toISOString(),
        video_url: videoUrl,
      };

      const { data, error } = await saveNote(newNote);
      if (error) throw error;

      setMessage("Upload successful!");
      setTitle('');
      setBody('');
      setVideoFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Upload Note with Video</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        style={styles.textarea}
        placeholder="Write your note here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        style={styles.fileInput}
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
      />
      
      {/* Video Preview */}
      {previewUrl && (
        <video style={styles.video} controls>
          <source src={previewUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <button style={styles.button} onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Note"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fafafa',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minHeight: '120px',
  },
  fileInput: {
    padding: '8px',
  },
  video: {
    width: '100%',
    maxHeight: '300px',
    borderRadius: '6px',
    marginTop: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
