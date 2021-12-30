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
    addItem(extractObj);
}

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addExtract);
}

eventListeners();