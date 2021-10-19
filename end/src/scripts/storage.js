export const setItem = (key, value) => { // функция принимает в атрибуты ключ: значение объекта
    localStorage.setItem(key, JSON.stringify(value)); // и заносим через метод setItem() localeStorage ключ и сериализированние
}; // значение его свойства с помощью JSON.stringify()

export const getItem = key => JSON.parse(localStorage.getItem(key)); // функция, которая принимает в атрибут ключ объекта, через метод
// getItem localStorage находит его в хранилище и парсит JSON.parse