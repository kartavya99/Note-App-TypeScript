import { useState } from "react";
import { ThemeContext } from "./context/themeContext/theme";
import Home from "./pages/home/home";
import Switch from "react-switch";
import "./App.css";
import { FaSun, FaMoon } from "react-icons/fa";

function App() {
  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(false);

  const changeHandler = (check: boolean) => {
    setChecked(!checked);
    if (check) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <ThemeContext.Provider value={theme}>
      <Switch
        onChange={changeHandler}
        checked={checked}
        className="react-switch"
        uncheckedIcon={
          <FaMoon
            size={20}
            style={{ paddingTop: "4px", paddingRight: "4px", float: "right" }}
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
      <Home></Home>
    </ThemeContext.Provider>
  );
}

export default App;
