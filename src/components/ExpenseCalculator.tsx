import React, { useState } from 'react';
import { PlusCircle, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Expense } from '../types';

interface ExpenseCalculatorProps {
  onAddExpense: (expense: Expense) => void;
  expenses: Expense[];
}

const categories = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Education',
  'Salary',
  'Investments',
  'Other'
];

export default function ExpenseCalculator({ onAddExpense, expenses }: ExpenseCalculatorProps) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const calculateBalance = () => {
    return expenses.reduce((acc, curr) => {
      return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
    }, 0);
  };

  const calculateTotal = (type: 'income' | 'expense') => {
    return expenses
      .filter(expense => expense.type === type)
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now().toString(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type as 'expense' | 'income',
      category: formData.category,
      date: formData.date
    };
    onAddExpense(newExpense);
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 font-['Poppins']">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 font-['Poppins']">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="block w-full max-w-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              required
              placeholder="Enter description"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 font-['Poppins']">Amount (₹)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="block w-full max-w-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              required
              min="0"
              step="0.01"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 font-['Poppins']">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="block w-full max-w-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 font-['Poppins']">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="block w-full max-w-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              required
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 font-['Poppins']">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="block w-full max-w-lg rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full max-w-lg flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 font-['Poppins']"
          >
            <PlusCircle className="w-6 h-6 mr-2" />
            Add Transaction
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6 font-['Poppins']">Current Balance</h2>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg mb-4">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-2xl font-semibold font-['Poppins']">₹ {calculateBalance().toFixed(2)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                  <span className="text-lg font-medium font-['Poppins']">Total Income</span>
                </div>
                <span className="text-xl font-semibold text-green-600 font-['Poppins']">
                  ₹ {calculateTotal('income').toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingDown className="w-6 h-6 text-red-600 mr-2" />
                  <span className="text-lg font-medium font-['Poppins']">Total Expenses</span>
                </div>
                <span className="text-xl font-semibold text-red-600 font-['Poppins']">
                  ₹ {calculateTotal('expense').toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}