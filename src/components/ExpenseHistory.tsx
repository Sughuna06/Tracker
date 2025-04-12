import React, { useState } from 'react';
import { Filter, Calendar, DollarSign } from 'lucide-react';
import { Expense, FilterOptions } from '../types';

interface ExpenseHistoryProps {
  expenses: Expense[];
}

export default function ExpenseHistory({ expenses }: ExpenseHistoryProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      startDate: '',
      endDate: ''
    },
    minAmount: 0,
    maxAmount: 10000,
    type: 'all',
    category: ''
  });

  const filteredExpenses = expenses.filter(expense => {
    const matchesDate = !filters.dateRange.startDate || !filters.dateRange.endDate || 
      (expense.date >= filters.dateRange.startDate && expense.date <= filters.dateRange.endDate);
    const matchesAmount = expense.amount >= filters.minAmount && expense.amount <= filters.maxAmount;
    const matchesType = filters.type === 'all' || expense.type === filters.type;
    const matchesCategory = !filters.category || expense.category.toLowerCase().includes(filters.category.toLowerCase());

    return matchesDate && matchesAmount && matchesType && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Transaction History</h2>
        <Filter className="w-6 h-6 text-gray-500" />
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={filters.dateRange.startDate}
            onChange={(e) => setFilters({
              ...filters,
              dateRange: { ...filters.dateRange, startDate: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={filters.dateRange.endDate}
            onChange={(e) => setFilters({
              ...filters,
              dateRange: { ...filters.dateRange, endDate: e.target.value }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value as 'all' | 'expense' | 'income' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Filter by category"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredExpenses.map(expense => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${
                expense.type === 'income' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <DollarSign className={`w-5 h-5 ${
                  expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{expense.description}</h3>
                <p className="text-sm text-gray-500">{expense.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${
                expense.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {expense.type === 'income' ? '+' : '-'}₹{expense.amount.toFixed(2)}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                {expense.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}