import React, { useState } from 'react';
import { BarChart, DollarSign, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Expense } from '../types';

interface ExpenseTrackerProps {
  expenses: Expense[];
}

type TimeView = 'daily' | 'weekly' | 'monthly';

export default function ExpenseTracker({ expenses }: ExpenseTrackerProps) {
  const [timeView, setTimeView] = useState<TimeView>('weekly');

  const getDailyData = () => {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    const hourlyData = Array(24).fill(0).map((_, index) => ({
      hour: index,
      expense: 0,
      income: 0
    }));

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= oneDayAgo && expenseDate <= now) {
        const hour = expenseDate.getHours();
        if (expense.type === 'expense') {
          hourlyData[hour].expense += expense.amount;
        } else {
          hourlyData[hour].income += expense.amount;
        }
      }
    });

    return hourlyData;
  };

  const getWeeklyData = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dailyData = days.map(day => ({
      day,
      expense: 0,
      income: 0
    }));

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= oneWeekAgo && expenseDate <= now) {
        const dayIndex = expenseDate.getDay();
        if (expense.type === 'expense') {
          dailyData[dayIndex].expense += expense.amount;
        } else {
          dailyData[dayIndex].income += expense.amount;
        }
      }
    });

    return dailyData;
  };

  const getMonthlyData = () => {
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const weeklyData = weeks.map(week => ({
      week,
      expense: 0,
      income: 0
    }));

    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date);
      if (expenseDate >= oneMonthAgo && expenseDate <= now) {
        const weekIndex = Math.floor((expenseDate.getDate() - 1) / 7);
        if (weekIndex < 4) {
          if (expense.type === 'expense') {
            weeklyData[weekIndex].expense += expense.amount;
          } else {
            weeklyData[weekIndex].income += expense.amount;
          }
        }
      }
    });

    return weeklyData;
  };

  const getData = () => {
    switch (timeView) {
      case 'daily':
        return getDailyData();
      case 'weekly':
        return getWeeklyData();
      case 'monthly':
        return getMonthlyData();
      default:
        return [];
    }
  };

  const data = getData();
  const maxAmount = Math.max(
    ...data.map(item => Math.max(
      item.expense || 0,
      item.income || 0
    ))
  );

  const getLabelKey = () => {
    switch (timeView) {
      case 'daily':
        return 'hour';
      case 'weekly':
        return 'day';
      case 'monthly':
        return 'week';
      default:
        return '';
    }
  };

  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${period}`;
  };

  const calculateTotal = (type: 'expense' | 'income') => {
    return data.reduce((acc, curr) => acc + (curr[type] || 0), 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-['Poppins']">Expense Analysis</h2>
        <div className="flex space-x-2">
          {(['daily', 'weekly', 'monthly'] as TimeView[]).map((view) => (
            <button
              key={view}
              onClick={() => setTimeView(view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium font-['Poppins'] transition-colors duration-200 ${
                timeView === view
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4 mb-6">
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

        <div className="relative h-80">
          <div className="absolute inset-0 flex items-end justify-between px-4">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 group">
                <div className="flex items-end space-x-2 h-64">
                  <div className="relative">
                    {item.income > 0 && (
                      <div
                        className="w-8 bg-green-500 rounded-t transition-all duration-300 cursor-pointer group-hover:bg-green-600"
                        style={{
                          height: `${(item.income / maxAmount) * 200}px`,
                          minHeight: '1px'
                        }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          Income: ₹{item.income.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    {item.expense > 0 && (
                      <div
                        className="w-8 bg-red-500 rounded-t transition-all duration-300 cursor-pointer group-hover:bg-red-600"
                        style={{
                          height: `${(item.expense / maxAmount) * 200}px`,
                          minHeight: '1px'
                        }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 whitespace-nowrap">
                          Expense: ₹{item.expense.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-sm text-gray-600 font-['Poppins']">
                    {timeView === 'daily' ? formatHour(item[getLabelKey() as keyof typeof item] as number) : item[getLabelKey() as keyof typeof item]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-8">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600 font-['Poppins']">Income</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
          <span className="text-sm text-gray-600 font-['Poppins']">Expenses</span>
        </div>
      </div>
    </div>
  );
}