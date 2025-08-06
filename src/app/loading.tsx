import { Loader } from "@/components/icons/Icons";

export default function Loading() {
    return (
        <main className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900/70 backdrop-blur-sm z-50">
            <Loader size={192} color="white" className="animate-spining" />
        </main>
    )
}