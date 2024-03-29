import { useContext, useEffect, useState } from "react";
import "./add-note.css";
import { NoteType, Priority } from "../note/note-type";
import { v4 as uuidv4 } from "uuid";
import Card from "../card/card";
import { ThemeContext } from "../../context/themeContext/theme";
import { StateContext } from "../../context/state/state";
import { ADD_NOTE, SET_EDIT_MODE, UPDATE_NOTE } from "../../action";
import { addNote, updateNote } from "../../services/notes-service";

type addNoteProps = {};

function AddNote(props: addNoteProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("low");
  const theme = useContext(ThemeContext);
  const { state, dispatch } = useContext(StateContext);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const setNoteContent = (note: NoteType) => {
    setText(note.text);
    setPriority(note.priority);
  };

  useEffect(() => {
    if (state.noteToBeEdited && state.editMode) {
      setNoteContent(state.noteToBeEdited);
    }
  }, [state.noteToBeEdited, state.editMode]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (state.editMode && state.noteToBeEdited) {
      const updatedNoteData = {
        text,
        priority,
        id: state.noteToBeEdited.id,
        createdAt: state.noteToBeEdited.createdAt,
        updatedAt: new Date(),
      };
      const updatedNote = await updateNote(
        state.noteToBeEdited.id,
        updatedNoteData
      );

      dispatch({
        type: UPDATE_NOTE,
        payload: updatedNote,
      });
      dispatch({ type: SET_EDIT_MODE, payload: true });
    } else {
      const noteData = {
        text,
        priority,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const note = await addNote(noteData);
      dispatch({ type: ADD_NOTE, payload: note });
    }
    setText("");
    setPriority("low");
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority);
  };

  return (
    <Card bgColor={theme === "dark" ? "#333" : "#ddd"} height="2" padding="1">
      <form className="add-note">
        <textarea onChange={handleChange} value={text}></textarea>
        {/* <input type="text" onChange={handleChange} value={text} /> */}
        <select onChange={handleSelect} value={priority}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleClick}>{state.editMode ? "Edit" : "Add"}</button>
      </form>
    </Card>
  );
}

export default AddNote;
