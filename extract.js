//variables
const form = document.querySelector('.form_extract');
const list = document.querySelector('.list-extract');

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
    addItem(extractObj, 'extract');
}

var myOnLoad = (array) => {
    addOptions("from_account", array);
};

var loadCurrency = () => {
    addCurrencies("currency", currencies);
};

//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addExtract);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('extract')) || [];
        accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        items.forEach(item => {
            createHTML(item, 'extract');
        });
        myOnLoad(accounts);
        loadCurrency();
    });
}

eventListeners();