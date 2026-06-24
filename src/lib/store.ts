import { Expense } from "@/types/expense";

const expenses: Expense[] = [
  {
    id: crypto.randomUUID(),
    name: "VS Code Team License",
    amount: 199,
    category: "Software",
    billingCycle: "annual",
    date: "2026-06-01",
    notes: "Annual team collaboration tool subscription",
  },
  {
    id: crypto.randomUUID(),
    name: "Cloud Storage",
    amount: 12,
    category: "Subscription",
    billingCycle: "monthly",
    date: "2026-06-10",
    notes: "Monthly backup storage for project assets",
  },
  {
    id: crypto.randomUUID(),
    name: "Laptop Stand",
    amount: 45,
    category: "Hardware",
    billingCycle: "one-time",
    date: "2026-05-21",
    notes: "Ergonomic desk accessory",
  },
  {
    id: crypto.randomUUID(),
    name: "React Advanced Course",
    amount: 79,
    category: "Learning",
    billingCycle: "one-time",
    date: "2026-04-15",
    notes: "Online training for advanced component patterns",
  },
  {
    id: crypto.randomUUID(),
    name: "Conference Snacks",
    amount: 32,
    category: "Other",
    billingCycle: "one-time",
    date: "2026-03-30",
    notes: "Light refreshments for the meetup",
  },
  {
    id: crypto.randomUUID(),
    name: "API Monitoring",
    amount: 25,
    category: "Subscription",
    billingCycle: "monthly",
    date: "2026-06-12",
    notes: "Service monitoring for project endpoints",
  },
];

export function getExpenses(): Expense[] {
  return expenses;
}

export function addExpense(data: Omit<Expense, "id">): Expense {
  const expense: Expense = {
    ...data,
    id: crypto.randomUUID(),
  };

  expenses.push(expense);
  return expense;
}

export function deleteExpense(id: string): boolean {
  const index = expenses.findIndex((expense) => expense.id === id);
  if (index === -1) {
    return false;
  }

  expenses.splice(index, 1);
  return true;
}
