"use client"

import { useEffect, useState } from "react";

export default function Alert({ message, type = "info", display, onClose }: { message: string, type?: "info" | "success" | "error", display?: boolean, onClose: () => void }) {
    const alertStyles = {
        info: "bg-blue-300/30 text-blue-100 border border-blue-400/80",
        success: "bg-green-300/30 text-green-100 border border-green-400/80",
        error: "bg-red-300/30 text-red-100 border border-red-400/80"
    };

    const [isDisplay, setIsDisplay] = useState(display ?? true);
    useEffect(() => {
        if (display == true) {
            setIsDisplay(true);
            setTimeout(() => {
                setIsDisplay(false);
                onClose();
            }, 3000); // Auto-hide after 3 seconds
        }
    }, [display]);

    if (!isDisplay) return null;

    return (
        <div onClick={onClose} className={`fixed bottom-2 left-1/2 transform -translate-x-1/2 p-4 px-8 rounded-md ${alertStyles[type]} mb-4`} role="alert">
            <span className="font-medium">{message}</span>
        </div>
    );
}