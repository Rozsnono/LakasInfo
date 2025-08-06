"use client";
import { Add, ChevronLeft, ChevronRight } from "@/components/icons/Icons";
import BarChart from "@/components/ui/BarChart";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading";
import { HomeContext } from "@/providers/homes.provider";
import { useParams, useSearchParams } from "next/navigation";

export default function Consumption() {


    const [selectedType, setSelectedType] = useState("electricity");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

    const params = useSearchParams();

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['consumption', selectedType, selectedYear],
        queryFn: async () => {
            const res = await fetch('/api/services?year=' + (selectedYear || '') + '&homeId=' + params.get('homeId') + '&type=' + selectedType);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await res.json();
            return data;
        },
    });


    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [selectedYear, selectedType]);

    if (isLoading && !error) {
        return <Loading />;
    }


    const types = [
        { name: "Villany", value: "electricity", colors: { main: 'bg-yellow-500/70 border-yellow-500 text-gray-950', hex: '#f59e0b' } },
        { name: "Víz", value: "water", colors: { main: 'bg-blue-500/70 border-blue-500 text-gray-950', hex: '#3b82f6' } },
        { name: "Gáz", value: "gas", colors: { main: 'bg-gray-400/70 border-gray-400 text-gray-950', hex: '#9ca3af' } }
    ]

    function SelectingYear(dir: 1 | -1) {
        const currentIndex = data.years.indexOf(selectedYear);
        const newIndex = currentIndex + dir;

        if (newIndex >= 0 && newIndex < data.years.length) {
            setSelectedYear(data.years[newIndex]);
        }
    }

    const months = ["Jan.", "Feb.", "Már.", "Ápr.", "Máj.", "Jún.", "Júl.", "Aug.", "Szept.", "Okt.", "Nov.", "Dec."];

    return (
        <div className="flex flex-col lg:max-w-7xl w-full gap-5">
            <div className="flex justify-between items-center flex-col lg:flex-row gap-4">
                <h1 className="text-3xl font-bold">Fogyasztás</h1>

                <Link href={"/consumption/add"} className="w-fit">
                    <Button className="w-fit border border-sky-400/80 bg-sky-500/50 hover:bg-sky-500/80 cursor-pointer flex items-center justify-center gap-2 px-8 py-2">
                        <div className="flex gap-2 items-center text-white">
                            <Add size={24} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                            <span>
                                Fogyasztás hozzáadása
                            </span>
                        </div>
                    </Button>
                </Link>
            </div>

            <div className="w-full">
                <Button className="w-full border border-gray-400/10 bg-gray-500/5 cursor-pointer flex items-center justify-center gap-2 p-1">
                    <div className="flex gap-2 items-center text-white w-full">

                        {
                            types.map((type) => (
                                <div key={type.value} onClick={() => { setSelectedType(type.value) }} className={`w-full rounded-lg duration-200 border ${selectedType === type.value ? type.colors.main : 'border-none bg-none'} cursor-pointer flex items-center justify-center gap-2 px-8 py-2 text-sm lg:text-base`}>
                                    <div className="flex gap-2 items-center justify-center w-full">
                                        <span className="font-semibold">{type.name}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Button>
            </div>

            <div className="w-full flex flex-col gap-4">
                <Card className="bg-gray-500/5 border-gray-500/20 w-full flex flex-col items-center">
                    <span className="text-gray-500 text-md">Éves átlag fogyasztás:</span>
                    <span className="font-semibold text-xl">{data.yearly_average.toFixed(2)} {data.measurement}</span>
                </Card>
            </div>

            <div className="w-full flex gap-4 justify-center items-center text-gray-500 select-none" >
                <ChevronLeft onClick={() => { SelectingYear(-1) }} size={20} className="hover:text-gray-200 cursor-pointer duration-200" color="currentColor" strokeColor="currentColor" strokeWidth={2} isStroke />
                <span className="text-gray-200 text-3xl">{selectedYear}</span>
                <ChevronRight onClick={() => { SelectingYear(1) }} size={20} className="hover:text-gray-200 cursor-pointer duration-200" color="currentColor" strokeColor="currentColor" strokeWidth={2} isStroke />
            </div>

            <div className="w-full flex-col gap-4 lg:flex hidden">
                <Card className="bg-gray-500/5 border-gray-500/20 w-full flex flex-col items-center">
                    {!isLoading && data.data &&
                        <BarChart average={data.average} labels={months} data={new Array(12).fill(0).map((_, i) => (data.data[Object.keys(data.data).find((key) => new Date(key).getMonth() === i) as any] || { difference: 0 }).difference || 0)} color={types.find((f) => selectedType === f.value)?.colors.hex!} />
                    }
                </Card>
            </div>

            <div className="w-full flex-col gap-4 flex">
                <Card className="bg-gray-500/5 border-gray-500/20 w-full flex flex-col items-center gap-3">
                    <div className="w-full flex justify-between">
                        Havi részletek
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        {
                            !isLoading && data.data &&
                            Object.keys(data.data).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()).map((month, index) => (
                                <div key={index} className="w-full flex justify-between items-center px-4 py-4 bg-gray-600/30 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-8 rounded-lg duration-200 ${types.find((f) => selectedType === f.value)?.colors.main}`}></div>
                                        <span className="text-gray-100 text-xl">{months[new Date(month).getMonth()]}</span>
                                        <div className="w-fit p-1 px-3 bg-gray-500/40 rounded-full">
                                            <span className="text-gray-200">{data.data[month].difference} kWh</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <span className="text-gray-200 text-lg">{data.data[month].value} kWh</span>
                                        <span className="text-gray-500 text-sm">Összesen</span>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </Card>
            </div>
        </div>
    );
}