let balance = 20000;
let transactions = [];

function updateBalance() {
    document.getElementById('balance-amount').innerText = `$${balance.toFixed(2)}`;
    const balanceWarning = document.getElementById('balance-warning');
    if (balance < 0) {
        balanceWarning.style.display = 'block';
    } else {
        balanceWarning.style.display = 'none';
    }
}

function addTransaction(recipient, amount) {
    const transaction = {
        recipient,
        amount,
        timestamp: new Date().getTime()
    };
    transactions.push(transaction);
    const transactionList = document.getElementById('transaction-list');
    const transactionHTML = `
        <li>
            <p><strong>Recipient:</strong> ${recipient}</p>
            <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
            <p><strong>Timestamp:</strong> ${new Date(transaction.timestamp).toLocaleString()}</p>
        </li>
    `;
    transactionList.innerHTML += transactionHTML;
}

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === 'AnishSRAR' && password === 'anish@2006') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('wallet').style.display = 'block';
        updateBalance();
    } else {
        alert('User does not exist!');
    }
});

document.getElementById('send-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const amount = parseFloat(document.getElementById('amount').value);
    if (amount > 0 && recipient !== '') {
        if (balance >= amount) {
            balance -= amount;
            addTransaction(recipient, amount);
        } else {
            alert('Insufficient balance!');
        }
        updateBalance();
        document.getElementById('recipient').value = '';
        document.getElementById('amount').value = '';
    }
});