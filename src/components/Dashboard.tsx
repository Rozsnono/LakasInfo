"use client";

import Link from "next/dist/client/link";
import { Bar, Download, Gas, Lightning, Wallet, Water } from "./icons/Icons";
import Button from "./ui/Button";
import Card from "./ui/Card";
import DonutChart from "./ui/DonutChart";
import Dropdown from "./ui/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/providers/homes.provider";
import Loading from "@/app/loading";
import { services } from "@/lib/services";
import { useRouter } from "next/navigation";

export default function Dashboard() {

    const route = useRouter();

    const data = useQuery({
        queryKey: ['homePage-Houses'],
        queryFn: async () => {
            const res = await fetch('/api/house');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        },
    });

    const { data: serviceData, isLoading, isError, error: serviceError, refetch } = useQuery({
        queryKey: ['homePage-Services'],
        queryFn: async () => {
            const res = await fetch('/api/home?homeId=' + (selectedHome?._id || ''));
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });


    const { setHomes, selectedHome, setSelectedHome } = useContext(HomeContext);

    const [home, setHome] = useState<any>(null);
    useEffect(() => {
        if (selectedHome) {
            setHome(selectedHome);
            refetch();
        } else if (selectedHome === null) {
            route.replace('/homes');
        }
    }, [selectedHome]);
    useEffect(() => {
        if (!data.isLoading) {
            refetch();
        }
    }, [data.isLoading]);

    if (data.isLoading || isLoading) {
        return <Loading />;
    }

    function getColor(serviceName: string) {
        switch (serviceName) {
            case "electricity":
                return {
                    color: "text-yellow-500",
                    bg: "bg-yellow-500/5",
                    border: "border-yellow-500/20"
                };
            case "water":
                return {
                    color: "text-blue-500",
                    bg: "bg-blue-500/5",
                    border: "border-blue-500/20"
                };
            case "gas":
                return {
                    color: "text-gray-500",
                    bg: "bg-gray-500/5",
                    border: "border-gray-500/20"
                };
            case "heating":
                return {
                    color: "text-red-500",
                    bg: "bg-red-500/5",
                    border: "border-red-500/20"
                };
            default:
                return {
                    color: "text-white",
                    bg: "bg-white/5",
                    border: "border-white/20"
                };
        }
    }

    return (
        <main className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 lg:items-start items-center">
                <h1 className="text-3xl font-bold">Áttekintés</h1>
                <Dropdown title={selectedHome?.name} items={data.data.map((item: any) => item.name)} onSelect={(item) => setSelectedHome!(data.data.find((i: any) => i.name === item) as any)} />
            </div>

            <div className="w-full flex gap-3 lg:flex-row flex-col">

                {
                    !isLoading && serviceData && serviceData.length > 0 &&
                    serviceData.map((service: any) => (
                        <Card key={service.name} className={getColor(service.name).bg + " " + getColor(service.name).border} >
                            <div className="flex items-center mb-2">
                                {
                                    service.name === "electricity" &&
                                    <Lightning size={24} className="text-yellow-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                                }
                                {
                                    service.name === "water" &&
                                    <Water size={24} className="text-blue-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                                }
                                {
                                    service.name === "gas" &&
                                    <Gas size={24} className="text-gray-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                                }
                                {
                                    service.name === "heating" &&
                                    <Water size={24} className="text-red-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                                }
                                <h2 className={`text-lg font-bold ml-2 text-white`}>{services.find((s) => s.value === service.name)?.name}</h2>
                            </div>
                            <div className="flex items-center mt-4 gap-1">
                                <span className={`text-3xl font-semibold ${getColor(service.name).color}`}>{service.average.toFixed(2)}</span>
                                <span className={`text-xl ${getColor(service.name).color}`}>{service.measurement}</span>
                            </div>
                            <p className={`text-[0.7rem] text-white/40`}>Átlag havi fogyasztás</p>
                        </Card>
                    ))
                }

            </div>

            <div className="w-full lg:hidden flex gap-3 lg:flex-row flex-col">
                <Link href={"/consumption?homeId=" + home._id} className="w-full">
                    <Button className="px-8 py-6 w-full border border-green-400/80 bg-green-500/50 hover:bg-green-500/80 cursor-pointer flex items-center justify-center gap-2">
                        <div className="flex gap-2 items-center text-white">
                            <Bar size={16} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                            <span>
                                Fogyasztás megtekintése
                            </span>
                        </div>
                    </Button>
                </Link>

                <Link href={"/payments?homeId=" + home._id} className="w-full">
                    <Button className="px-8 py-6 w-full border border-gray-400/80 bg-gray-500/50 hover:bg-gray-500/80 cursor-pointer flex items-center justify-center gap-2">
                        <div className="flex gap-2 items-center text-white">
                            <Wallet size={16} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                            <span>
                                Kifizetések megtekintése
                            </span>
                        </div>
                    </Button>
                </Link>

            </div>

            <div className="w-full flex ">
                {
                    !isLoading && serviceData && serviceData.length > 0 &&
                    <Card className="bg-gray-500/5 border-gray-500/20 w-full flex flex-col items-center">
                        <h2 className="text-lg font-bold mb-4 text-white">Fogyasztási adatok</h2>
                        <DonutChart data={serviceData.map((s: any) => s.average)} colors={services.filter((s) => serviceData.find((ss: any) => ss.name === s.value)).map((s) => s.colors.background) as any} labels={services.filter((s) => serviceData.find((ss: any) => ss.name === s.value)).map((s) => s.name)} />
                    </Card>
                }
            </div>

            <div className="w-full lg:flex hidden gap-3 lg:flex-row flex-col">
                <Link href={"/consumption?homeId=" + home._id} className="w-full">
                    <Button className="px-8 py-6 w-full border border-green-400/80 bg-green-500/50 hover:bg-green-500/80 cursor-pointer flex items-center justify-center gap-2">
                        <div className="flex gap-2 items-center text-white">
                            <Bar size={16} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                            <span>
                                Fogyasztás megtekintése
                            </span>
                        </div>
                    </Button>
                </Link>

                <Link href={"/payments?homeId=" + home._id} className="w-full">
                    <Button className="px-8 py-6 w-full border border-gray-400/80 bg-gray-500/50 hover:bg-gray-500/80 cursor-pointer flex items-center justify-center gap-2">
                        <div className="flex gap-2 items-center text-white">
                            <Wallet size={16} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                            <span>
                                Kifizetések megtekintése
                            </span>
                        </div>
                    </Button>
                </Link>

            </div>

            <a href="/lakasinfo.apk" download>
                <Button className="px-8 py-6 w-full border border-sky-400/80 bg-sky-500/50 hover:bg-sky-500/80 cursor-pointer flex items-center justify-center gap-2">
                    <div className="flex gap-2 items-center text-white">
                        <Download size={16} className="" color="currentColor" strokeColor="currentColor" strokeWidth={2} isStroke />
                        <span>
                            Alkalmazás letöltése
                        </span>
                    </div>
                </Button>
            </a>
        </main>
    )
}