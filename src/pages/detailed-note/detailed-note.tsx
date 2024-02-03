import "./detailed-note.css";
import Note from "../../components/note/note";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext/theme";
import { StateContext } from "../../context/state/state";
import { useParams, Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function DetailedNote() {
  const theme = useContext(ThemeContext);
  const { state } = useContext(StateContext);
  const { id } = useParams();
  const note = state.notes.find((note) => note.id === id);
  console.log();

  return (
    <div className={`detailed-note ${theme}`}>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: `${theme === "dark" ? "white" : "black"}`,
          float: "left",
          marginTop: "-0.5rem",
          marginLeft: "0.5rem",
        }}
      >
        <FaHome></FaHome>
      </Link>
      <div>
        {note && (
          <Note
            key={note.id}
            id={note.id}
            priority={note.priority}
            text={note.text}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
            note={note}
            isDetailed={true}
          ></Note>
        )}
      </div>
    </div>
  );
}

export default DetailedNote;
