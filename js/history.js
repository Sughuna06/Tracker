// History functionality
function updateHistory() {
    const transactionsList = document.getElementById('transactionsList');
    const startDateInput = document.getElementById('startDate');
    const filterCategoryInput = document.getElementById('filterCategory');

    function deleteTransaction(id) {
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses();
        renderTransactions();
        updateTracker();
        
        // Update calculator summary
        const currentBalanceEl = document.getElementById('currentBalance');
        const totalIncomeEl = document.getElementById('totalIncome');
        const totalExpensesEl = document.getElementById('totalExpenses');
        
        const balance = calculateBalance();
        const totalIncome = calculateTotal('income');
        const totalExpenses = calculateTotal('expense');

        currentBalanceEl.textContent = formatCurrency(balance);
        totalIncomeEl.textContent = formatCurrency(totalIncome);
        totalExpensesEl.textContent = formatCurrency(totalExpenses);
    }

    function filterTransactions() {
        return expenses.filter(expense => {
            const matchesDate = !startDateInput.value || expense.date >= startDateInput.value;
            const matchesCategory = !filterCategoryInput.value || 
                expense.category.toLowerCase().includes(filterCategoryInput.value.toLowerCase());

            return matchesDate && matchesCategory;
        });
    }

    function renderTransactions() {
        const filteredTransactions = filterTransactions();
        
        transactionsList.innerHTML = filteredTransactions.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-info">
                    <div class="transaction-icon ${transaction.type}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                        </svg>
                    </div>
                    <div class="transaction-details">
                        <h3>${transaction.description}</h3>
                        <p>${transaction.category}</p>
                    </div>
                </div>
                <div class="transaction-amount">
                    <div class="amount-wrapper">
                        <p class="${transaction.type}">
                            ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
                        </p>
                        <div class="transaction-date">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            ${formatDate(transaction.date)}
                        </div>
                    </div>
                    <button onclick="deleteTransaction('${transaction.id}')" class="delete-btn" title="Delete transaction">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            <line x1="10" y1="11" x2="10" y2="17"/>
                            <line x1="14" y1="11" x2="14" y2="17"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Make deleteTransaction function globally available
    window.deleteTransaction = deleteTransaction;

    // Add event listeners to filters
    [startDateInput, filterCategoryInput].forEach(element => {
        element.addEventListener('change', renderTransactions);
    });

    // Initial render
    renderTransactions();
}

// Initialize history
document.addEventListener('DOMContentLoaded', updateHistory);