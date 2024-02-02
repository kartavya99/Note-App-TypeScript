import { useState } from "react";
import "./add-note.css";
import { NoteType, Priority } from "../note/note-type";
import { v4 as uuidv4 } from "uuid";

type addNoteProps = {
  addNote: (note: NoteType) => void;
};

function AddNote(props: addNoteProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("low");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    props.addNote({
      text,
      priority,
      id: uuidv4(),
    });
    setText("");
    setPriority("low");
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value as Priority);
  };

  return (
    <div>
      <form className="add-note">
        <input type="text" onChange={handleChange} value={text} />
        <select onChange={handleSelect} value={priority}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleClick}>Add</button>
      </form>
    </div>
  );
}

export default AddNote;
