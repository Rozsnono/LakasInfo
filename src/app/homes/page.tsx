"use client";
import { Add, Home, Pin } from "@/components/icons/Icons";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useQuery } from "react-query";
import Loading from "../loading";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/providers/homes.provider";
import { services } from "@/lib/services";

export default function HomesPage() {

    const { data, isLoading, error } = useQuery('homesPage', async () => {
        const res = await fetch('/api/house');
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json();
    });

    const { selectedHome, setSelectedHome } = useContext(HomeContext);

    const [home, setHome] = useState<any>(null);
    useEffect(() => {
        if (selectedHome) {
            setHome(selectedHome);
        }
    }, [selectedHome]);

    if (isLoading) {
        return <Loading />;
    }

    

    return (
        <div className="flex flex-col lg:max-w-7xl w-full gap-5">
            <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
                <h1 className="text-3xl font-bold">Otthonok</h1>

                <Link href={"/homes/add"} className="w-fit">
                    <Button className="w-fit border border-sky-400/80 bg-sky-500/50 hover:bg-sky-500/80 cursor-pointer flex items-center justify-center gap-2 px-8 py-2">
                        <div className="flex gap-2 items-center text-white">
                            <Add size={24} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                            <span>
                                Otthon hozzáadása
                            </span>
                        </div>
                    </Button>
                </Link>


            </div>

            <div className="flex lg:flex-row flex-col gap-4">

                {
                    data.map((home: any) => (
                        <Card onClick={() => setSelectedHome!(home)} key={home._id} className={`border-gray-400/10 bg-gray-500/5 w-full flex flex-col items-center lg:p-6 w-fit ${selectedHome?._id === home._id ? 'border-green-500/60 border-2 bg-gray-500/30' : ''}`}>
                            <div className="flex flex-col w-full gap-3">
                                <div className="flex justify-between w-full items-center">
                                    <Home size={24} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                                    {selectedHome?._id === home._id &&
                                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                    }
                                </div>
                                <div className="flex w-full items-center gap-1">
                                    <Pin size={24} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                                    <div className="text-lg font-bold">{home.name}</div>
                                </div>
                                <div className="flex w-full items-center gap-1">
                                    <div className="text-sm text-gray-500">Lakás</div>
                                </div>

                                <div className="flex w-full items-center gap-2">
                                    {home.services.map((service: any) => (
                                        <div key={service} className={`px-2 rounded-full bg-gray-500/40`}>
                                            <span className="text-sm text-gray-400">{services.find((s) => s.value === service)?.name}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </Card>
                    ))
                }
            </div>

        </div>
    );
}