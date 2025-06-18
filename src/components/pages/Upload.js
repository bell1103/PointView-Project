import React, { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { useNavigate } from 'react-router-dom';
import 'draft-js/dist/Draft.css';
import { UserAuth } from "../../context/AuthContext";
import { saveNote } from "../utils/saveNote";
import { uploadVideo } from "../utils/uploadVideo";
import './Upload.css';

const TOOLBAR_BUTTONS = [
  { style: 'BOLD', label: 'B', title: 'Bold', className: 'bold' },
  { style: 'ITALIC', label: 'I', title: 'Italic', className: 'italic' },
  { style: 'UNDERLINE', label: 'U', title: 'Underline', className: 'underline' },
  { style: 'unordered-list-item', label: '•', title: 'Bullet List', className: 'bullet' },
];

export default function Upload() {
  const { user } = UserAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [matchType, setMatchType] = useState('Singles');

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!user || !title) {
      setMessage("Please provide at least a title.");
      return;
    }

    setUploading(true);
    setMessage('');

    try {
      let videoUrl = null;
      if (videoFile) {
        videoUrl = await uploadVideo(videoFile, user.id);
        if (!videoUrl) throw new Error("Video upload failed.");
      }

      const contentState = editorState.getCurrentContent();
      const rawContent = JSON.stringify(convertToRaw(contentState));

      const newNote = {
        user_id: user.id,
        title,
        match_type: matchType,
        body: rawContent,
        date: new Date().toISOString(),
        video_url: videoUrl,
      };

      const { data, error } = await saveNote(newNote);
      if (error) throw error;

      setMessage("Upload successful!");
      setTitle('');
      setMatchType('Singles');
      setEditorState(EditorState.createEmpty());
      setVideoFile(null);
      setPreviewUrl(null);

      navigate('/my-home');
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const toggleStyle = (style) => {
    if (style === 'unordered-list-item') {
      setEditorState(RichUtils.toggleBlockType(editorState, style));
    } else {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }
  };

  const isActive = (style) => {
    if (style === 'unordered-list-item') {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    }
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  return (
    <div className="upload-container">
      <h2>Upload Note with Video</h2>

      <input
        className="upload-title-input"
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={matchType}
        onChange={(e) => setMatchType(e.target.value)}
        className="match-type-select"
      >
        <option value="Singles">Singles</option>
        <option value="Doubles">Doubles</option>
      </select>

      <div className="toolbar">
        {TOOLBAR_BUTTONS.map(({ style, label, title, className }) => (
          <button
            key={style}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(style);
            }}
            title={title}
            className={`toolbar-button ${className} ${isActive(style) ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="editor-wrapper">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Write your note here..."
        />
      </div>

      <input
        className="video-input"
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
      />

      {previewUrl && (
        <video
          controls
          className="video-preview"
        >
          <source src={previewUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Note"}
      </button>

      {message && <p className="message-text">{message}</p>}
    </div>
  );
}
