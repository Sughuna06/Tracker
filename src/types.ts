export interface Expense {
  id: string;
  description: string;
  amount: number;
  type: 'expense' | 'income';
  category: string;
  date: string;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface FilterOptions {
  dateRange: DateRange;
  minAmount: number;
  maxAmount: number;
  type: 'all' | 'expense' | 'income';
  category: string;
}