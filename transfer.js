//variables
const form = document.querySelector('.form_transfer');
const list = document.querySelector('.list-transfers');
let transfers = [];


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
    transfers.push(transferObj);

    createHTML();
    form.reset();
}
var showError = (error) => {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = error;
    errorMessage.classList.add('error');

    const containerError = document.querySelector('.error-message');
    containerError.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}
var createHTML = () => {
    if (transfers.length > 0) {
        transfers.forEach(tra => {
            const li = document.createElement('li');
            li.innerText = tra.from_account + ' ' + tra.from_account + ' ' + tra.amount + ' ' + tra.currency;
            list.appendChild(li);
        });
    }
}

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', addTransfer);
}

eventListeners();
//functions
