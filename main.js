document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    addTaskBtn.addEventListener('click', addTask);

    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);
        taskInput.value = '';

        saveTasks();
    }

    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        listItem.className = 'task';
        listItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button onclick="editTask(this)">✏️</button>
                <button onclick="deleteTask(this)">❌</button>
            </div>
        `;
        return listItem;
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            const listItem = createTaskElement(taskText);
            taskList.appendChild(listItem);
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task span').forEach(taskElement => {
            tasks.push(taskElement.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    window.deleteTask = function(button) {
        const taskItem = button.parentElement.parentElement;
        taskItem.remove();
        saveTasks();
    }

    window.editTask = function(button) {
        const taskItem = button.parentElement.parentElement;
        const taskTextElement = taskItem.querySelector('span');
        const newTaskText = prompt('Quieres modificar algo? Adelante!', taskTextElement.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskTextElement.textContent = newTaskText;
            saveTasks();
        }
    }
});
