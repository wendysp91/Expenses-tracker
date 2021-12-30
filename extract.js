//variables
const form = document.querySelector('.form_extract');
const list = document.querySelector('.list-extract');
let extracts = [];


var addExtract = (e) => {
    e.preventDefault();
    const from_account = document.querySelector('#from_account').value;
    const amount = document.querySelector('#amount').value;
    const currency = document.querySelector('#currency').value;

    if (from_account === '' || amount === '' || currency === '') {
        showError('Account fields cannot be empty');
        return;
    }

    const  extractObj = {
        from_account,
        amount,
        currency
    }
    deposits.push(extractObj);

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
    if (extracts.length > 0) {
        extracts.forEach(ext => {
            const li = document.createElement('li');
            li.innerText = ext.from_account + ' ' + ext.amount + ' ' + ext.currency;
            list.appendChild(li);
        });
    }
}

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addExtract);
}

eventListeners();
//functions
