
# Express Task Manager & MongoDB Queries

## Project Overview

This project demonstrates the integration of **PostgreSQL** with a Node.js application. It features a RESTful API built using Express.js to manage tasks. This project also features MongoDB queries to interact with a books collection. The project is designed to showcase efficient database operations and query handling.

---

## Features

### Express Task Manager

1. **Database Setup**  
   - Automatically creates a `tasks` table in PostgreSQL with fields for `id`, `description`, and `status`. 

2 **RESTful API Routes**

- **`GET /tasks`**: Retrieves all tasks from the database.
  - **Testing**: Use a tool like Postman or Thunder to send a GET request to `http://localhost:3000/tasks`.
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


### MongoDB Book System Queries

1. **Collection Management**  
   - Creates a `books` collection in MongoDB and inserts sample data.

2. **Data Queries**  
   - Retrieves the titles of all books.  
   - Finds all books by a specific author.  
   - Updates the genre of a specific book.  
   - Deletes a specific book.

   > **Note:** The MongoDB queries should be run one at a time to avoid unintended interactions and ensure proper execution.

---

## Getting Started

### Prerequisites

- Node.js installed  
- PostgreSQL installed and running  
- MongoDB installed and running  

---

### Installation

#### Express Task Manager

1. Clone the repository:  
   ```
   git clone https://github.com/SearchingSteve/QAP3-DB-Sem3
   cd QAP3-DB-SEM3
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

4. Start the server:  
   ```
   node index.js
   ```

5. The server will run at:  
   `http://localhost:3000/`

---

### MongoDB Book System Queries

1. Open your MongoDB shell or GUI client.

2. Create a `books` collection and insert sample data:  
   ```
   db.books.insertMany([
       { title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", publishedYear: 1937 },
       { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", publishedYear: 1960 },
       { title: "1984", author: "George Orwell", genre: "Dystopian", publishedYear: 1949 }
   ])
   ```

3. Execute the following queries one at a time:  
   - Retrieve the titles of all books:  
     ```
     db.books.find({}, { title: 1, _id: 0 })
     ```

   - Find all books by "J.R.R. Tolkien":  
     ```
     db.books.find({ author: "J.R.R. Tolkien" })
     ```

   - Update the genre of "1984" to "Science Fiction":  
     ```
     db.books.updateOne(
         { title: "1984" },
         { $set: { genre: "Science Fiction" } }
     )
     ```

   - Delete "The Hobbit":  
     ```
     db.books.deleteOne({ title: "The Hobbit" })
     ```

     - Retrieve the titles and genres of all books
```
db.books.find({}, { title: 1, genre: 1, _id: 0 });
```


---



## License

This project is provided for **personal use only**. Redistribution, modification, or commercial use in any form is strictly prohibited without prior written permission from the author.

For detailed license terms, refer to the [LICENSE](LICENSE.MD) file.

## Author
**[Stephen Crocker](https://github.com/SearchingSteve)** 



