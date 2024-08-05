document.addEventListener('DOMContentLoaded', () => {
    // Show default section
    showSection('dashboard');

    // Load tasks from local storage
    loadTasks();

    // Handle form submissions
    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });

    document.getElementById('settings-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveSettings();
    });

    // Timer controls
    let timerInterval;
    const timerDisplay = document.getElementById('timer-display');
    let elapsedTime = 0;

    document.getElementById('start-timer').addEventListener('click', () => {
        timerInterval = setInterval(() => {
            elapsedTime++;
            const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, '0');
            const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0');
            const seconds = String(elapsedTime % 60).padStart(2, '0');
            timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    });

    document.getElementById('stop-timer').addEventListener('click', () => {
        clearInterval(timerInterval);
        // Optionally save the elapsed time for a specific task
    });
});

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('main section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    document.getElementById(sectionId).classList.remove('hidden');
}

function addTask() {
    const taskName = document.getElementById('task-name').value;
    if (taskName) {
        const taskList = document.getElementById('tasks-container');
        
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => toggleTaskComplete(taskItem));
        
        const taskLabel = document.createElement('span');
        taskLabel.textContent = taskName;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(taskItem));

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(deleteButton);
        
        taskList.appendChild(taskItem);

        document.getElementById('task-name').value = '';

        saveTasks();
    }
}

function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle('completed');
    saveTasks();
}

function deleteTask(taskItem) {
    taskItem.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const taskItems = document.querySelectorAll('#tasks-container .task-item');
    taskItems.forEach(item => {
        tasks.push({
            name: item.querySelector('span').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('tasks-container');
        
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskComplete(taskItem));
        
        const taskLabel = document.createElement('span');
        taskLabel.textContent = task.name;
        
        const deleteButton = document.createElement
