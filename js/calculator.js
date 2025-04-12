// Calculator functionality
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expenseForm');
    const currentBalanceEl = document.getElementById('currentBalance');
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpensesEl = document.getElementById('totalExpenses');

    // Set default date to today
    document.getElementById('date').valueAsDate = new Date();

    function updateSummary() {
        const balance = calculateBalance();
        const totalIncome = calculateTotal('income');
        const totalExpenses = calculateTotal('expense');

        currentBalanceEl.textContent = formatCurrency(balance);
        totalIncomeEl.textContent = formatCurrency(totalIncome);
        totalExpensesEl.textContent = formatCurrency(totalExpenses);
    }

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newExpense = {
            description: document.getElementById('description').value,
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value,
            category: document.getElementById('category').value,
            date: document.getElementById('date').value
        };

        addExpense(newExpense);
        updateSummary();
        updateTracker();
        updateHistory();

        // Reset form
        expenseForm.reset();
        document.getElementById('date').valueAsDate = new Date();
    });

    // Initial summary update
    updateSummary();
});