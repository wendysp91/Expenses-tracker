//variables
const form = document.querySelector('.form_extract');
const list = document.querySelector('.list-extract');

var addExtract = (e) => {
    e.preventDefault();
    const from_account = document.querySelector('#from_account').value;
    const amount = document.querySelector('#amount').value;
    const category = document.querySelector('#category').value;

    if (from_account === '' || amount === '') {
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

var myOnLoad = (obj) => {
    for (const key in obj) {
        addOptions("from_account", key, `, ${obj[key]['currency']}`);
    }
};
var categoriesSelect = (obj) => {
    for (const key in obj) {
        addOptions("category", key);
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
            createHTML(items[keys], 'extract');
        }
        myOnLoad(accounts);
        categoriesSelect(categories)
    });
}
eventListeners();