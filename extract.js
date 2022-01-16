//Selector
const form = document.querySelector('.form_extract');
const list = document.querySelector('.list-extract');
//Extract Operation
var addExtract = (e) => {
    e.preventDefault();
    const from_account = document.querySelector('#from_account').value;
    const amount = document.querySelector('#amount').value;
    const category = document.querySelector('#category').value;

    if (from_account == "" || amount == "" || category == "") {
        showError('Account fields cannot be empty');
        return;
    }
    const extractObj = {
        from_account,
        amount,
        category
    }
    var id = new Date().getUTCMilliseconds();
    addItem(extractObj, id, 'extract');

    var items = JSON.parse(localStorage.getItem('accounts')) || {};
    var number = Number(amount);
    var amountFrom = items[from_account]['amount'];
    var newAmountFrom = Number(amountFrom) - number;
    items[from_account]['amount'] = newAmountFrom;
    localStorage.setItem('accounts', JSON.stringify(items))
}
//Adding options in the accounts select
var accountsSelect = (obj) => {
    for (const key in obj) {
        addOptions("from_account", key, `, ${obj[key]['currency']}`);
    }
};
//Adding options in the category select
var categoriesSelect = (obj) => {
    for (const key in obj) {
        addOptions("category", key);
    }
}
//Deleting an item from the extract list
var deleteItem = (item, id) => {
    delete item[id]
    localStorage.setItem('extract', JSON.stringify(item))
    const tbody = document.querySelector('.body_table');
    tbody.innerHTML = '';
    for (const keys in items) {
        createHTML(items[keys], 'extract', keys);
    }
}
//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addExtract);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('extract')) || {};
        accounts = JSON.parse(localStorage.getItem('accounts')) || {};
        categories = JSON.parse(localStorage.getItem('categories')) || {};
        for (const keys in items) {
            createHTML(items[keys], 'extract', keys);
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