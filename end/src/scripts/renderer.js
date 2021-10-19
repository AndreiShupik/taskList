import { getItem } from './storage.js'; // импортируем из файла для работы с localStorage список задач в 43й строке
import { deleteTask } from './tasksGetaway.js';

const listElem = document.querySelector('.list'); // создаем DOM-объект элемента ul класса .list

const compareTasks = (a, b) => { // функция для сортировки элементов массива
    if (a.done - b.done !== 0) { // если свойство done (завершен) элемента a (1й элемент сравнения) минус (-) b (второй элемент 
        return a.done - b.done; // сравнения).done не вернет 0 (true - true = 0, false - false = 0), то есть, у элементов разные значения
    }; // done, то мы сравниваем элементы между собой:
    // 1) a.done(true) - b.done(false) = 1. При возврате 1, a остается в списке выше, чем b
    // 2) a.done(false) - b.done(true) = -1. При возврате -1, b становится в списке выше, чем a.

    if (a.done) { // если a.done(завершен) true
        return new Date(b.finishDate) - new Date(a.finishDate); // при помощи конструктора класса Date(дата), сравниваем значение свойства
    } // конца выполнения задач b и a. При получении 1, a поднимается выше b (с момента завершения b прошло больше времени, чем у a).
    // Если вернет -1, b поднимается выше, чем a (с момента завершения a прошло больше времени, чем с момента завершения b)
    return new Date(b.createDate) - new Date(a.createDate); // теперь сравниваем значения свойств создания задач по тому же принципу:
}; // 1 - b была создана раньше, чем a, потому a поднимается выше. -1 - a была создана раньше, чем b, потому b поднимается выше

const createCheckbox = ({ done, id }) => { // функция создает чекбоксы для элементов списка li
    const checkboxElem = document.createElement('input'); // создаем html элемент input
    checkboxElem.setAttribute('type', 'checkbox'); // устанавливаем ему атрибут type: checkbox
    checkboxElem.setAttribute('data-id', id); // устанавливаем атрибут data-id и передаем значение конкретного элемента li
    checkboxElem.checked = done; // свойству checked (выбран) устанавливаем текущее значение (false/true)
    checkboxElem.classList.add('list-item__checkbox'); // добавляем чекбоксу класс с соответствующими стилями list__item-checkbox

    return checkboxElem; // возвращаем готовый чекбокс элемент
}

const createListItem = ({ text, done, id }) => { // функция принимает в аргументы 3 свойства объекта массива
    const listItemElem = document.createElement('li'); // создаем новый li html элемент для каждого элемента массива 
    listItemElem.classList.add('list-item', 'list__item'); // добавляем каждому li два класса: list-item и list__item
    const checkboxElem = createCheckbox({ done, id }); // создаем для каждого чекбокс, обращаясь к функции createCheckbox и передав ей
    // атрибуты done и id элемента. Ждем из функции объект элемента чекбокс
    if (done) { // если свойство done элемента массива true
        listItemElem.classList.add('list-item_done'); // добавляем ему соответствующий класс
    }

    const textElem = document.createElement('span') // создаем для текста содержимого таски отдельный span
    textElem.classList.add('list-item__text') // присваиваем ему класс
    textElem.textContent = text // вставляем, как содержимое наш текст таски

    const deleteBtnElem = document.createElement('button') // создаем элемент крестика для удаления таски
    deleteBtnElem.classList.add('list-item__delete-btn') // добавляем элементу крестика класс со стилями
    deleteBtnElem.setAttribute('data-id', id) // добавляем крестику data-id и передем значение конкретного элемента li
    listItemElem.append(checkboxElem, textElem, deleteBtnElem); // вставляем в каждый li элемент чекбокс, сам текст задачи и крестик для удаления задачи

    return listItemElem; // по очереди возвращаем готовые элементы списка
}

export const renderTasks = () => { // функция рендеринга задач
    const tasksList = getItem('tasksList') || []; // обращаемся к localStorage за списком задач (tasksList), или, если задач нет, за 
    // пустым списком []
    listElem.innerHTML = ''; // добавляем пока пустой html в наш список (ul, класс .list)
    const tasksElems = tasksList // создаем массив для элементов задач, из полученного в localStorage списка задач
        .sort(compareTasks) // с помощью метода массива .sort вызываем callback-функцию compareTasks
        .map(createListItem); // маппим полученный отсортированный список задач функцией createListItem

    listElem.append(...tasksElems); // при помощи spread оператора, добавляем в ul весь список сгенерированных задач 
};