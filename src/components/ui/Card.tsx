export default function Card({ className, children, onClick }: {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <div className={` ${className} border p-4 rounded-lg shadow-md w-full`} onClick={onClick}>
            {children}
        </div>
    )
}