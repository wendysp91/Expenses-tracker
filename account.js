//variables
const form = document.querySelector('.form-account');
const list = document.querySelector('.list-accounts');
let accounts = [];


var addAccount = (e) => {
    e.preventDefault();
    const accountName = document.querySelector('#acc_name').value;
    const amount = document.querySelector('#amount').value;
    const currency = document.querySelector('#currency').value;

    if (accountName === '' || amount === '' || currency === '') {
        showError('Account field cannot be empty');
        return;
    }

    const  accountObj = {
        accountName,
        amount,
        currency
    }
    accounts.push(accountObj);

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
    if (accounts.length > 0) {
        accounts.forEach(acc => {
            const li = document.createElement('li');
            li.innerText = acc.accountName + ' ' + acc.amount + ' ' + acc.currency;
            list.appendChild(li);
        });
    }
}

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addAccount);
}

eventListeners();
//functions
