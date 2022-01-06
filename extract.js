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

    const extractObj = {
        from_account,
        amount,
        currency
    }
    var id = new Date().getUTCMilliseconds();
    addItem(extractObj, id, 'extract');
}

var myOnLoad = (obj) => {
    addOptions("from_account", obj);
};

var loadCurrency = () => {
    addCurrencies("currency", currencies);
};

//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addExtract);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('extract')) || {};
        accounts = JSON.parse(localStorage.getItem('accounts')) || {};
        for (const keys in items) {
            createHTML(items[keys], 'extract');
        }
        myOnLoad(accounts);
        loadCurrency();
    });
}

eventListeners();