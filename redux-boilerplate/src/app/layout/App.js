import { useDispatch, useSelector } from "react-redux";
import { selectToggle, setCurrentTab } from "../reducer/toggleReducer";
import "./App.css";

function App() {
  const state = useSelector(selectToggle);
  const dispatch = useDispatch();
  console.log("state:", state);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Redux demo</h1>
        <h1 style={{ color: "#111" }}>{state.currentTab}</h1>
        <button onClick={() => dispatch(setCurrentTab("limon"))}>
          Change State
        </button>
      </header>
    </div>
  );
}

export default App;
