import { NextResponse } from "next/server";
import { getExpenses, addExpense } from "@/lib/store";

export async function GET() {
    const expenses = getExpenses();
    return NextResponse.json(expenses);
}

export async function POST(request: Request) {
    const body = await request.json();
    if (
        typeof body.description !== "string" ||
        !body.description.trim() ||
        typeof body.amount !== "number" ||
        body.amount <= 0 ||
        typeof body.category !== "string" ||
        typeof body.frequency !== "string" ||
        typeof body.dueDate !== "string"
    ) {
        return NextResponse.json(
            { error: "Invalid expense data" },
            { status: 400 }
        );
    }

    const expense = addExpense(body);
    return NextResponse.json(expense, { status: 201 });
}