const express = require("express");
const { Client } = require("pg");
const app = express();
const PORT = 3000;



app.use(express.json());

// PostgreSQL client connection config
const client = new Client({
    connectionString: 'postgres://your_user:your_password@localhost:5432/your_db_name',
  });

// Connect to PostgreSQL
client.connect().then(() => {
    console.log("Connected to PostgreSQL database!");
  }).catch(err => {
    console.error("Error connecting to database:", err.stack);
  });


  // Function to create the tasks table if it doesn't exist
const createTasksTable = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        status TEXT NOT NULL
      );
    `;
    await client.query(query);
  };
  
  // Call the function to create the table on app start
  createTasksTable();



app.get("/", (req, res) => {
  res.send(
    "Welcome to the Task Manager API. Use /tasks to interact with the API."
  );
});

// GET /tasks - Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST /tasks - Add a new task
app.post("/tasks", (request, response) => {
  const { id, description, status } = request.body;
  if (!id || !description || !status) {
    return response
      .status(400)
      .json({ error: "All fields (id, description, status) are required" });
  }

  tasks.push({ id, description, status });
  response.status(201).json({ message: "Task added successfully" });
});

// PUT /tasks/:id - Update a task's status
app.put("/tasks/:id", (request, response) => {
  const taskId = parseInt(request.params.id, 10);
  const { status } = request.body;
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return response.status(404).json({ error: "Task not found" });
  }
  task.status = status;
  response.json({ message: "Task updated successfully" });
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", (request, response) => {
  const taskId = parseInt(request.params.id, 10);
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== taskId);

  if (tasks.length === initialLength) {
    return response.status(404).json({ error: "Task not found" });
  }
  response.json({ message: "Task deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
