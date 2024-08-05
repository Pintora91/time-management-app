document.addEventListener('DOMContentLoaded', () => {
    // Show default section
    showSection('dashboard');

    // Handle form submission
    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
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
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('div');
        taskItem.textContent = taskName;
        taskList.appendChild(taskItem);
        document.getElementById('task-name').value = '';
    }
}
