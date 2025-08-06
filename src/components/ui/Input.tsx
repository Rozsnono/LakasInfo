import React from "react";

export default function Input({title, placeholder, type = "text", value, onChange, unit, name}: {title?: string, placeholder?: string, type?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void, unit?: string, name?: string}) {
    return (
        <React.Fragment>
            <label htmlFor={name} className="block text-sm font-medium text-gray-900 dark:text-white">{title}</label>
            <div className="flex">
                <input name={name} id={name} type={type} className="rounded-none rounded-s-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} />
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-s-0 border-gray-300 border-e-0 rounded-e-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    {unit}
                </span>
            </div>
        </React.Fragment>
    )
}