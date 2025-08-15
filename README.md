
# Express Task Manager API

## Project Overview

This project is a **PostgreSQL-based task management REST API** built with Node.js and Express.js. It provides a simple and efficient way to manage tasks through HTTP endpoints, with automatic database table creation and full CRUD operations.

---

## Features

### Task Management API

1. **Database Setup**  
   - Automatically creates a `tasks` table in PostgreSQL with fields for `id`, `description`, and `status`
   - No manual database setup required

2. **RESTful API Routes**

- **`GET /tasks`**: Retrieves all tasks from the database.
  - **Testing**: Use a tool like Postman, Thunder, or curl to send a GET request to `http://localhost:3000/tasks`.
  - **Expected Response**: A JSON array containing all tasks in the database, each with fields: `id`, `description`, and `status`.

- **`POST /tasks`**: Add new tasks to the database.
  - **Testing**: Send a POST request to `http://localhost:3000/tasks` with a JSON body containing the new task details.
  - **JSON Fields**:
    ```json
    {
      "description": "Your task description here",
      "status": "Your task status here (e.g., 'pending', 'completed')"
    }
    ```
  - **Expected Response**: A JSON object with a success message and the ID of the newly created task:
    ```json
    {
      "message": "Task added successfully",
      "id": 1 // ID of the new task
    }
    ```

- **`PUT /tasks/:id`**: Updates the status of a specific task.
  - **Testing**: Send a PUT request to `http://localhost:3000/tasks/{id}`, replacing `{id}` with the ID of the task you want to update.
  - **JSON Fields**:
    ```json
    {
      "status": "New status here (e.g., 'in progress', 'completed')"
    }
    ```
  - **Expected Response**: A JSON object with a success message:
    ```json
    {
      "message": "Task updated successfully"
    }
    ```
  - **Error Handling**: If the task ID does not exist, the response will be:
    ```json
    {
      "error": "Task not found"
    }
    ```

- **`DELETE /tasks/:id`**: Deletes a specific task.
  - **Testing**: Send a DELETE request to `http://localhost:3000/tasks/{id}`, replacing `{id}` with the ID of the task you want to delete.
  - **Expected Response**: A JSON object with a success message:
    ```json
    {
      "message": "Task successfully deleted"
    }
    ```
  - **Error Handling**: If the task ID does not exist, the response will be:
    ```json
    {
      "error": "Task not found"
    }
    ```

---

## Getting Started

### Prerequisites

- Node.js installed  
- PostgreSQL installed and running  

---

### Installation

1. Clone the repository:  
   ```
   git clone <repository-url>
   cd Task-Manager
   ```

2. Install dependencies:  
   ```
   npm install
   ```

3. Configure the PostgreSQL database connection in `index.js`:  
   ```javascript
   const client = new Client({
     connectionString: "postgres://your_user:your_password@localhost:5432/your_db_name",
   });
   ```
   
   **Replace the connection string with your actual PostgreSQL credentials:**
   - `your_user`: Your PostgreSQL username
   - `your_password`: Your PostgreSQL password  
   - `localhost:5432`: Your PostgreSQL host and port
   - `your_db_name`: Your database name

4. Start the server:  
   ```
   npm start
   ```
   
   The server will run with auto-reload enabled (using `node --watch`).

5. The server will be available at:  
   `http://localhost:3000/`

---

## API Testing with Postman

The easiest way to test this API is using **Postman**, a popular API testing tool. We've included a ready-to-use Postman collection with all the endpoints pre-configured.

### Getting Started with Postman

1. **Download Postman**: Visit [postman.com](https://www.postman.com/downloads/) and download the desktop app for your operating system.

2. **Import the Collection**: 
   - Open Postman
   - Click "Import" in the top left
   - Select the `Task-Manager-API.postman_collection.json` file from this project
   - The collection will be imported with all endpoints ready to use

3. **Start Your Server**: Make sure your Task Manager API is running:
   ```bash
   npm start
   ```

4. **Test the Endpoints**: The collection includes these pre-configured requests:
   - **Get All Tasks** - Lists all tasks in the database
   - **Create New Task** - Adds a new task (modify the JSON body as needed)
   - **Update Task Status** - Updates a task's status (change the ID in the URL)
   - **Delete Task** - Removes a task (change the ID in the URL)
   - **Get API Welcome** - Tests if the server is running

### Using the Collection

- **Base URL**: The collection uses a variable `{{base_url}}` set to `http://localhost:3000`
- **Modify Task IDs**: For update/delete operations, change the `1` in the URL to the actual task ID
- **Customize Request Bodies**: Edit the JSON in the request body to create different tasks or status updates

### Example Workflow

1. **Test Server**: Start with "Get API Welcome" to ensure the server is running
2. **Create Tasks**: Use "Create New Task" to add several tasks (modify the JSON body each time)
3. **List Tasks**: Use "Get All Tasks" to see all created tasks and their IDs
4. **Update Status**: Use "Update Task Status" with a specific task ID to change its status
5. **Delete Tasks**: Use "Delete Task" with a specific task ID to remove tasks

### Alternative Testing Tools

If you prefer other tools, you can also use:
- **Thunder Client** (VS Code extension)
- **Insomnia** (cross-platform API client)
- **curl** (command line)

For curl examples, see the [curl documentation](https://curl.se/docs/tutorial.html) or use the Postman collection as a reference for the correct endpoints and request formats.

---

## Database Schema

The application automatically creates a `tasks` table with the following structure:

```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  status TEXT NOT NULL
);
```

---

## Dependencies

- **express**: Web framework for Node.js
- **pg**: PostgreSQL client for Node.js
- **@types/express**: TypeScript definitions for Express
- **@types/pg**: TypeScript definitions for pg

---

## License

This project is provided for **personal use only**. Redistribution, modification, or commercial use in any form is strictly prohibited without prior written permission from the author.

For detailed license terms, refer to the [LICENSE](LICENSE.MD) file.




