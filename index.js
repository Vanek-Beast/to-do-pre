const items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

// Необходимые элементы разметки
const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

// Загружает задачи
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks && tasks.length > 0) {
    return tasks;
  }

  return items;
}

// Создает задачу и настраивает обработчики событий для задачи
function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(
    ".to-do__item-button_type_duplicate"
  );
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  function handleDelete() {
    clone.remove();
    const items = getTasksFromDOM();
    saveTasks(items);
  }

  function handleDuplicate() {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  }

  function handleEdit() {
    textElement.setAttribute("contenteditable", "true");
    textElement.focus();
  }

  function handleTextBlur() {
    textElement.setAttribute("contenteditable", "false");
    const items = getTasksFromDOM();
    saveTasks(items);
  }

  // Удаление задачи
  deleteButton.addEventListener("click", handleDelete);

  // Копирование задачи
  duplicateButton.addEventListener("click", handleDuplicate);

  // Редактирование задачи
  editButton.addEventListener("click", handleEdit);

  // Текст задачи изменен
  textElement.addEventListener("blur", handleTextBlur);

  return clone;
}

// Получение массива задач из DOM
function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];

  itemsNamesElements.forEach((item) => tasks.push(item.textContent));

  return tasks;
}

// Сохранение задач в localStorage
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

const tasks = loadTasks();

tasks.forEach((task) => listElement.append(createItem(task)));

// Обработка отправки формы (добавления задачи)
formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const task = inputElement.value;

  listElement.prepend(createItem(task));

  items = getTasksFromDOM();
  saveTasks(items);

  formElement.reset();
});
