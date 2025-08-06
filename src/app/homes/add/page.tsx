"use client"
import { Add, Apartmant, Building, Gas, Home, Lightning, Times, Water } from "@/components/icons/Icons";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DatePicker from "@/components/ui/Date";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import MultiSelect from "@/components/ui/MultiSelect";
import { HomeContext } from "@/providers/homes.provider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function AddHomePage() {
    const [selectedType, setSelectedType] = useState("house");

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
        { name: "Ház", value: "house", unit: 'kWh', colors: { main: 'bg-gray-400/70 border-gray-400 text-gray-950', hex: '#f59e0b' } },
        { name: "Lakás", value: "apartmant", unit: 'm³', colors: { main: 'bg-gray-400/70 border-gray-400 text-gray-950', hex: '#3b82f6' } },
        { name: "Egyéb", value: "building", unit: 'm³', colors: { main: 'bg-gray-400/70 border-gray-400 text-gray-950', hex: '#9ca3af' } }
    ]

    const services = [
        { name: "Villany", value: "electricity", unit: 'kWh' },
        { name: "Víz", value: "water", unit: 'm³' },
        { name: "Gáz", value: "gas", unit: 'm³' },
        { name: "Fűtés", value: "heating", unit: 'm³' }
    ]


    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const type = selectedType;
        const name = e.target['home_name'].value;
        const service = services.filter((s) => e.target[s.value].checked);

        await fetch('/api/house', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                services: service,
                type: type
            }),
        }).then((res) => {
            if (res.ok) {
                setAlertDisplayed("success");
                setAlertMessage("Otthon sikeresen hozzáadva.");
            } else {
                setAlertDisplayed("error");
                setAlertMessage("Hiba történt az otthon hozzáadása során.");
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
                    Új otthon hozzáadása
                </h1>

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
                            selectedType === "house" && <Home size={56} className="text-gray-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                        }
                        {
                            selectedType === "apartmant" && <Apartmant size={56} className="text-gray-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                        }
                        {
                            selectedType === "building" && <Building size={56} className="text-gray-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                        }
                    </div>

                    <form action="" onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                        <Input name="home_name" title="Otthon neve" placeholder="Pl. Nagy Sándor utca 10" type="text" unit={''} />

                        <MultiSelect title="Válassz ki egy vagy több lehetőséget" items={services} onSelect={(item) => { }} />


                        <div className="w-full flex gap-3 lg:flex-row flex-col mt-6">
                            <Button className="px-8 py-2 w-full border border-green-400/80 bg-green-500/50 hover:bg-green-500/80 cursor-pointer flex items-center justify-center gap-2">
                                <div className="flex gap-2 items-center text-white text-sm">
                                    <Add size={16} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                                    <span>
                                        Otthon hozzáadása
                                    </span>
                                </div>
                            </Button>

                            <Link href={"/homes"} className="w-full">
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