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

    const  depositObj = {
        to_account,
        amount,
        currency
    }
    addItem(depositObj);
}
//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addDeposit);
}

eventListeners();