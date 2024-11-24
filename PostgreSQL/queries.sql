
-- Create the tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  status TEXT NOT NULL
);

-- Insert sample data into the tasks table
INSERT INTO tasks (description, status)
VALUES
  ('Buy groceries', 'incomplete'),
  ('Read a book', 'complete');

-- Select all tasks (for testing)
SELECT * FROM tasks;

-- Update the status of a task (for testing)
UPDATE tasks SET status = 'in-progress' WHERE id = 1;

-- Delete a task (for testing)
DELETE FROM tasks WHERE id = 2;

-- Select all tasks (to check after updates/deletes)
SELECT * FROM tasks;
