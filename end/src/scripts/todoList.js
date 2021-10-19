import { onCreateTask } from './createTask.js'; // импортируем из createTask.js функцию onCreateTask
/*import { onToggleTask } from './updateTask.js'; // импортируем из updateTask.js функцию onToggleTask*/
import { onListClick } from './updateTask.js'; // импортируем из updateTask.js функцию onToggleTask

export const initTodoListHandlers = () => {
    const createBtnElem = document.querySelector('.create-task-btn');
    createBtnElem.addEventListener('click', onCreateTask); // подписываемся на кнопку создания задачи и вызываем функцию onCreateTask
    // из файла по созданию задач createTask

    const todoListElem = document.querySelector('.list');
    todoListElem.addEventListener('click', onListClick); // подписываемся на клик по чекбоксу или крестику (через делегирование от
    // родителя)
}