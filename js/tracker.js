// Tracker functionality
let currentTimeView = 'daily';

function updateTracker() {
    const trackerTotalIncomeEl = document.getElementById('trackerTotalIncome');
    const trackerTotalExpensesEl = document.getElementById('trackerTotalExpenses');
    const barChartEl = document.getElementById('barChart');

    function getDailyData() {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        
        return Array(24).fill(0).map((_, index) => ({
            hour: index,
            expense: 0,
            income: 0
        }));
    }

    function getWeeklyData() {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days.map(day => ({
            day,
            expense: 0,
            income: 0
        }));
    }

    function getMonthlyData() {
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        
        const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        return weeks.map(week => ({
            week,
            expense: 0,
            income: 0
        }));
    }

    function getData() {
        let data;
        switch (currentTimeView) {
            case 'daily':
                data = getDailyData();
                break;
            case 'weekly':
                data = getWeeklyData();
                break;
            case 'monthly':
                data = getMonthlyData();
                break;
            default:
                data = [];
        }

        // Populate data with actual expenses
        expenses.forEach(expense => {
            const expenseDate = new Date(expense.date);
            let index;

            switch (currentTimeView) {
                case 'daily':
                    index = expenseDate.getHours();
                    break;
                case 'weekly':
                    index = expenseDate.getDay();
                    break;
                case 'monthly':
                    index = Math.floor((expenseDate.getDate() - 1) / 7);
                    break;
            }

            if (index >= 0 && index < data.length) {
                if (expense.type === 'expense') {
                    data[index].expense += expense.amount;
                } else {
                    data[index].income += expense.amount;
                }
            }
        });

        return data;
    }

    function renderChart() {
        const data = getData();
        const maxAmount = Math.max(...data.map(item => Math.max(item.expense || 0, item.income || 0)));
        
        barChartEl.innerHTML = '';
        
        data.forEach((item, index) => {
            const barGroup = document.createElement('div');
            barGroup.className = 'chart-bar-group';
            barGroup.style.position = 'absolute';
            barGroup.style.bottom = '0';
            barGroup.style.left = `${(index / data.length) * 100}%`;
            barGroup.style.transform = 'translateX(-50%)';

            // Income bar
            if (item.income > 0) {
                const incomeBar = document.createElement('div');
                incomeBar.className = 'chart-bar income';
                incomeBar.style.height = `${(item.income / maxAmount) * 280}px`;
                incomeBar.addEventListener('mouseover', (e) => {
                    showTooltip(e, `Income: ${formatCurrency(item.income)}`);
                });
                incomeBar.addEventListener('mouseout', hideTooltip);
                barGroup.appendChild(incomeBar);
            }

            // Expense bar
            if (item.expense > 0) {
                const expenseBar = document.createElement('div');
                expenseBar.className = 'chart-bar expense';
                expenseBar.style.height = `${(item.expense / maxAmount) * 280}px`;
                expenseBar.addEventListener('mouseover', (e) => {
                    showTooltip(e, `Expense: ${formatCurrency(item.expense)}`);
                });
                expenseBar.addEventListener('mouseout', hideTooltip);
                barGroup.appendChild(expenseBar);
            }

            // Label
            const label = document.createElement('div');
            label.className = 'text-sm text-gray-600';
            label.style.position = 'absolute';
            label.style.bottom = '-25px';
            label.style.left = '50%';
            label.style.transform = 'translateX(-50%)';
            label.textContent = currentTimeView === 'daily' ? 
                formatHour(item.hour) : 
                item[currentTimeView === 'weekly' ? 'day' : 'week'];
            barGroup.appendChild(label);

            barChartEl.appendChild(barGroup);
        });

        // Update summary
        const totalIncome = calculateTotal('income');
        const totalExpenses = calculateTotal('expense');
        trackerTotalIncomeEl.textContent = formatCurrency(totalIncome);
        trackerTotalExpensesEl.textContent = formatCurrency(totalExpenses);
    }

    // Time filter buttons
    document.querySelectorAll('.time-filter').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.time-filter').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentTimeView = button.dataset.time;
            renderChart();
        });
    });

    // Initial render
    renderChart();
}

// Initialize tracker
document.addEventListener('DOMContentLoaded', updateTracker);