import { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo, updateTodo } from "./services/TodoService";

function App() {

  // STATES
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // EDIT STATES
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // LOAD TODOS
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = () => {
    getTodos()
      .then((response) => setTodos(response.data))
      .catch((error) => console.log(error));
  };

  // ADD TODO
  const handleAddTodo = () => {

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const newTodo = {
      title,
      description,
      completed: false
    };

    createTodo(newTodo)
      .then(() => {
        setTitle("");
        setDescription("");
        loadTodos();
      })
      .catch(error => console.log(error));
  };

  // DELETE
  const handleDelete = (id) => {
    deleteTodo(id)
      .then(() => loadTodos())
      .catch(err => console.log(err));
  };

  // TOGGLE COMPLETE
  const toggleComplete = (todo) => {

    const updatedTodo = {
      ...todo,
      completed: !todo.completed
    };

    updateTodo(todo.id, updatedTodo)
      .then(() => loadTodos())
      .catch(err => console.log(err));
  };

  // START EDIT
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  // UPDATE TODO
  const handleUpdate = (id) => {

    const existingTodo = todos.find(t => t.id === id);

    const updatedTodo = {
      ...existingTodo,
      title: editTitle,
      description: editDescription
    };

    updateTodo(id, updatedTodo)
      .then(() => {
        setEditingId(null);
        loadTodos();
      })
      .catch(err => console.log(err));
  };

  return (
    <div style={{
      padding: "30px",
      fontFamily: "Arial",
      maxWidth: "750px",
      margin: "auto"
    }}>

      <h1 style={{ textAlign: "center" }}>Todo Application</h1>

      {/* ADD SECTION */}
      <div style={{
        marginBottom: "25px",
        display: "flex",
        gap: "10px"
      }}>

        <input
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", flex: 1 }}
        />

        <input
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: "10px", flex: 1 }}
        />

        <button
          onClick={handleAddTodo}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Add
        </button>

      </div>

      {/* TODOS */}
      {todos.length === 0 ? (
        <p style={{ textAlign: "center" }}>No Todos Found</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
              backgroundColor: "#fafafa"
            }}
          >

            {/* EDIT MODE */}
            {editingId === todo.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{
                    padding: "8px",
                    width: "100%",
                    marginBottom: "5px"
                  }}
                />

                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{
                    padding: "8px",
                    width: "100%",
                    marginBottom: "10px"
                  }}
                />

                <button
                  onClick={() => handleUpdate(todo.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h3 style={{
                  textDecoration: todo.completed ? "line-through" : "none"
                }}>
                  {todo.title}
                </h3>

                <p>{todo.description}</p>

                <b>
                  Status: {todo.completed ? "Completed ✅" : "Not Completed ❌"}
                </b>

                <div style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center"
                }}>

                  <label style={{ cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                    />
                    {" "}Mark Complete
                  </label>

                  <button
                    onClick={() => startEdit(todo)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ffa500",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(todo.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#ff4d4d",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>

                </div>
              </>
            )}

          </div>
        ))
      )}

    </div>
  );
}

export default App;
