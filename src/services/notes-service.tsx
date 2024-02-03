import { NoteType } from "../components/note/note-type";

export async function getNotes() {
  // json-server does not accept query params with _order
  // const response = await fetch("/notes?_sort=updatedAt&_order=desc");
  const response = await fetch("/notes?_sort=-updatedAt");
  const notes = await response.json();
  return notes.map((note: NoteType) => ({
    ...note,
    createdAt: new Date(note.createdAt),
    updatedAt: new Date(note.updatedAt),
  }));
}

export async function addNote(note: NoteType) {
  const response = await fetch("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  const noteFromDB = await response.json();
  return {
    ...noteFromDB,
    createdAt: new Date(noteFromDB.createdAt),
    updatedAt: new Date(noteFromDB.updatedAt),
  };
}
export async function updateNote(id: string, note: NoteType) {
  const response = await fetch(`/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  const noteFromDB = await response.json();
  return {
    ...noteFromDB,
    createdAt: new Date(noteFromDB.createdAt),
    updatedAt: new Date(noteFromDB.updatedAt),
  };
}

export async function deleteNote(id: string) {
  const response = await fetch(`/notes/${id}`, {
    method: "DELETE",
  });
  return await response.json();
}
