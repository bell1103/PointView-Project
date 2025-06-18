import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { saveNote } from '../utils/saveNote';

export default function PlayMatch() {
  const { matchId } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', matchId)
        .single();

      if (!error) {
        setNote(data);
        setEditedContent(data.content || '');
      } else {
        console.error('Failed to fetch note:', error);
      }
    };

    fetchNote();
  }, [matchId]);

  // Save note content
  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('notes')
      .update({ content: editedContent })
      .eq('id', matchId);

    if (!error) {
      setNote((prev) => ({ ...prev, content: editedContent }));
    } else {
      alert('Failed to save note.');
    }
    setIsSaving(false);
  };

  // Delete video URL
  const handleDeleteVideo = async () => {
    const { error } = await supabase
      .from('notes')
      .update({ video_url: null })
      .eq('id', matchId);

    if (!error) {
      setNote((prev) => ({ ...prev, video_url: null }));
    } else {
      alert('Failed to delete video.');
    }
  };

  // Delete note entirely
  const handleDeleteNote = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', matchId);

    if (!error) {
      navigate('/matches');
    } else {
      alert('Failed to delete note.');
    }
  };

  // Upload new video
  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${matchId}-${Date.now()}.${fileExt}`;

    const { data, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(fileName, file);

    if (uploadError) {
      alert('Upload failed');
      setUploading(false);
      return;
    }

    const { data: publicURLData } = supabase.storage
      .from('videos')
      .getPublicUrl(fileName);

    const publicURL = publicURLData.publicUrl;

    const { error: updateError } = await supabase
      .from('notes')
      .update({ video_url: publicURL })
      .eq('id', matchId);

    if (!updateError) {
      setNote((prev) => ({ ...prev, video_url: publicURL }));
    } else {
      alert('Failed to update note with video.');
    }

    setUploading(false);
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{note.title || 'Untitled Match'}</h2>

      {/* Video or Upload Option */}
      {note.video_url ? (
        <div style={{ marginBottom: '10px' }}>
          <video src={note.video_url} controls style={{ width: '100%' }} />
          <button onClick={handleDeleteVideo} style={{ marginTop: '10px', background: 'red', color: 'white' }}>
            Delete Video
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: '20px' }}>
          <p><em>No video uploaded. Upload one:</em></p>
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
          {uploading && <p>Uploading...</p>}
        </div>
      )}

      {/* Notes Section */}
      <div>
        <h3>Notes:</h3>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={10}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <br />
        <button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Notes'}
        </button>
      </div>

      {/* Delete Note Button */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleDeleteNote} style={{ background: 'darkred', color: 'white' }}>
          Delete Entire Note
        </button>
      </div>
    </div>
  );
}
