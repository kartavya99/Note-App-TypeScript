import { useEffect, useReducer, useState } from "react";
import { ThemeContext } from "./context/themeContext/theme";
import Home from "./pages/home/home";
import Switch from "react-switch";
import "./App.css";
import { FaSun, FaMoon } from "react-icons/fa";
import { StateContext, StateType } from "./context/state/state";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  ADD_NOTE,
  DELETE_NOTE,
  INIT_NOTES,
  SET_EDIT_MODE,
  SET_NOTE_FOR_EDIT,
  UPDATE_NOTE,
} from "./action";
import { getNotes } from "./services/notes-service";
import DetailedNote from "./pages/detailed-note/detailed-note";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/:id",
    element: <DetailedNote></DetailedNote>,
  },
]);

function App() {
  let defaultTheme;
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    defaultTheme = "dark";
  } else {
    defaultTheme = "light";
  }

  const [theme, setTheme] = useState(defaultTheme);
  const [checked, setChecked] = useState(defaultTheme === "dark");

  const [state, dispatch] = useReducer(
    (state: StateType, action: { type: string; payload: any }) => {
      switch (action.type) {
        case INIT_NOTES:
          return { ...state, notes: action.payload };
        case SET_EDIT_MODE:
          return { ...state, editMode: action.payload };
        case SET_NOTE_FOR_EDIT:
          return { ...state, noteToBeEdited: action.payload };
        case ADD_NOTE:
          return { ...state, notes: [action.payload, ...state.notes] };
        case DELETE_NOTE:
          const index = state.notes.findIndex(
            (note) => note.id === action.payload
          );
          let editedNotesDeleted = [...state.notes];
          editedNotesDeleted.splice(index, 1);
          return { ...state, notes: editedNotesDeleted };
        case UPDATE_NOTE:
          const indexUpdated = state.notes.findIndex(
            (note) => note.id === action.payload.id
          );
          let editedNotesUpdated = [...state.notes];
          editedNotesUpdated.splice(indexUpdated, 1);
          editedNotesUpdated.unshift(action.payload);
          return { ...state, notes: editedNotesUpdated };
        default:
          return state;
      }
    },
    {
      notes: [],
      editMode: false,
      noteToBeEdited: null,
    }
  );

  const checkForTheme = (check: boolean) => {
    if (check) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const changeHandler = (check: boolean) => {
    setChecked(!checked);
    checkForTheme(check);
  };

  useEffect(() => {
    async function initializedNotes() {
      const notes = await getNotes();
      dispatch({ type: INIT_NOTES, payload: notes });
    }
    checkForTheme(checked);
    initializedNotes();
  }, []);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div className={`App ${theme}`}>
          <Switch
            onChange={changeHandler}
            checked={checked}
            className="react-switch"
            uncheckedIcon={
              <FaMoon
                size={20}
                style={{
                  paddingTop: "4px",
                  paddingRight: "4px",
                  float: "right",
                }}
                color="white"
              ></FaMoon>
            }
            checkedIcon={
              <FaSun
                size={20}
                style={{ paddingTop: "4px", paddingLeft: "4px" }}
                color="yellow"
              ></FaSun>
            }
            onColor="#900"
            offColor="#333"
            onHandleColor="#000"
          ></Switch>

          <RouterProvider router={router} />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
