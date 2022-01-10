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
    var from_account = document.querySelector('#from_account').value;
    var to_account = document.querySelector('#to_account').value;
    var amount = document.querySelector('#amount').value;

    var accounts = JSON.parse(localStorage.getItem('accounts')) || {};
    var number = Number(amount);
    var amountFrom = accounts[from_account]['amount'];
    var newAmountFrom = Number(amountFrom) - number;
    var currencyFrom = accounts[from_account]['currency'];

    var amountTo = accounts[to_account]['amount'];
    var newAmountTo = 0;
    var currencyTo = accounts[to_account]['currency'];



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



    if (Number(accounts[from_account]['amount']) === 0 || Number(accounts[from_account]['amount']) < amount) {
        showError('Amount in from account is insufficient');
        return;
    }

    if (accounts[from_account]['currency'] !== accounts[to_account]['currency']) {
        var cookie = getCookie();
        if (cookie !== '') {
            cookies = document.cookie.split(';');
            var fromCurrencyToUSD = cookies[0];
            var fromUSDToCurrency = cookies[1];
            paramObj = {
                from_account,
                to_account,
                accounts,
                number,
                newAmountFrom,
                currencyFrom,
                amountTo,
                newAmountTo,
                currencyTo,
                fromCurrencyToUSD,
                fromUSDToCurrency
            }
            transferOperation(paramObj)

        } else {
            var apiRate = await showData();
            var data = apiRate['data'];
            var mxn = data['MXN'];
            var eur = data['EUR'];
            var mxntousd = 1 / mxn;
            var eurtousd = 1 / eur;

            var fromCurrencyToUSD = { 'USD': 1, 'MXN': mxntousd, 'EUR': eurtousd };
            var fromUSDToCurrency = { 'USD': 1, 'MXN': mxn, 'EUR': eur };

            paramObj = {
                from_account,
                to_account,
                accounts,
                number,
                newAmountFrom,
                currencyFrom,
                amountTo,
                newAmountTo,
                currencyTo,
                fromCurrencyToUSD,
                fromUSDToCurrency
            }
            transferOperation(paramObj)

        }
        setCookie("rate=" + JSON.stringify(fromCurrencyToUSD) + ", " + JSON.stringify(fromUSDToCurrency));

    } else {
        var number = Number(amount);
        var amountFrom = accounts[from_account]['amount'];
        var newAmountFrom = Number(amountFrom) - number;
        var amountTo = accounts[to_account]['amount'];
        var newAmountTo = Number(amountTo) + number;
        accounts[from_account]['amount'] = newAmountFrom;
        accounts[to_account]['amount'] = newAmountTo;
        localStorage.setItem('accounts', JSON.stringify(accounts))

    }
    var id = new Date().getUTCMilliseconds();
    addItem(transferObj, id, 'transfer');
}

var transferOperation = (paramObj) => {
    if (paramObj['currencyFrom'] === 'USD') {
        paramObj['newAmountTo'] = paramObj['fromUSDToCurrency'][paramObj['currencyTo']] * paramObj['number'] + Number(paramObj['amountTo']);
    } else if (paramObj['currencyTo'] === 'USD') {
        paramObj['newAmountTo'] = paramObj['fromCurrencyToUSD'][paramObj['currencyFrom']] * paramObj['number'] + Number(paramObj['amountTo']);
    } else {
        paramObj['newAmountTo'] = paramObj['fromCurrencyToUSD'][paramObj['currencyFrom']] * paramObj['number'] * paramObj['fromUSDToCurrency'][paramObj['currencyTo']] + Number(paramObj['amountTo']);
    }

    paramObj['accounts'][paramObj['from_account']]['amount'] = Math.round((paramObj['newAmountFrom'] + Number.EPSILON) * 100) / 100;
    paramObj['accounts'][paramObj['to_account']]['amount'] = Math.round((paramObj['newAmountTo'] + Number.EPSILON) * 100) / 100;
    localStorage.setItem('accounts', JSON.stringify(paramObj['accounts']));
}

var myOnLoad = (obj) => {
    addOptions("to_account", obj);
    addOptions("from_account", obj);
    from_account = document.querySelector('#from_account').value;
    to_account = document.querySelector('#to_account').value;
    amount = document.querySelector('#amount').value;
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
