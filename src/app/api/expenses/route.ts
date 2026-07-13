import { NextResponse } from "next/server";
import { getExpenses, addExpense } from "@/lib/store";

export async function GET() {
    const expenses = getExpenses();
    return NextResponse.json(expenses);
}

export async function POST(request: Request) {
    const body = await request.json();
    if (
        typeof body.name !== "string" ||
        !body.name.trim() ||
        typeof body.amount !== "number" ||
        body.amount <= 0
    ) {
        return NextResponse.json(
            { error: "Invalid expense data" },
            { status: 400 }
        );
    }

    const expense = addExpense(body);
    return NextResponse.json(expense, { status: 201 });
}