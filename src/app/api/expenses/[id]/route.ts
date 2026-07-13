import { NextResponse } from "next/server";
import { getExpenses, deleteExpense } from "@/lib/store";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = await params;
    const expense = getExpenses().find((item) => item.id === id);
    if (!expense) {
        return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    return NextResponse.json(expense);
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const deleted = deleteExpense(params.id);

    if (!deleted) {
        return NextResponse.json({ error: "Expense not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
}
