const API_URL = '/tasks';
const $ = selector => document.querySelector(selector);

const taskForm = $('#task-form');
const taskTitle = $('#task-title');
const taskList = $('#task-list');
const formMessage = $('#form-message');
const dialog = $('#edit-dialog');
const editForm = $('#edit-form');
const editTitle = $('#edit-title');
const editCompleted = $('#edit-completed');
const editMessage = $('#edit-message');

let tasks = [];
let filter = 'all';
let editingId = null;

async function api(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });
  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

function message(element, text = '') {
  element.textContent = text;
}

function updateStats() {
  const done = tasks.filter(task => Boolean(task.completed)).length;
  $('#total-count').textContent = tasks.length;
  $('#completed-count').textContent = done;
  $('#pending-count').textContent = tasks.length - done;
}

function taskElement(task) {
  const row = document.createElement('article');
  row.className = `task-row${task.completed ? ' is-completed' : ''}`;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-check';
  checkbox.checked = Boolean(task.completed);
  checkbox.setAttribute('aria-label', 'Toggle task completion');
  checkbox.addEventListener('change', () => toggleTask(task));

  const content = document.createElement('div');
  content.className = 'task-content';
  const title = document.createElement('p');
  title.className = 'task-title';
  title.textContent = task.title;
  const date = document.createElement('p');
  date.className = 'task-date';
  date.textContent = task.created_at ? new Date(task.created_at).toLocaleDateString() : 'Task';
  content.append(title, date);

  const status = document.createElement('span');
  status.className = `task-status${task.completed ? ' done' : ''}`;
  status.textContent = task.completed ? 'Completed' : 'Pending';

  const edit = document.createElement('button');
  edit.type = 'button'; edit.className = 'icon-button';
  edit.textContent = '✎'; edit.setAttribute('aria-label', 'Edit task');
  edit.addEventListener('click', () => openEditor(task));

  const remove = document.createElement('button');
  remove.type = 'button'; remove.className = 'icon-button delete';
  remove.textContent = '⌫'; remove.setAttribute('aria-label', 'Delete task');
  remove.addEventListener('click', () => deleteTask(task.id));

  row.append(checkbox, content, status, edit, remove);
  return row;
}

function renderTasks() {
  updateStats();
  const shown = tasks.filter(task =>
    filter === 'all' || (filter === 'completed' ? task.completed : !task.completed)
  );
  $('#visible-count').textContent = shown.length;
  taskList.replaceChildren();

  if (!shown.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = tasks.length ? 'No tasks match this filter.' : 'No tasks yet. Add your first task above.';
    taskList.append(empty);
    return;
  }
  shown.forEach(task => taskList.append(taskElement(task)));
}

async function loadTasks() {
  taskList.innerHTML = '<p class="loading">Loading your tasks...</p>';
  $('#refresh-button').disabled = true;
  try {
    const data = await api(API_URL);
    tasks = Array.isArray(data) ? data : (data.tasks || []);
    renderTasks();
  } catch (error) {
    taskList.replaceChildren();
    const errorBox = document.createElement('p');
    errorBox.className = 'empty-state';
    errorBox.textContent = `${error.message}. Check that the API server is running.`;
    taskList.append(errorBox);
  } finally {
    $('#refresh-button').disabled = false;
  }
}

taskForm.addEventListener('submit', async event => {
  event.preventDefault();
  const title = taskTitle.value.trim();
  message(formMessage);
  if (!title) return message(formMessage, 'Please enter a task title.');

  const button = taskForm.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await api(API_URL, { method: 'POST', body: JSON.stringify({ title, completed: false }) });
    taskForm.reset();
    await loadTasks();
    message(formMessage, 'Task added successfully.');
    taskTitle.focus();
  } catch (error) {
    message(formMessage, error.message);
  } finally {
    button.disabled = false;
  }
});

async function toggleTask(task) {
  try {
    await api(`${API_URL}/${task.id}`, {
      method: 'PATCH', body: JSON.stringify({ completed: !task.completed })
    });
    await loadTasks();
  } catch (error) {
    alert(error.message);
    loadTasks();
  }
}

function openEditor(task) {
  editingId = task.id;
  editTitle.value = task.title;
  editCompleted.checked = Boolean(task.completed);
  message(editMessage);
  dialog.showModal();
  editTitle.focus();
}

editForm.addEventListener('submit', async event => {
  event.preventDefault();
  const title = editTitle.value.trim();
  if (!title) return message(editMessage, 'Task title is required.');

  const button = editForm.querySelector('button[type="submit"]');
  button.disabled = true;
  try {
    await api(`${API_URL}/${editingId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, completed: editCompleted.checked })
    });
    dialog.close();
    await loadTasks();
  } catch (error) {
    message(editMessage, error.message);
  } finally {
    button.disabled = false;
  }
});

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;
  try {
    await api(`${API_URL}/${id}`, { method: 'DELETE' });
    await loadTasks();
  } catch (error) {
    alert(error.message);
  }
}

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderTasks();
  });
});

$('#refresh-button').addEventListener('click', loadTasks);
$('#close-dialog').addEventListener('click', () => dialog.close());
$('#cancel-edit').addEventListener('click', () => dialog.close());
loadTasks();
