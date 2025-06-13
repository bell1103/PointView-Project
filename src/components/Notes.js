import { saveNote } from './utils/saveNote';


function Notes({ activeNote, onUpdateNote }) {

  const onEditField = async (key, value) => {
    const updatedNote = {
      ...activeNote,
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
            type="date"
            value={activeNote.date ? activeNote.date.split('T')[0] : ''}
            onChange={(e) => onEditField("date", e.target.value)}
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
