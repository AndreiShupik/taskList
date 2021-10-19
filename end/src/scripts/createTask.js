import { renderTasks } from './renderer.js';
import { getItem, setItem } from './storage.js';
import { createTask, getTasksList } from './tasksGetaway.js';

export const onCreateTask = () => { // функция по созданию новой задачи
    const taskTitleInputElem = document.querySelector('.task-input'); // создаем объект DOM-элемента input'а

    const text = taskTitleInputElem.value; // создаем переменную для текста задачи введенного в input

    if (!text) { // если текста нет (пусто)
        return; // выходим из функции
    }
    taskTitleInputElem.value = ''; // иначе, стираем введнный текст из строки

    const newTask = { // создаем новую таску с 
        text, // текстом новой задачи из input
        done: false, // done, автоматически установленным false (так как задача новая)
        createDate: new Date().toISOString(), // текущей датой создания новой задачи в формате ISO-8601
    }

    createTask(newTask) // передаем новую таску в функцию по созданию новой задачи на сервере в файле tasksGetAway.js
        .then(() => getTasksList()) // получив promise, мы считываем список задач с back-end сервера
        .then(newTasksList => { // получив promise от предыдущего .then 
            setItem('tasksList', newTasksList) // при помощи функции setItem обновляем локальное хранилище
            renderTasks() // функция ориентируется на локальное хранилище и получив promise от предыдущего .then(запись данных в локальное хранилище), отрисовывает html
        }) // с актуальным списком задач

};

// 1. Prepare data
// 2. Write data to db
// 3. Read new data from server
// 4. Save new data to front-end
// 5. Update UI based on new data