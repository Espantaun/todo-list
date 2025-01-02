const taskInput = document.getElementById('taskInput'); // Input field
const addTaskBtn = document.getElementById('addTaskBtn'); // Add Task Button
const taskList = document.getElementById('taskList'); // UL for tasks

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim(); // Get the input value
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }
    
    // Create a new list item
    const newTask = document.createElement('li');

    // Create a checkbox for the task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleTaskCompletion); // Event listener for checkbox

    // Add the task text
    const taskLabel = document.createElement('span');
    taskLabel.textContent = taskText;

    // Create the "Edit" button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.style.marginLeft = '10px';
    editBtn.addEventListener('click', () => editTask(newTask, taskLabel));

    // Creat a delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.style.marginLeft = '10px'; // Add some spacing
    deleteBtn.addEventListener('click', deleteTask); // Event Listener for delete

    // Add checkbox, text, and delete button to the task
    newTask.appendChild(checkbox);
    newTask.appendChild(taskLabel);
    newTask.appendChild(editBtn);
    newTask.appendChild(deleteBtn);    

    // Append the new task to the list
    taskList.appendChild(newTask);

    // Save the task to localStorage
    saveTasks();

    // Clear the input field
    taskInput.value = '';
};

function toggleTaskCompletion(event) {
    const taskItem = event.target.parentElement // Get the parent <li>
    taskItem.classList.toggle('completed'); // Toggle the 'completed' class
    saveTasks(); // Update localStorage with the new state
};

function deleteTask(event) {
    const taskItem = event.target.parentElement; // Get the parent <li>
    taskList.removeChild(taskItem); // Remove the task from the list
};

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach((taskItem) => {
        const taskLabel = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.querySelector('input').checked;
        tasks.push({ text: taskLabel, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach((task) => {
        const newTask = document.createElement('li');
      
        // Add the completed class if the task is completed
        if (task.completed) {
            newTask.classList.add('completed');
        }

        // Create the checkbox
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed; // Restore completion state
        checkbox.addEventListener('change', toggleTaskCompletion);

        // Add the task text
        const taskLabel = document.createElement('span');
        taskLabel.textContent = task.text;

        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', deleteTask);

        // Assemble the task item
        newTask.appendChild(checkbox);
        newTask.appendChild(taskLabel);
        newTask.appendChild(deleteBtn);

        // Append the task to the list
        taskList.appendChild(newTask);
    })
};

function editTask(taskItem, taskLabel) {
    // Create an input field for editing
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = taskLabel.textContent; // Pre-fill with current task text
    editInput.style.marginRight = '10px';

    // Create a "Save" button
    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Save';

    // Replace the task text with the input field
    taskItem.replaceChild(editInput, taskLabel);
    taskItem.replaceChild(saveBtn, taskItem.querySelector('button'));

    // Handle save action
    saveBtn.addEventListener('click', () => {
        const updatedText = editInput.value.trim();
        if (updatedText === '') {
            alert('Task cannot be empty.');
            return;
        }

        // Update the task label
        taskLabel.textContent = updatedText;

        // Restore the task label and buttons
        taskItem.replaceChild(taskLabel, editInput);
        taskItem.replaceChild(taskItem.querySelector('button'), saveBtn);

        // Save to localStorage
        saveTasks();
    })
}

loadTasks()





