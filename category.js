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

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addCategory);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('categories')) || {};
        for (const keys in items) {
            createHTML(items[keys], 'categories');
        }
    });
}

eventListeners();