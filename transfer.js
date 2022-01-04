//variables
const form = document.querySelector('.form_transfer');
const list = document.querySelector('.list-transfers');

var addTransfer = (e) => {
    e.preventDefault();
    const from_account = document.querySelector('#from_account').value;
    const to_account = document.querySelector('#to_account').value;
    const amount = document.querySelector('#amount').value;

    if (from_account === '' || to_account === '' || amount === '') {
        showError('Account fields cannot be empty');
        return;
    }

    const transferObj = {
        from_account,
        to_account,
        amount
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

        async function showData() {
            try {
                const json = await getData();
                console.log(json);
            } catch (error) {
                console.log(error)
            }
        }
        function getData() {

            return fetch('http://api.exchangeratesapi.io/v1/latest?access_key=f64eb0d97aa8aea9e421e43d83113f7f')
                .then(response => response.json())
                .then(json => json)
        }
        showData();
    });
}

eventListeners();
