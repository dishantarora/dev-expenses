import { BillingCycle } from "./billing-cycle";
import { Category } from "./category";

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: Category;
  billingCycle: BillingCycle;
  date: string;
  notes?: string;
}
