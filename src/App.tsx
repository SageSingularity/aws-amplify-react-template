import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  async function createTodo() {
    try {
      const content = window.prompt("Todo content");
      if (!content) return; // Don't create empty todos

      const response = await client.models.Todo.create(
        {
          content,
        },
        { authMode: "userPool" }
      );
      console.log("Todo created:", response);
    } catch (error) {
      console.error("Failed to create todo:", error);
      alert(
        'Failed to create todo. Please ensure you have run "amplify push" and the API is properly configured.'
      );
    }
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
