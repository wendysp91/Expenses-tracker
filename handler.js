
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

var createHTML = (item, type) => {
    var row = '';
    var li = document.createElement('li');
    for (const keys in item) {
        row += `${item[keys]} `;
    }

    li.innerText = row;
    list.appendChild(li);

    sincronizeStorage(type);
}

var sincronizeStorage = (type) => {
    localStorage.setItem(type, JSON.stringify(items));
};

function addOptions(domElement, obj) {
    var select = document.getElementById(domElement);

    for (const key in obj) {
        var option = document.createElement("option");
        option.text = key;
        select.add(option);
    }
}

function addCurrencies(domElement, array) {
    var select = document.getElementById(domElement);

    array.forEach(element => {
        var option = document.createElement("option");
        option.text = element;
        select.add(option);
    });
}

function setCookie(value) {
    /* var date = new Date();
     date.setDate(date.getDate() + 1);
     var dateString = date.toGMTString();
     var cookieString = "exchangeRate=" + value + dateString;
     document.cookie = cookieString;*/
    window.cookieMock = value;
}

function getCookie() {
    /*return document.cookie;*/
    return window.cookieMock;
}

/*


en transfer if el currency de from-account != to-account
then if cookie existe
then get value y hacer cosas
else
then hacer peticion a la api
cuando responda ok
crear cookie con el valor base y la fecha de expiracion


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
*/