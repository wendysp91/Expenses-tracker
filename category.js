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
    addItem(categoryObj);
}

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addCategory);
}

eventListeners();