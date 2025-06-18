import React from "react";

function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote, onEditDate }) {
  const sortedNotes = [...notes].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (isNaN(dateA) || isNaN(dateB)) return 0;
    return dateB - dateA;
  });

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <button onClick={onAddNote}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => {
          const formattedDate = note.date
            ? new Date(note.date).toISOString().slice(0, 10) // format to yyyy-mm-dd for input value
            : "";

          return (
            <div
              key={note.id}
              className={`app-sidebar-note ${String(note.id) === String(activeNote) ? "active" : ""}`}
              onClick={() => setActiveNote(note.id)}
            >
              <div className="sidebar-note-title">
                <strong>
                  {note.title.length > 22 ? note.title.substr(0, 22) + "..." : note.title}
                </strong>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteNote(note.id);
                  }}
                >
                  Delete
                </button>
              </div>

              <p>
                {note.body.length > 50 ? note.body.substr(0, 50) + "..." : note.body}
              </p>

              {/* Editable date input */}
              <input
                type="date"
                value={formattedDate}
                onClick={(e) => e.stopPropagation()} // prevent note selection on date input click
                onChange={(e) => onEditDate(note.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
