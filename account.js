//variables
const form = document.querySelector('.form-account');
const list = document.querySelector('.list-accounts');

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
    addItem(accountObj, 'accounts');
}

//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addAccount);
    
    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('accounts')) || [];
        items.forEach(item => {
            createHTML(item, 'accounts');
        });
    });
}

eventListeners();
