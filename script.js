//variables
const form = document.querySelector('.form-account');
const list = document.querySelector('.list-accounts');
let accounts = [];

//event listeners

var eventListeners = () => {
    form.addEventListener('submit', agregarAccount);

}

//functions
var agregarAccount = (e) => {
    e.preventDefault();

    const accountName = document.querySelector('#acc_name').value;

    if (accountName === '') {
        showError('Account name cannot be empty');
        return;
    }

    const  accountObj = {
        accountName
    }
    accounts.push(accountObj);

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
    if (accounts.length > 0) {
        console.log(accounts.length)

        accounts.forEach(acc => {

            const li = document.createElement('li');
            li.innerText = acc.accountName;
            list.appendChild(li);
        });
    }
}





eventListeners();