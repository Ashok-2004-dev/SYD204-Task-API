# SYD204 Task API

A task management REST API built with **Node.js, Express.js, and MySQL**, following the **Model-View-Controller (MVC)** architecture. The project also includes a simple frontend called **TaskFlow** for managing tasks.

## Student Information

- **Name:** Ashok
- **Student Code:** 05250167

## GitHub Repository

[SYD204 Task API](https://github.com/Ashok-2004-dev/SYD204-Task-API)

## Technologies Used

- Node.js
- Express.js
- MySQL
- Aiven Cloud Database
- HTML
- CSS
- JavaScript
- Git and GitHub
- Postman

## Project Structure

```text
Task-API/
├── certs/
│   └── ca.pem
├── database/
│   └── schema.sql
├── Frontend/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── README.md
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── taskModel.js
│   ├── routes/
│   │   └── taskRoutes.js
│   └── db.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
├── server-mvc.js
└── test-db.js
```

## Features

- Create a new task.
- Retrieve all tasks.
- Retrieve a task by ID.
- Update a task using PUT.
- Partially update a task using PATCH.
- Delete a task.
- Validate task input.
- Return appropriate HTTP status codes.
- Store tasks in a MySQL database.
- Connect the frontend to the backend API.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ashok-2004-dev/SYD204-Task-API.git
```

### 2. Navigate to the project folder

```bash
cd SYD204-Task-API
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory using `.env.example` as a guide.

Add your own database credentials and configuration:

```env
PORT=3000
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=defaultdb
```

Use your database provider's CA certificate and SSL configuration as required. Do not share or commit your `.env` file.

### 5. Start the MVC server

```bash
node server-mvc.js
```

The server runs at:

```text
http://localhost:3000
```

## API Endpoints

Base URL: `http://localhost:3000/tasks`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get a task by ID |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a complete task |
| PATCH | `/tasks/:id` | Partially update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Example Requests

### Create a task

**POST** `/tasks`

```json
{
  "title": "Complete SYD204 assignment",
  "completed": false
}
```

### Update a task

**PUT** `/tasks/1`

```json
{
  "title": "Finish Task API project",
  "completed": true
}
```

### Partially update a task

**PATCH** `/tasks/1`

```json
{
  "completed": true
}
```

## Frontend

The project includes a TaskFlow frontend.

After starting the server, open:

```text
http://localhost:3000/app
```

The frontend allows users to add, view, filter, edit, and manage tasks through the API.

## Testing

The API can be tested using Postman.

Test the following operations:

- GET all tasks.
- POST a new task.
- GET a task by ID.
- PUT update a task.
- PATCH update a task.
- DELETE a task.
- Check the response for a task that does not exist.
- Check validation for an empty task title.

To test the database connection, run:

```bash
node test-db.js
```

## Security

- Database credentials are stored in environment variables.
- `.env` is excluded from Git using `.gitignore`.
- Database connections use SSL as required by the cloud database.
- Input validation is applied when creating and updating tasks.

## Author

**Ashok**  
SYD204 Task API Project  
Student Code: 05250167
