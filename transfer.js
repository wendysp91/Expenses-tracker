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

    var items = JSON.parse(localStorage.getItem('accounts')) || {};

    if (Number(items[from_account]['amount']) === 0 || Number(items[from_account]['amount']) < amount) {
        showError('Amount in from account is insufficient');
        return;
    }
    if (items[from_account]['currency'] !== items[to_account]['currency']) {
        var cookie = getCookie();
        if (cookie !== '') {
            console.log(cookie)
        } else {
            var apiRate = await showData();
            var data = apiRate['data'];
            var mxn = data['MXN'];
            var eur = data['EUR'];
            var mxntousd = 1 / mxn;
            var eurtousd = 1 / eur;

            var fromCurrencyToUSD = { 'USD': 1, 'MXN': mxntousd, 'EUR': eurtousd };
            var fromUSDToCurrency = { 'USD': 1, 'MXN': mxn, 'EUR': eur };
            var number = Number(amount);

            var amountFrom = items[from_account]['amount'];
            var newAmountFrom = Number(amountFrom) - number;
            var currencyFrom = items[from_account]['currency'];

            var amountTo = items[to_account]['amount'];
            var newAmountTo = 0;
            var currencyTo = items[to_account]['currency'];

            if (currencyFrom === 'USD') {
                newAmountTo = fromUSDToCurrency[currencyTo] * number + Number(amountTo);
            } else if (currencyTo === 'USD') {
                newAmountTo = fromCurrencyToUSD[currencyFrom] * number + Number(amountTo);
            } else {
                newAmountTo = fromCurrencyToUSD[currencyFrom] * number * fromUSDToCurrency[currencyTo] + Number(amountTo);
            }

            items[from_account]['amount'] = Math.round((newAmountFrom + Number.EPSILON) * 100) / 100;
            items[to_account]['amount'] = Math.round((newAmountTo + Number.EPSILON) * 100) / 100;
            localStorage.setItem('accounts', JSON.stringify(items))

            setCookie(`${fromCurrencyToUSD}, ${fromUSDToCurrency}`);
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
    var id = new Date().getUTCMilliseconds();
    addItem(transferObj, id, 'transfer');
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
