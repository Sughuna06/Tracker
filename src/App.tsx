import React, { useState } from 'react';
import { Wallet, BarChart2, History } from 'lucide-react';
import ExpenseCalculator from './components/ExpenseCalculator';
import ExpenseTracker from './components/ExpenseTracker';
import ExpenseHistory from './components/ExpenseHistory';
import { Expense } from './types';
import { sampleExpenses } from './data';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const tabs = [
    { id: 'calculator', name: 'Calculator', icon: Wallet },
    { id: 'tracker', name: 'Tracker', icon: BarChart2 },
    { id: 'history', name: 'History', icon: History },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Wallet className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-gray-900 font-['Poppins']">ExpenseTracker</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg text-lg font-['Poppins'] transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <tab.icon className="w-6 h-6 mr-2" />
              {tab.name}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {activeTab === 'calculator' && (
            <ExpenseCalculator onAddExpense={handleAddExpense} expenses={expenses} />
          )}
          {activeTab === 'tracker' && (
            <ExpenseTracker expenses={expenses} />
          )}
          {activeTab === 'history' && (
            <ExpenseHistory expenses={expenses} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;