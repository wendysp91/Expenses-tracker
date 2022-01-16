//variables
const form = document.querySelector('.form_category');
const list = document.querySelector('.list-categories');

var addCategory = (e) => {
    e.preventDefault();
    const categoryName = document.querySelector('#category_name').value;
    const description = document.querySelector('#desc_category').value;

    if (categoryName === '' || description === '') {
        showError('Category field cannot be empty');
        return;
    }
    var items = JSON.parse(localStorage.getItem('categories')) || {};
    for (const keys in items) {
        if (categoryName === items[keys]['categoryName']) {
            showError('Category already exist');
            return;
        }
    }
    const categoryObj = {
        categoryName,
        description
    }
    var id = categoryObj.categoryName;
    addItem(categoryObj, id, 'categories');
}
//Deleting an item from the deposit list
var deleteItem = (item, id) => {
    delete item[id]
    localStorage.setItem('categories', JSON.stringify(item))
    const tbody = document.querySelector('.body_table');
    tbody.innerHTML = '';
    for (const keys in items) {
        createHTML(items[keys], 'categories', keys);
    }
}
//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addCategory);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('categories')) || {};
        for (const keys in items) {
            createHTML(items[keys], 'categories', keys);
        }
    });
    const tbody = document.querySelector('.body_table');
    tbody.addEventListener("click", (e) => {
        var id = e.target.getAttribute("data-id")
        if (e.target.innerText === "X") {
            console.log(items[id])
            deleteItem(items, id);
        }
    })
}
eventListeners();