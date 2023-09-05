const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const btnCancel = document.querySelector("#cancel-edit-btn");

let oldTodoTitle;
// funções
const saveTodo = (text) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const title = document.createElement("h3");
  title.innerText = text;
  todo.appendChild(title);

  const finishBtn = document.createElement("button");
  finishBtn.classList.add("finish-todo");
  finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(finishBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-todo");
  removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(removeBtn);

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
};

const toggleEdit = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");
    if (todoTitle.innerText === oldTodoTitle) {
      todoTitle.innerText = text;
    }
  });
};

// eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = todoInput.value;
  if (!inputValue) return;
  saveTodo(inputValue);
});

document.addEventListener("click", (e) => {
  const targetElement = e.target;
  const parentElement = targetElement.closest("div");
  let todoTitle;

  if (parentElement && parentElement.querySelector("h3")) {
    todoTitle = parentElement.querySelector("h3").innerText;
  }

  if (targetElement.classList.contains("finish-todo")) {
    parentElement.classList.toggle("done");
  }

  if (targetElement.classList.contains("edit-todo")) {
    toggleEdit();

    editInput.value = todoTitle;
    oldTodoTitle = todoTitle;
  }

  if (targetElement.classList.contains("remove-todo")) {
    parentElement.remove();
  }
});

btnCancel.addEventListener("click", (e) => {
  e.preventDefault();
  toggleEdit();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleEdit();
});
