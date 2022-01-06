//variables
const form = document.querySelector('.form_transfer');
const list = document.querySelector('.list-transfers');

async function showData() {
    try {
        const json = await getData();
        console.log(json);
        return json;
    } catch (error) {
        console.log(error)
    }
}
function getData() {

    return fetch('https://freecurrencyapi.net/api/v2/latest?apikey=469b5510-6d19-11ec-a6b5-e75fafe6747a&base_currency=USD')
        .then(response => response.json())
        .then(json => json)
}

var addTransfer = async (e) => {
    e.preventDefault();
    const from_account = document.querySelector('#from_account').value;
    const to_account = document.querySelector('#to_account').value;
    const amount = document.querySelector('#amount').value;

    if (from_account === '' || to_account === '' || amount === '') {
        showError('Account fields cannot be empty');
        return;
    }
    if (from_account === to_account) {
        showError('From account and to account must be different');
        return;
    }

    const transferObj = {
        from_account,
        to_account,
        amount
    }
    var id = new Date().getUTCMilliseconds();
    addItem(transferObj, id, 'transfer');

    var items = JSON.parse(localStorage.getItem('accounts')) || {};

    if (items[from_account]['currency'] !== items[to_account]['currency']) {
        if (getCookie() !== '') {
            var rate = getCookie();
            console.log(rate)
        } else {
            var apiRate = await showData();
            var data = apiRate['data'];
            var mxn = data['MXN'];
            var eur = data['EUR'];
            setCookie(`mxn: ${mxn}, eur: ${eur} `);
        }
    } else {
        var number = Number(amount);
        var amountFrom = items[from_account]['amount'];
        var newAmountFrom = Number(amountFrom) - number;
        var amountTo = items[to_account]['amount'];
        var newAmountTo = Number(amountTo) + number;
        items[from_account]['amount'] = newAmountFrom;
        items[to_account]['amount'] = newAmountTo;
        localStorage.setItem('accounts', JSON.stringify(items))


    }
}

var myOnLoad = (obj) => {
    addOptions("to_account", obj);
    addOptions("from_account", obj);
};

//event listeners
var eventListeners = () => {
    form.addEventListener('submit', addTransfer);

    document.addEventListener('DOMContentLoaded', () => {
        items = JSON.parse(localStorage.getItem('transfer')) || {};
        accounts = JSON.parse(localStorage.getItem('accounts')) || {};
        for (const keys in items) {
            createHTML(items[keys], 'transfer');
        }
        myOnLoad(accounts);
    });
}

eventListeners();
