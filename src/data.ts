import { Expense } from './types';

export const sampleExpenses: Expense[] = [
  {
    id: '1',
    description: 'Grocery Shopping',
    amount: 2500.75,
    type: 'expense',
    category: 'Food & Dining',
    date: '2024-03-10'
  },
  {
    id: '2',
    description: 'Salary',
    amount: 75000,
    type: 'income',
    category: 'Salary',
    date: '2024-03-01'
  },
  {
    id: '3',
    description: 'Internet Bill',
    amount: 1199.99,
    type: 'expense',
    category: 'Utilities',
    date: '2024-03-05'
  },
  {
    id: '4',
    description: 'Freelance Work',
    amount: 15000,
    type: 'income',
    category: 'Freelance',
    date: '2024-03-07'
  },
  {
    id: '5',
    description: 'Restaurant Dinner',
    amount: 1850.50,
    type: 'expense',
    category: 'Food & Dining',
    date: '2024-03-08'
  },
  {
    id: '6',
    description: 'Movie Tickets',
    amount: 800,
    type: 'expense',
    category: 'Entertainment',
    date: '2024-03-09'
  },
  {
    id: '7',
    description: 'Investment Returns',
    amount: 25000,
    type: 'income',
    category: 'Investments',
    date: '2024-03-06'
  },
  {
    id: '8',
    description: 'Shopping',
    amount: 3500,
    type: 'expense',
    category: 'Shopping',
    date: '2024-03-11'
  }
];