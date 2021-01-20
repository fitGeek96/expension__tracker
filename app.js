//jshint esversion:9
const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money_plus');
const moneyMinusEl = document.getElementById('money_minus');
const listEl = document.getElementById('list');
const formEl = document.getElementById('form');
const textInputEl = document.getElementById('text');
const amountInputEl = document.getElementById('amount');

const dummyTransactions = [{
        id: 1,
        text: 'Flower',
        amount: -20
    },
    {
        id: 2,
        text: 'Salary',
        amount: 300
    },
    {
        id: 3,
        text: 'Book',
        amount: -10
    },
    {
        id: 4,
        text: 'Camera',
        amount: 150
    }
];


let transactions = dummyTransactions;

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (textInputEl.value.trim() === '' || amountInputEl.value.trim() === '') {
        alert('Please add a Text and the Amount ....');
    } else {
        const transaction = {
            id: generateID(),
            text: textInputEl.value,
            amount: Number(amountInputEl.value)
        };
        transactions.push(transaction); 
        addTransactionDOM(transaction);
        updateValues();
        textInputEl.value = '';
        amountInputEl.value = '';
    }

}

// Generator Random ID 
function generateID() {
    return Math.floor(Math.random() * 400);
}

// Add Transaction to DOM list 
function addTransactionDOM(transactions) {
    // Get sign
    const sign = transactions.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transactions.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transactions.text} <span>${sign}${Math.abs(transactions.amount)}</span>
        <button class="delete__btn" onclick="removeTransaction(${transactions.id})">x</button>
    `;

    listEl.appendChild(item);
}

// UPDATE THE BALANCE, INCOME AND EXPENSE
function updateValues() {
    const amounts = transactions.map(tran => tran.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);


    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);

    const expense = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => (acc -= item), 0)
        .toFixed(2);

    balanceEl.innerText = `$${total}`;
    moneyPlusEl.innerText = `$${income}`;
    moneyMinusEl.innerText = `$${expense}`;

}

// Delete a Transaction by iD
function removeTransaction(id){
    transactions = transactions.filter(tran => tran.id !== id);
    
    init();
}

// INIT APP 

function init() {
    listEl.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

formEl.addEventListener('submit', addTransaction);