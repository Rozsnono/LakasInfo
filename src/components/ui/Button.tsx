export default function Button(
    { children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
    return (
        <button
            className={`rounded-md transition duration-200 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
