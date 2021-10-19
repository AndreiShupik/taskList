import { renderTasks } from './renderer.js'; // импортируем сгенерированые задачи функцией renderTasks
import { getItem, setItem } from './storage.js'; // импортируем из хранилища функции getItem и setItem
import { updateTask, getTasksList, deleteTask } from './tasksGetaway.js'; // импортируем метод для обновления задачи updateTask

const onToggleTask = (e, text, createDate) => { // при срабатывании клика на родитель ul
    const taskId = e.target.dataset.id
    const done = e.target.checked; // создаем константу done и присваиваем ей текущее значение checked элемента (true/false)

    const updatedTask = { // создаем новый объект для измененной задачи
        text, // текст остается прежним
        createDate, // дата создания
        done, // выполнена/нет?
        finishDate: done ? // дата завершения задачи с присвоенным ей значением: если done = true, создаем новую дату в 
            new Date().toISOString() : null // формате ISO 8601, если done = false, устанавливаем finishDate в null
    }
    updateTask(taskId, updatedTask) // вызываем функцию для обновления задачи на сервере и передаем ей в аргументы id задачи и новый объект для задачи, которую будем
        // менять
        .then(() => getTasksList()) // получив promise, мы считываем список задач с back-end сервера
        .then(newTasksList => { // получив promise от предыдущего .then 
            setItem('tasksList', newTasksList) // при помощи функции setItem обновляем локальное хранилище
            renderTasks() // функция ориентируется на локальное хранилище и получив promise от предыдущего .then(запись данных в локальное хранилище), отрисовывает html
        }) // с актуальным списком задач)
};

const onDeleteTask = (id) => {
    deleteTask(id)
        .then(() => getTasksList())
        .then(newTasksList => {
            setItem('tasksList', newTasksList)
            renderTasks()
        })
}

export const onListClick = e => {
    const taskId = e.target.dataset.id
    const tasksList = getItem('tasksList')
    const { text, createDate, id } = tasksList
        .find(task => task.id === taskId)

    const isCheckbox = e.target.classList.contains('list-item__checkbox')
    const isDeleteBtn = e.target.classList.contains('list-item__delete-btn')
    if (isCheckbox) {
        onToggleTask(e, text, createDate)
    } else if (isDeleteBtn) {
        onDeleteTask(id)
    }
    // return
}

// 1. Prepare data
// 2. Update data in db
// 3. Read new data from server
// 4. Save new data to front-end
// 5. Update UI based on new data