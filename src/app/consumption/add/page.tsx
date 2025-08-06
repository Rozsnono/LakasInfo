"use client"
import { Add, Gas, Lightning, Times, Water } from "@/components/icons/Icons";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DatePicker from "@/components/ui/Date";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import { HomeContext } from "@/providers/homes.provider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function AddConsumptionPage() {
    const [selectedType, setSelectedType] = useState("electricity");

    const { selectedHome } = useContext(HomeContext);
    const [alertDisplayed, setAlertDisplayed] = useState<string | null>(null);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);


    const [home, setHome] = useState<any>(null);
    useEffect(() => {
        if (selectedHome) {
            setHome(selectedHome);
        }
    }, [selectedHome]);


    const types = [
        { name: "Villany", value: "electricity", unit: 'kWh', colors: { main: 'bg-yellow-500/70 border-yellow-500 text-gray-950', hex: '#f59e0b' } },
        { name: "Víz", value: "water", unit: 'm³', colors: { main: 'bg-blue-500/70 border-blue-500 text-gray-950', hex: '#3b82f6' } },
        { name: "Gáz", value: "gas", unit: 'm³', colors: { main: 'bg-gray-400/70 border-gray-400 text-gray-950', hex: '#9ca3af' } }
    ]
    const months = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];

    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const month = formData.get("month") as string;
        const reading = parseFloat(formData.get("hour_reading") as string);

        if(!home || !month || isNaN(reading)) {
            setAlertDisplayed("error");
            setAlertMessage("Kérjük, töltse ki az összes mezőt.");
            return;
        }

        await fetch('/api/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                homeId: home?._id,
                serviceName: selectedType,
                date: month,
                value: reading
            }),
        }).then((res) => {
            if (res.ok) {
                setAlertDisplayed("success");
                setAlertMessage("Fogyasztás sikeresen hozzáadva.");
            } else {
                setAlertDisplayed("error");
                setAlertMessage("Hiba történt a fogyasztás hozzáadása során.");
            }
        }).catch((error) => {
            console.error("Error adding consumption:", error);
        })

    }


    return (
        <main className="flex justify-center">
            <div className="max-w-2xl w-full lg:p-4 lg:gap-4 gap-2 flex flex-col">
                <h1 className="lg:text-3xl text-xl font-bold mb-6 flex items-center gap-2">
                    <Add size={32} color="currentColor" strokeColor="none" strokeWidth={0} className="text-green-500" />
                    Új fogyasztás hozzáadása
                </h1>

                <Card className="border-gray-400/10 bg-gray-500/5">
                    <div className="flex flex-col">
                        <h2 className="text-gray-500">Otthon:</h2>
                        <p className="text-xl font-bold mb-2 ">{home?.name}</p>
                    </div>
                </Card>


                <Card className="border-gray-400/10 bg-gray-500/5 flex flex-col gap-2 ">
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

                    <div className="flex items-center justify-center p-8 w-full">

                        {
                            selectedType === "electricity" && <Lightning size={56} className="text-yellow-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                        }
                        {
                            selectedType === "water" && <Water size={56} className="text-blue-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                        }
                        {
                            selectedType === "gas" && <Gas size={56} className="text-gray-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                        }
                    </div>

                    <form action="" onSubmit={handleFormSubmit} className="">
                        <Input name="hour_reading" title="Havi óraállás" placeholder="Pl. 100" type="number" value={selectedType} onChange={() => { }} unit={types.find((f) => f.value === selectedType)?.unit} />

                        <DatePicker name="month" value={new Date().toISOString().slice(0, 7)} onChange={(date) => { }} />

                        <div className="w-full flex gap-3 lg:flex-row flex-col mt-6">
                            <Button className="px-8 py-2 w-full border border-green-400/80 bg-green-500/50 hover:bg-green-500/80 cursor-pointer flex items-center justify-center gap-2">
                                <div className="flex gap-2 items-center text-white text-sm">
                                    <Add size={16} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                                    <span>
                                        Fogyasztás hozzáadása
                                    </span>
                                </div>
                            </Button>

                            <Link href={"/consumption?homeId=" + home?._id} className="w-full">
                                <Button className="px-8 py-2 w-full border border-gray-400/40 bg-gray-500/20 hover:bg-gray-500/40 cursor-pointer flex items-center justify-center gap-2">
                                    <div className="flex gap-2 items-center text-white text-sm">
                                        <Times size={16} className="" color="currentColor" strokeColor="currentColor" strokeWidth={1} />
                                        <span>
                                            Mégse
                                        </span>
                                    </div>
                                </Button>
                            </Link>

                        </div>
                    </form>


                </Card>


            </div>

            <Alert display={!!alertDisplayed} onClose={() => { setAlertDisplayed(null); setAlertMessage(null); }} message={alertMessage!} type={alertDisplayed as any} />
        </main>
    )
}