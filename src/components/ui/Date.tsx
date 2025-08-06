"use client"
import React, { useEffect } from "react";
import 'flowbite';
import { Callendar, ChevronDown, Settings } from "../icons/Icons";

export default function DatePicker({ value, onChange, name }: { value?: string, onChange?: (date: any) => void, name?: string }) {


    const [defValue, setDefaultValue] = React.useState<string | undefined | any>(value);
    useEffect(() => {
        if (value) {
            setDefaultValue(value);
        }
    }, [value]);

    console.log('DatePicker value:', defValue);

    function AddAMonth() {
        const newDate = new Date(new Date(defValue as any).setMonth(new Date(defValue as any).getMonth() + 1));
        setDefaultValue(newDate.toISOString().slice(0, 7));
        console.log('New date:', newDate.toISOString().slice(0, 7));
    }

    return (
        <React.Fragment>
            <label htmlFor={name} className="block text-sm font-medium text-gray-900 dark:text-white mt-4">Hónap</label>
            <div className="flex">
                <input name={name} type='month' id={name} value={defValue} onChange={(e) => { setDefaultValue(e.target.value) }} className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <label onClick={AddAMonth} className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 border-e-0 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <Callendar size={16} className="text-gray-400" color="currentColor" strokeColor="currentColor" strokeWidth={2} isStroke />
                </label>
            </div>
        </React.Fragment>
    );
}