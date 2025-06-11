import { saveNote } from './utils/saveNote';

function Notes({ activeNote, onUpdateNote }) {
  const onEditField = (key, value) => {
    const updatedNote = {
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    };

    onUpdateNote(updatedNote);
    saveNote(updatedNote);
  };

  if (!activeNote) return <div className="no-active-note">No note selected</div>;

  return (
    <div className="app-main">
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
          type="text"
          placeholder="Video URL (optional)"
          value={activeNote.video_url || ''}
          onChange={(e) => onEditField("video_url", e.target.value)}
        />
      </div>

      {activeNote.video_url && (
        <video width="100%" controls>
          <source src={activeNote.video_url} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default Notes;
