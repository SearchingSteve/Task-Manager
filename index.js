const express = require("express");
const { Client } = require("pg");
const app = express();
const PORT = 3000;

app.use(express.json());

// PostgreSQL client connection config
const client = new Client({
  connectionString:
    "postgres://your_user:your_password@localhost:5432/your_db_name",
});

// Connect to PostgreSQL
client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database!");
  })
  .catch((err) => {
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

app.get("/", (request, response) => {
  response.send(
    "Welcome to the Task Manager API. Use /tasks to interact with the API."
  );
});

// GET /tasks - Get all tasks
app.get("/tasks", (request, response) => {
  client.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).json({ error: err });
      return;
    }
    response.json(result.rows);
  });
});

// POST /tasks - Add a new task
app.post("/tasks", (request, response) => {
  const { description, status } = request.body;
  if (!description || !status) {
    return response.status(400).json({ error: "All fields are required" });
  }

  client.query(
    "INSERT INTO tasks (description, status) VALUES ($1, $2) RETURNING id",
    [description, status],
    (err, result) => {
      if (err) {
        console.error("Error inserting task:", err);
        return response.status(500).send("Server error");
      }
      response;
    }
  );
  response.status(201).json({ message: "Task added successfully" });
});

// PUT /tasks/:id - Update a task's status
app.put("/tasks/:id", (request, response) => {
  const taskId = parseInt(request.params.id, 10);
  const { status } = request.body;

  // Check if the status is provided
  if (status === undefined) {
    return response.status(400).json({ error: "Status is required" });
  }

  try {
    // Update the task's status in the database
    const query = "UPDATE tasks SET status = $1 WHERE id = $2";
    const values = [status, taskId];

    client.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating task:", err);
        return response.status(500).send("Server error");
      }

      if (result.rowCount === 0) {
        return response.status(404).json({ error: "Task not found" });
      }

      response.json({ message: "Task updated successfully" });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    response.status(500).json({ error: "Server error" });
  }
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", (request, response) => {
  // PUT /tasks/:id - Update a task's status
  const taskId = parseInt(request.params.id, 10);
  const { status } = request.body;

  try {
    // Delete the task in the database
    const query = "DELETE FROM tasks WHERE id = $1";
    const values = [taskId];

    client.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating task:", err);
        return response.status(500).send("Server error");
      }

      if (result.rowCount === 0) {
        return response.status(404).json({ error: "Task not found" });
      }

      response.json({ message: "Task successfully deleted" });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    response.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
