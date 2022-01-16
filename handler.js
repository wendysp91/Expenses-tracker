let items = new Object();
const currencies = ["USD", "MXN", "EUR"];

var addItem = (item, id, type, renderFn) => {
    var createFn = renderFn || createHTML;
    items[id] = item;
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

var createHTML = (item, type, id) => {
    var tr = document.createElement('tr');
    var tbody = document.querySelector('.body_table');

    for (const keys in item) {
        var td = document.createElement('td');
        td.innerText = `${item[keys]} `;
        tr.appendChild(td);
    }
    var td = document.createElement('td');
    td.innerText = "X";
    td.setAttribute("data-id", id)
    tr.appendChild(td);
    tbody.appendChild(tr);
    list.appendChild(tbody);

    sincronizeStorage(type);
}

var sincronizeStorage = (type) => {
    localStorage.setItem(type, JSON.stringify(items));
};

function addOptions(domElement, key, currency = '') {
    var select = document.getElementById(domElement);
    var option = document.createElement("option");
    option.text = `${key}${currency}`;
    option.value = key;
    select.add(option);

}

function addCurrencies(domElement, array) {
    var select = document.getElementById(domElement);

    array.forEach(element => {
        var option = document.createElement("option");
        option.text = element;
        select.add(option);
    });
}

function setCookie(name, value, days = 1) {

    var date = new Date();
    date.setDate(date.getDate() + days);
    var expires = "; expires=" + date.toGMTString();
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

