"use client"
import { Add, Gas, Lightning, Payment, Times, Water } from "@/components/icons/Icons";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DatePicker from "@/components/ui/Date";
import Dropdown from "@/components/ui/Dropdown";
import Input from "@/components/ui/Input";
import { payments } from "@/lib/payments";
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

    async function handleFormSubmit(e: any) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const month = formData.get("month") as string;
        const reading = parseFloat(formData.get("payment") as string);

        if (!home || !month || isNaN(reading)) {
            setAlertDisplayed("error");
            setAlertMessage("Kérjük, töltse ki az összes mezőt.");
            return;
        }

        await fetch('/api/payments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                homeId: home?._id,
                paymentName: selectedType,
                date: month,
                value: reading
            }),
        }).then((res) => {
            if (res.ok) {
                setAlertDisplayed("success");
                setAlertMessage("Kifizetés sikeresen hozzáadva.");
            } else {
                setAlertDisplayed("error");
                setAlertMessage("Hiba történt a kifizetés hozzáadása során.");
            }
        }).catch((error) => {
            console.error("Error adding payment:", error);
        })

    }


    return (
        <main className="flex justify-center">
            <div className="max-w-2xl w-full lg:p-4 lg:gap-4 gap-2 flex flex-col">
                <h1 className="lg:text-3xl text-xl font-bold mb-6 flex items-center gap-2">
                    <Add size={32} color="currentColor" strokeColor="none" strokeWidth={0} className="text-green-500" />
                    Új kifizetés hozzáadása
                </h1>

                <Card className="border-gray-400/10 bg-gray-500/5">
                    <div className="flex flex-col">
                        <h2 className="text-gray-500">Otthon:</h2>
                        <p className="text-xl font-bold mb-2 ">{home?.name}</p>
                    </div>
                </Card>


                <Card className="border-gray-400/10 bg-gray-500/5 flex flex-col gap-2 ">
                    <Button className="w-full border border-gray-400/10 bg-gray-500/5 cursor-pointer flex items-center justify-center gap-2 p-1">
                        <div className="gap-2 items-center text-white w-full grid grid-cols-3">

                            {
                                payments.filter((p) => selectedHome?.payments.includes(p.value.split('_')[0])).map((type) => (
                                    <div key={type.value} onClick={() => { setSelectedType(type.value) }} className={`w-full rounded-lg duration-200 border cursor-pointer flex items-center justify-center gap-2 px-8 py-2 text-sm lg:text-base`}>
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
                        {
                            selectedType === "heating" && <Gas size={56} className="text-red-500" color="currentColor" strokeColor="none" strokeWidth={0} />
                        }
                        {
                            selectedType !== "electricity" && selectedType !== "water" && selectedType !== "gas" && selectedType !== "heating" &&
                            <Payment size={56} className="text-gray-200" color="currentColor" strokeColor="none" strokeWidth={0} />
                        }
                    </div>

                    <form action="" onSubmit={handleFormSubmit} className="">
                        <Input name="payment" title="Havi fizetés" placeholder="Pl. 10 000" type="number" value={selectedType} onChange={() => { }} unit={'Ft'} />

                        <DatePicker name="month" value={new Date().toISOString().slice(0, 7)} onChange={(date) => { }} />

                        <div className="w-full flex gap-3 lg:flex-row flex-col mt-6">
                            <Button className="px-8 py-2 w-full border border-green-400/80 bg-green-500/50 hover:bg-green-500/80 cursor-pointer flex items-center justify-center gap-2">
                                <div className="flex gap-2 items-center text-white text-sm">
                                    <Add size={16} className="" color="currentColor" strokeColor="none" strokeWidth={0} />
                                    <span>
                                        Kifizetés hozzáadása
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