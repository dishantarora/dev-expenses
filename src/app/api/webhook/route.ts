import { NextResponse } from "next/server";

const processedIds = new Set<string>();

export async function POST(request: Request) {
    const event = await request.json();

    if (
        typeof event?.id !== "string" ||
        !event.id ||
        typeof event?.type !== "string" ||
        !event.type
    ) {
        return NextResponse.json(
            { error: "Invalid event payload" },
            { status: 400 }
        );
    }

    if (processedIds.has(event.id)) {
        return NextResponse.json(
            { status: "already_processed" },
            { status: 200 }
        );
    }

    processedIds.add(event.id);
    console.log("[webhook] event received:", event.type);

    return NextResponse.json({ received: true }, { status: 200 });
}