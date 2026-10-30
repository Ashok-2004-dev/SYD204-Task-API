
// server-mvc.js
// Final MVC entry point

require('dotenv').config();

const express = require('express');
const path = require('path');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Task API (MVC version) is ready!'
  });
});

// Serve frontend files from the Frontend folder
app.use('/app', express.static(path.join(__dirname, 'Frontend')));

// Prefix every task route with /tasks
app.use('/tasks', taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);

  res.status(500).json({
    error: 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`MVC server running at http://localhost:${PORT}`);
});
