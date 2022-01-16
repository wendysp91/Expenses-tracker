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
    var items = JSON.parse(localStorage.getItem('accounts')) || {};
    for (const keys in items) {
        if (accountName === items[keys]['accountName']) {
            showError('Account already exist');
            return;
        }
    }
    const accountObj = {
        accountName,
        amount,
        currency
    }
    var id = accountObj.accountName;
    addItem(accountObj, id, 'accounts');
}

var loadCurrency = () => {
    addCurrencies("currency", currencies);
};
//Deleting an item from the deposit list
var deleteItem = (item, id) => {
    delete item[id]
    localStorage.setItem('accounts', JSON.stringify(item))
    const tbody = document.querySelector('.body_table');
    tbody.innerHTML = '';
    for (const keys in items) {
        createHTML(items[keys], 'accounts', keys);
    }
}
//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addAccount);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('accounts')) || {};
        for (const keys in items) {
            createHTML(items[keys], 'accounts', keys);
        }
        loadCurrency();
    });
    const tbody = document.querySelector('.body_table');
    tbody.addEventListener("click", (e) => {
        var id = e.target.getAttribute("data-id")
        if (e.target.innerText === "X") {
            console.log(items[id])
            deleteItem(items, id);
        }
    })
}
eventListeners();