//variables
const form = document.querySelector('.form_transfer');
const list = document.querySelector('.list-transfers');

var addTransfer = (e) => {
    e.preventDefault();
    const from_account = document.querySelector('#from_account').value;
    const to_account = document.querySelector('#to_account').value;
    const amount = document.querySelector('#amount').value;
    const currency = document.querySelector('#currency').value;

    if (from_account === '' || to_account === '' || amount === '' || currency === '') {
        showError('Account fields cannot be empty');
        return;
    }

    const  transferObj = {
        from_account,
        to_account,
        amount,
        currency
    }
    addItem(transferObj, 'transfer');
}

var myOnLoad = (array) => {
    addOptions("to_account", array);
    addOptions("from_account", array);
};

//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addTransfer);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('transfer')) || [];
        accounts = JSON.parse(localStorage.getItem('accounts')) || [];
        items.forEach(item => {
            createHTML(item, 'transfer');
        });
        myOnLoad(accounts);
    });
}

eventListeners();
