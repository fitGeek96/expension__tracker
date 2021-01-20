//jshint esversion:9
const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money_plus');
const moneyMinusEl = document.getElementById('money_minus');
const listEl = document.getElementById('list');
const formEl = document.getElementById('form');
const textInputEl = document.getElementById('text');
const amountInputEl = document.getElementById('amount');

const dummyTransaction = [{
        id: 1,
        text: 'Flower',
        amount: -20
    },
    {
        id: 1,
        text: 'Salary',
        amount: 300
    },
    {
        id: 1,
        text: 'Book',
        amount: -10
    },
    {
        id: 1,
        text: 'Camera',
        amount: 150
    }
];


let transaction = dummyTransaction;

// Add Transaction to DOM list 
function addTransaction(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete__btn">x</button>
    `;

    listEl.appendChild(item);
}

// INIT APP 

function init(){
    listEl.innerHTML = '';
    transaction.forEach(addTransaction);
}

init();