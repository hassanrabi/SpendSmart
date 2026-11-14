// --- 1. State Management & Initialization ---
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// DOM Element References
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalOverlay = document.getElementById('transaction-modal');
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

const totalBalanceEl = document.getElementById('total-balance');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');

let expenseChart = null;

// --- 2. Modal Open/Close Logic ---
openModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('hidden');
});

// Close modal if clicking outside the modal box
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.add('hidden');
    }
});

// --- 3. Handle Form Submission ---
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Grab input values
    const title = document.getElementById('title').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;
    const category = document.getElementById('category').value;

    // Create new transaction object
    const newTransaction = {
        id: Date.now(),
        title,
        amount,
        type,
        category,
        date: new Date().toLocaleDateString()
    };

    // Push into state array
    transactions.push(newTransaction);

    // Save, update UI, reset form, and close modal
    syncAndRender();
    transactionForm.reset();
    modalOverlay.classList.add('hidden');
});

// --- 4. LocalStorage & UI Refresh ---
function syncAndRender() {
    // Save to browser storage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update UI components
    updateSummary();
    renderTransactions();
    updateChart();
}

// --- 5. Calculate & Display Summary Totals ---
function updateSummary() {
    const income = transactions
        .filter(item => item.type === 'income')
        .reduce((acc, item) => acc + item.amount, 0);

    const expense = transactions
        .filter(item => item.type === 'expense')
        .reduce((acc, item) => acc + item.amount, 0);

    const balance = income - expense;

    // Format and display in DOM
    totalBalanceEl.innerText = `$${balance.toFixed(2)}`;
    totalIncomeEl.innerText = `$${income.toFixed(2)}`;
    totalExpenseEl.innerText = `$${expense.toFixed(2)}`;
}

// --- 6. Render Transaction History List ---
function renderTransactions() {
    transactionList.innerHTML = '';

    if (transactions.length === 0) {
        transactionList.innerHTML = `<p class="text-slate-400 text-sm text-center py-4">No transactions added yet.</p>`;
        return;
    }

    transactions.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.classList.add('transaction-item');

        const sign = item.type === 'income' ? '+' : '-';
        const amountClass = item.type === 'income' ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold';

        li.innerHTML = `
            <div>
                <p class="font-medium text-slate-800">${item.title}</p>
                <span class="text-xs text-slate-500">${item.category} • ${item.date}</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="${amountClass}">${sign}$${item.amount.toFixed(2)}</span>
                <button onclick="deleteTransaction(${item.id})" class="text-slate-400 hover:text-rose-600 font-bold">&times;</button>
            </div>
        `;

        transactionList.appendChild(li);
    });
}

// --- 7. Delete Transaction ---
function deleteTransaction(id) {
    transactions = transactions.filter(item => item.id !== id);
    syncAndRender();
}

// --- 8. Chart.js Integration ---
function initChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateChart() {
    // Filter only expenses
    const expenses = transactions.filter(item => item.type === 'expense');

    // Group expenses by category
    const categoryTotals = {};
    expenses.forEach(item => {
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });

    expenseChart.data.labels = Object.keys(categoryTotals);
    expenseChart.data.datasets[0].data = Object.values(categoryTotals);
    expenseChart.update();
}

// --- Initialize App on Load ---
initChart();
syncAndRender();