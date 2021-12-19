import "./styles.css";
import { useState, useReducer } from "react";
const initialstate = [{}];
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload.work];
    case "del":
      return state.filter((elem) => {
        return elem.id !== action.id;
      });
    case "done":
      return state.map((elem) => {
        if (elem.id === action.id) {
          elem.done = true;
        }
        return elem;
      });
    default:
      return state;
  }
};
export default function App() {
  const [task, setTask] = useState("");
  const [state, dispatch] = useReducer(reducer, initialstate);
  const handlesubmit = (event) => {
    event.preventDefault();
    const work = {
      id: Date.now(),
      task,
      done: false
    };
    dispatch({ type: "add", payload: { work } });
    console.log(state);
    setTask("");
  };
  return (
    <div className="App">
      <h1>TODOS</h1>
      <div>
        <form onSubmit={handlesubmit}>
          <label>
            Type Task:
            <input
              type="text"
              value={task}
              onChange={(event) => {
                setTask(event.target.value);
              }}
            />
          </label>
          <button type="submit">Add todo</button>
        </form>
      </div>
      <div>
        {state.map((elem) => {
          return (
            <div key={elem.id}>
              <h1>
                {elem.task}{" "}
                <button onClick={() => dispatch({ type: "del", id: elem.id })}>
                  delete
                </button>
                <button
                  onClick={() => dispatch({ type: "done", id: elem.id })}
                  style={{ color: elem.done ? "green" : "red" }}
                >
                  {elem.done ? "completed" : "markdone"};
                </button>
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}
