const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

// Load saved TODOs from Local Storage on page load
document.addEventListener('DOMContentLoaded', loadTodos);

function newTodo() {
  const todoText = prompt('Enter a new TODO:');
  if (todoText) {
    const listItem = document.createElement('li');
    listItem.className = classNames.TODO_ITEM;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = classNames.TODO_CHECKBOX;
    checkbox.onclick = updateUncheckedCount;

    const textSpan = document.createElement('span');
    textSpan.className = classNames.TODO_TEXT;
    textSpan.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.className = classNames.TODO_DELETE;
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = deleteTodo;

    listItem.appendChild(checkbox);
    listItem.appendChild(textSpan);
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);

    updateItemCount();
    updateUncheckedCount();
    saveTodos(); // Save updated TODOs to Local Storage
  }
}

function deleteTodo() {
  this.parentNode.remove();
  updateItemCount();
  updateUncheckedCount();
  saveTodos(); // Save updated TODOs to Local Storage
}

function updateItemCount() {
  itemCountSpan.textContent = list.childElementCount;
}

function updateUncheckedCount() {
  const uncheckedCount = Array.from(list.children).filter(
    (item) => !item.querySelector(`.${classNames.TODO_CHECKBOX}`).checked
  ).length;
  uncheckedCountSpan.textContent = uncheckedCount;
}

function saveTodos() {
  const todos = Array.from(list.children).map((item) => {
    return {
      text: item.querySelector(`.${classNames.TODO_TEXT}`).textContent,
      checked: item.querySelector(`.${classNames.TODO_CHECKBOX}`).checked,
    };
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    const todos = JSON.parse(savedTodos);

    todos.forEach((todo) => {
      const listItem = document.createElement('li');
      listItem.className = classNames.TODO_ITEM;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = classNames.TODO_CHECKBOX;
      checkbox.checked = todo.checked;
      checkbox.onclick = updateUncheckedCount;

      const textSpan = document.createElement('span');
      textSpan.className = classNames.TODO_TEXT;
      textSpan.textContent = todo.text;

      const deleteButton = document.createElement('button');
      deleteButton.className = classNames.TODO_DELETE;
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = deleteTodo;

      listItem.appendChild(checkbox);
      listItem.appendChild(textSpan);
      listItem.appendChild(deleteButton);

      list.appendChild(listItem);
    });

    updateItemCount();
    updateUncheckedCount();
  }
}
