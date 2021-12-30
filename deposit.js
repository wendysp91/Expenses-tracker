//variables
const form = document.querySelector('.form_deposit');
const list = document.querySelector('.list-deposit');
let deposits = [];


var addDeposit = (e) => {
    e.preventDefault();
    const to_account = document.querySelector('#to_account').value;
    const amount = document.querySelector('#amount').value;
    const currency = document.querySelector('#currency').value;

    if (to_account === '' || amount === '' || currency === '') {
        showError('Account fields cannot be empty');
        return;
    }

    const  depositObj = {
        to_account,
        amount,
        currency
    }
    deposits.push(depositObj);

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
    if (deposits.length > 0) {
        deposits.forEach(dep => {
            const li = document.createElement('li');
            li.innerText = dep.to_account + ' ' + dep.amount + ' ' + dep.currency;
            list.appendChild(li);
        });
    }
}

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addDeposit);
}

eventListeners();
//functions
