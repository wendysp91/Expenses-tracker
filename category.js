//variables
const form = document.querySelector('.form_category');
const list = document.querySelector('.list-categories');
let categories = [];


var addCategory = (e) => {
    e.preventDefault();
    const categoryName = document.querySelector('#category_name').value;
    const description = document.querySelector('#desc_category').value;

    if (categoryName === '' || description === '') {
        showError('Account field cannot be empty');
        return;
    }

    const categoryObj = {
        categoryName,
        description
    }
    categories.push(categoryObj);

    createHTML();
    form.reset();
}
var showError = (error) => {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');

    const containerError = document.querySelector('.error-message');
    containerError.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}
var createHTML = () => {
    if (categories.length > 0) {
        categories.forEach(cat => {
            const li = document.createElement('li');
            li.innerText = cat.categoryName + ' ' + cat.description;
            list.appendChild(li);
        });
    }
}

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addCategory);
}

eventListeners();
//functions
