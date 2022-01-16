//variables
const form = document.querySelector('.form_deposit');
const list = document.querySelector('.list-deposit');

var addDeposit = (e) => {
    e.preventDefault();
    const to_account = document.querySelector('#to_account').value;
    const amount = document.querySelector('#amount').value;
    const category = document.querySelector('#category').value;

    if (to_account === '' || amount === '' || category === '') {
        showError('Account fields cannot be empty');
        return;
    }

    const depositObj = {
        to_account,
        amount,
        category
    }
    var id = new Date().getUTCMilliseconds();
    addItem(depositObj, id, 'deposit');

    var items = JSON.parse(localStorage.getItem('accounts')) || {};
    var number = Number(amount);
    var amountTo = items[to_account]['amount'];
    var newAmountTo = Number(amountTo) + number;
    items[to_account]['amount'] = newAmountTo;
    localStorage.setItem('accounts', JSON.stringify(items))

}

var accountsSelect = (obj) => {
    for (const key in obj) {
        addOptions("to_account", key, `, ${obj[key]['currency']}`);
    }
};

var categoriesSelect = (obj) => {
    for (const key in obj) {
        addOptions("category", key);
    }
}
//Deleting an item from the deposit list
var deleteItem = (item, id) => {
    delete item[id]
    localStorage.setItem('deposit', JSON.stringify(item))
    const tbody = document.querySelector('.body_table');
    tbody.innerHTML = '';
    for (const keys in items) {
        createHTML(items[keys], 'deposit', keys);
    }
}
//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addDeposit);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('deposit')) || {};
        accounts = JSON.parse(localStorage.getItem('accounts')) || {};
        categories = JSON.parse(localStorage.getItem('categories')) || {};
        for (const keys in items) {
            createHTML(items[keys], 'deposit', keys);
        }
        accountsSelect(accounts);
        categoriesSelect(categories)
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