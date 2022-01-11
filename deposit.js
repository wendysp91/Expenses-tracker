//variables
const form = document.querySelector('.form_deposit');
const list = document.querySelector('.list-deposit');

var addDeposit = (e) => {
    e.preventDefault();
    const to_account = document.querySelector('#to_account').value;
    const amount = document.querySelector('#amount').value;

    if (to_account === '' || amount === '') {
        showError('Account fields cannot be empty');
        return;
    }

    const depositObj = {
        to_account,
        amount
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

var myOnLoad = (obj) => {
    addOptions("to_account", obj);
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

    });
}

eventListeners();