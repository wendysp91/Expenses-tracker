let items = [];
const currencies = ["USD", "MXN", "EUR"];

var addItem = (item, type, renderFn) => {
    var createFn = renderFn || createHTML;
    items.push(item);
    createFn(item, type);
    form.reset();
};

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

var createHTML = (item, type) => {
        var row = '';
        var li = document.createElement('li');
        var keys = Object.keys(item);
        for ( var i = 0; i < keys.length; i++){
            row += `${item[keys[i]]} `;
        }
        li.innerText = row;
        list.appendChild(li);
   
    sincronizeStorage(type);
}

var sincronizeStorage = (type) => {
    localStorage.setItem(type, JSON.stringify(items));
};

function addOptions(domElement, array) {
    var select = document.getElementById(domElement);
   
    array.forEach(element => {
        var option = document.createElement("option");
        option.text = element[Object.keys(element)[0]];
        select.add(option);
    }); 
}
function addCurrencies(domElement, array) {
    var select = document.getElementById(domElement);
   
    array.forEach(element => {
        var option = document.createElement("option");
        option.text = element;
        select.add(option);
    }); 
}
