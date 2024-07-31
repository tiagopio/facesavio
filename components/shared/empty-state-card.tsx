type Props = {
    message: string;
}

export default function EmptyStateCard({
    message = "Não há dados para exibir"
}: Props) {
    return (
        <div className="w-full rounded-b-xl p-10 flex items-center justify-center bg-white border border-t-0">
            <p className="text-neutral-500 text-sm">{message}</p>
          </div>
    )
}