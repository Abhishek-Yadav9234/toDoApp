import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [singleTodo, setSingleTodo] = useState({ title: "", desc: "" });

  // ---- Add Todo ----
  function handleAddTodo() {
    const todoToAdd = { ...singleTodo }; // clone so React doesn't freak out
    const updated = [...allTodos, todoToAdd];

    setAllTodos(updated);
    saveTodoLocalStore(updated);

    setSingleTodo({ title: "", desc: "" }); // clear inputs
  }

  // ---- Delete Todo ----
  function deleteTodo(i) {
    const updated = allTodos.filter((_, idx) => idx !== i);
    setAllTodos(updated);
    saveTodoLocalStore(updated);
  }

  // ---- Save to storage ----
  function saveTodoLocalStore(todos) {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Failed saving to localStorage:", error);
    }
  }

  // ---- Load from storage ----
  function getTodoFromLocalStorage() {
    try {
      const raw = localStorage.getItem("todos");
      const data = raw ? JSON.parse(raw) : [];

      // Ensure it's an array
      setAllTodos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LocalStorage read error:", error);
      setAllTodos([]); // fallback
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      getTodoFromLocalStorage();
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", flexDirection:"column"}}>
        <h1 style={{textAlign:"center"}}>MANAGE YOUR TASK!!!</h1>
        <input
          style={{width:"50%", marginLeft:"20%"}}
          type="text"
          placeholder="Title"
          value={singleTodo.title}
          onChange={(e) =>
            setSingleTodo((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <br />
        <br />

        <input
          style={{width:"50%", marginLeft:"20%"}}
          type="text"
          placeholder="write your task description here"
          value={singleTodo.desc}
          onChange={(e) =>
            setSingleTodo((prev) => ({ ...prev, desc: e.target.value }))
          }
        />
        <br />
        <br />

        <button onClick={handleAddTodo} class="text-white-500" style={{width:"50%", marginLeft:"20%",backgroundColor:"rgb(128, 155, 158)",height:"40px", borderRadius:"10px"}}>ADD</button>
      </div>

      <div>
        {allTodos.map((data, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "rgb(52, 216, 235)",
              padding: "20px",
              margin: "10px 0",
            }}
          >
            <p>{i + 1}</p>
            <h1>{data.title}</h1>
            <h3>{data.desc}</h3>
            <button style={{backgroundColor:"rgb(17, 197, 237)",height:"40px", borderRadius:"10px",border:"2px solid black"}}onClick={() => deleteTodo(i)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
