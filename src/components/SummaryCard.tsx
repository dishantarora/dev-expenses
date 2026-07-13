type SummaryCard = {
    title: string,
    value: string,
    subtitle?: string
}

export default function SummaryCard({ title, value, subtitle }: SummaryCard) {
    return (
        <article>
            <div className="rounded-lg border p-4 flex flex-col gap-1">
                <h3 className="text-sm text-gray-500">{title}</h3>
                <p className="text-2xl font-medium">{value}</p>
                {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
        </article>
    )
}