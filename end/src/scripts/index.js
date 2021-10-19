import { renderTasks } from './renderer.js'; // импортируем из файла renderer.js функцию renderTasks
import { initTodoListHandlers } from './todoList.js'; // импортируем из файла todoList.js функцию initTodoListHandlers
import { getTasksList } from './tasksGetaway.js' // получаем список задач из сервера. Данный файл является прослойкой для общения с сервером и вся логика, которая касается
// работы с сервером размещается там
import { setItem } from './storage.js'; // импортируем из хранилища функцию setItem

document.addEventListener('DOMContentLoaded', () => { // при загрузке страницы
    getTasksList() // обращаемся на сервером за актуальным списком задач
        .then(tasksList => { // получаем promise и объект JS списка задач
            setItem('tasksList', tasksList) // записываем его локальное хранилище
            renderTasks(); // рендерим все наши задачи в html
        })
    initTodoListHandlers(); // инициализируем хэндлеры (обработчики), то есть подписываемся на кнопки создания задачи и клика на чекбокс
});

const onStarageChange = e => { // функция, принимает объект события 'storage' (локальное хранилище)
    if (e.key === 'tasksList') { // и проверяет, содержится ли ключ, с которым произошло изменение в нашем 'tasksList'
        renderTasks(); // если ключ из списка задач, мы заново рендерим весь список с учетом произошедших изменений
    }
};

window.addEventListener('storage', onStarageChange); // подписываемся на событие изменения в localStorage и при срабатывании вызываем
// callback-функцию

// 1. Get data from storage
// 2. Save data to front-end storage