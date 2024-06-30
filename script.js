// The basis for the code was inspired by this video: 
// ChatGPT was also used to help explain some code and help organize it.

// Select elements from the DOM
const todoInputElement = document.querySelector(".todo-input");
const todoButtonElement = document.querySelector(".todo-button");
const todoListElement = document.querySelector(".todo-list");

// Event listeners
document.addEventListener("DOMContentLoaded", loadTodosFromLocalStorage); // Load todos when the page loads
todoButtonElement.addEventListener("click", addTodo); // Add a new todo when the button is clicked
todoListElement.addEventListener("click", handleTodoActions); // Handle complete and delete actions

// Function to add a new todo
function addTodo(event) {
    event.preventDefault(); // Prevent form from submitting

    // Check if the input is empty
    if (todoInputElement.value.trim() === "") {
        return; // Do nothing if the input is empty
    }

    // Create a new todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create a new list item for the todo text
    const todoItem = document.createElement("li");
    todoItem.innerText = todoInputElement.value;
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);

    // Create a button to mark the todo as complete
    const completeButton = document.createElement("button");
    completeButton.innerText = '✔';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // Create a button to delete the todo
    const trashButton = document.createElement("button");
    trashButton.innerText = '✖';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append the new todo div to the todo list
    todoListElement.appendChild(todoDiv);

    // Save the new todo to local storage
    saveTodoToLocalStorage(todoInputElement.value, false);

    // Clear the input field
    todoInputElement.value = "";
}

// Function to handle actions on todo items (delete/complete)
function handleTodoActions(event) {
    const clickedElement = event.target;

    // Delete todo
    if (clickedElement.classList.contains("trash-btn")) {
        const todoDiv = clickedElement.parentElement;
        removeTodoFromLocalStorage(todoDiv);
        todoDiv.remove();
    }

    // Mark todo as complete
    if (clickedElement.classList.contains("complete-btn")) {
        const todoDiv = clickedElement.parentElement;
        todoDiv.classList.toggle("completed");
        updateTodoCompletionInLocalStorage(todoDiv);
    }
}

// Function to save todo to local storage
function saveTodoToLocalStorage(todoText, isCompleted) {
    // Get existing todos from local storage or create a new array if none exist
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    // Create a new todo object and add it to the array
    const todo = { text: todoText, completed: isCompleted };
    todos.push(todo);

    // Save the updated array back to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to load todos from local storage
function loadTodosFromLocalStorage() {
    // Get existing todos from local storage or create a new array if none exist
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    // Debugging statement to check the loaded todos
    console.log("Loaded todos from local storage:", todos);

    // Loop through each todo and create the corresponding elements
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];

        // Check if todo is defined and has a text property
        
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        if (todo.completed) {
            todoDiv.classList.add("completed");
        }

        const todoItem = document.createElement("li");
        todoItem.innerText = todo.text;
        todoItem.classList.add("todo-item");
        todoDiv.appendChild(todoItem);

        const completeButton = document.createElement("button");
        completeButton.innerText = '✔';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        const trashButton = document.createElement("button");
        trashButton.innerText = '✖';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoListElement.appendChild(todoDiv);
        
    }
}

// Function to remove todo from local storage
function removeTodoFromLocalStorage(todoDiv) {
    // Get existing todos from local storage or create a new array if none exist
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    // Find and remove the corresponding todo
    const todoText = todoDiv.querySelector(".todo-item").innerText;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].text === todoText) {
            todos.splice(i, 1);
            break;
        }
    }

    // Save the updated array to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to update todo completion status in local storage
function updateTodoCompletionInLocalStorage(todoDiv) {
    // Get existing todos from local storage or create a new array if none exist
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    // Find and update the corresponding todo's completion status
    const todoText = todoDiv.querySelector(".todo-item").innerText;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].text === todoText) {
            todos[i].completed = todoDiv.classList.contains("completed");
            break;
        }
    }

    // Save the updated array to local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}
