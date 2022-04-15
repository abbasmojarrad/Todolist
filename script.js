const inputElm = document.querySelector(".todo-input");
const addTodoBtn = document.querySelector(".todo-button");
const filterTodo = document.querySelector(".filter-todo");
const todoListContainer = document.querySelector(".todo-list");
let todoList = [];

const completedFunc = (id) => {
  todoList.find((todo) => {
    todo.id === id && (todo.complete = !todo.complete);
  });
  filterGenerate();
  localStorage.setItem("todos", JSON.stringify(todoList));
};
const deleteFunc = (id) => {
  todoList = todoList.filter((todo) => todo.id !== id);
  filterGenerate();
  localStorage.setItem("todos", JSON.stringify(todoList));
};
const filterGenerate = () => {
  const filterMode = filterTodo.value;
  let filterTodos = null;
  if (filterMode === "completed") {
    filterTodos = todoList.filter((todo) => todo.complete);
  } else if (filterMode === "uncompleted") {
    filterTodos = todoList.filter((todo) => !todo.complete);
  } else {
    filterTodos = todoList;
  }

  
  generateTodo(filterTodos);
};

const generateTodo = (todos) => {
  todoListContainer.innerHTML = "";
  todos.forEach((todo) => {
    todoListContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="todo">
            <li class="todo-item ${todo.complete ? "completed" : ""}" data-id=${
        todo.id
      } >${todo.name}</li>
             <button class="complete-btn" onclick=completedFunc(${
               todo.id
             }) ><i class="fas fa-check"></i></button>
             <button class="trash-btn" onclick=deleteFunc(${
               todo.id
             })><i class="fas fa-trash"></i></button>
      </div>`
    );
  });
};

filterTodo.addEventListener("change", filterGenerate);
addTodoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let userVal = inputElm.value;
  let userTodo = {
    id: Math.floor(Math.random() * 9999999 * (Math.random() * 100000)),
    name: userVal,
    complete: false,
  };

  if (userVal) {
    todoList.push(userTodo);
    filterGenerate();
    localStorage.setItem("todos", JSON.stringify(todoList));
  }

  inputElm.value = "";
});
window.addEventListener("load", () => {
  todoList = JSON.parse(localStorage.getItem("todos")) || [];
  filterGenerate();
});
