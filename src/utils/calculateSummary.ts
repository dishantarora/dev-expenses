import { Expense } from "@/types/expense";

export type ExpenseSummary = {
  monthlyTotal: number;
  annualTotal: number;
  count: number;
};

export function calculateSummary(expenses: Expense[]): ExpenseSummary {
  return expenses.reduce<ExpenseSummary>(
    (summary, expense) => {
      const amount = Number(expense.amount);

      if (Number.isNaN(amount) || amount < 0) {
        return summary;
      }

      if (expense.billingCycle === "monthly") {
        summary.monthlyTotal += amount;
      } else if (expense.billingCycle === "annual") {
        summary.annualTotal += amount;
      }

      summary.count += 1;
      return summary;
    },
    { monthlyTotal: 0, annualTotal: 0, count: 0 }
  );
}
