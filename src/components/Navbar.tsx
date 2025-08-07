"use client";
import { HomeContext } from "@/providers/homes.provider";
import { UserContext } from "@/providers/user.provider";
import Link from "next/dist/client/link";
import { useContext, useEffect, useState } from "react";
import { Bar, Home } from "./icons/Icons";

export default function Navbar() {

    const { selectedHome } = useContext(HomeContext);

    const [home, setHome] = useState<any>(null);

    useEffect(() => {
        if (selectedHome) {
            setHome(selectedHome);
        }
    }, [selectedHome]);

    return (
        <nav className="fixed w-full border-b border-gray-100/30 bg-gray-950/10 backdrop-blur-md flex items-center justify-between px-12 py-6 z-50">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                <Link href="/" className="hover:underline hover:underline-offset-4 hover:decoration-2 lg:flex hidden ">
                    LakásInfo
                </Link>

                <Link href="/" className="flex lg:hidden ">
                    <Bar size={24} color="currentColor" />
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <span className="text-gray-500 lg:flex hidden">Aktív otthon:</span>
                <span className="px-4 py-1 bg-gray-300/30 rounded-full ">{selectedHome?.name}</span>
            </div>

            <div className="flex items-center gap-6">




                <Link href="/" className="lg:flex hidden text-gray-300 hover:scale-110 duration-200 hover:tracking-wide">
                    Áttekintés
                </Link>
                <Link href={"/consumption?homeId=" + (selectedHome?._id||'')} className="lg:flex hidden text-gray-300 hover:scale-110 duration-200 hover:tracking-wide">
                    Fogyasztás
                </Link>
                <Link href="/homes" className="lg:flex hidden text-gray-300 hover:scale-110 duration-200 hover:tracking-wide">
                    Otthonok
                </Link>

                <Link href="/homes" className="flex lg:hidden ">
                    <Home size={24} color="currentColor" />
                </Link>
            </div>
        </nav>
    );
} 