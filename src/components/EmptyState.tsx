type EmptyState = {
    message: string,
    icon?: React.ReactNode,
    actionLabel?: string,
    onAction?: () => void
}

export default function EmptyState({ message, icon, actionLabel, onAction }: EmptyState) {
    return (
        <div className="py-16">
            <div className="flex flex-col items-center justify-center gap-2">
                {icon && <div className="text-4xl mb-2">{icon}</div>}
                <p className="text-gray-600 text-center">{message}</p>
                {actionLabel && onAction && (
                    <button
                        onClick={onAction}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>
        </div>
    )
}