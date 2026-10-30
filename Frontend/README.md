# TaskFlow Frontend

A responsive task-management interface for the SYD204 Task API practical.

## Features
- View tasks from the API
- Add, edit, complete, and delete tasks
- Filter all, pending, and completed tasks
- View total, completed, and pending task counts
- Responsive layout with subtle animations

## Files
```text
Frontend/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Run the frontend
1. Keep the `Frontend` folder in the root of your Task-API project.
2. Make sure `server-mvc.js` serves the folder. Add this before mounting the task routes:

   ```js
   const path = require('path');
   app.use('/app', express.static(path.join(__dirname, 'Frontend')));
   ```

3. Start the backend from the project root:

   ```bash
   node server-mvc.js
   ```

4. Open:

   ```text
   http://localhost:3000/app
   ```

Use the Express URL rather than opening `index.html` directly or using a separate Live Server port. The frontend calls `/tasks` on the same origin as the backend.

## API endpoints used

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update title and completion |
| PATCH | `/tasks/:id` | Update completion status |
| DELETE | `/tasks/:id` | Delete a task |

## Expected task fields
The API should return task objects containing `id`, `title`, and `completed`. The `created_at` field is optional and is displayed when available.

## Security
Database credentials belong in the backend `.env` file. Do not place credentials in frontend files or commit `.env` to GitHub.
