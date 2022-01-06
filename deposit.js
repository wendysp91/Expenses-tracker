//variables
const form = document.querySelector('.form_deposit');
const list = document.querySelector('.list-deposit');

var addDeposit = (e) => {
    e.preventDefault();
    const to_account = document.querySelector('#to_account').value;
    const amount = document.querySelector('#amount').value;
    const currency = document.querySelector('#currency').value;

    if (to_account === '' || amount === '' || currency === '') {
        showError('Account fields cannot be empty');
        return;
    }

    const depositObj = {
        to_account,
        amount,
        currency
    }
    var id = new Date().getUTCMilliseconds();
    addItem(depositObj, id, 'deposit');
}

var myOnLoad = (obj) => {
    addOptions("to_account", obj);
};

var loadCurrency = () => {
    addCurrencies("currency", currencies);
};

//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addDeposit);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('deposit')) || {};
        accounts = JSON.parse(localStorage.getItem('accounts')) || {};
        for (const keys in items) {
            createHTML(items[keys], 'deposit');
        }
        myOnLoad(accounts);
        loadCurrency();
    });
}

eventListeners();