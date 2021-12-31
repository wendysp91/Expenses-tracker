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

    const categoryObj = {
        categoryName,
        description
    }
    addItem(categoryObj, 'categories');
}

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addCategory);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('categories')) || [];
        items.forEach(item => {
            createHTML(item, 'categories');
        });
    });
}

eventListeners();