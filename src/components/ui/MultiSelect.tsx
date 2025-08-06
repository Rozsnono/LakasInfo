import React, { useEffect } from "react";
import 'flowbite';
import { Check, ChevronDown, Settings } from "../icons/Icons";

export default function MultiSelect({ title, items, onSelect, name }: { title?: string, items?: any[], onSelect?: (item: string) => void, name?: string }) {

    const [dropdown, setDropdown] = React.useState<boolean>(false);

    const [checkedItems, setCheckedItems] = React.useState<string[]>([]);



    const handleCheckboxChange = (item: string) => {
        setCheckedItems((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };
    useEffect(() => {
        if (onSelect) {
            onSelect(checkedItems.join(", "));
        }
    }, [checkedItems, onSelect]);

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (!(e.target as HTMLElement).classList.contains(`${name}`)) {
                setDropdown(false);
            } else if (!dropdown && (e.target as HTMLElement).classList.contains(`${name}`)) {
                setDropdown(true);
            }
        });
    }, []);


    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-200 mb-2">{title}</label>

            <button
                className={`${name} w-full text-white bg-gray-500/40 hover:bg-gray-400/40 focus:ring-2 focus:outline-none focus:ring-gray-300/40 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between cursor-pointer gap-2`} type="button">
                {title || "Válassz egy lakást!"}
                <ChevronDown size={16} color="currentColor" strokeColor="currentColor" strokeWidth={2} isStroke className={`${dropdown ? 'rotate-180' : ''} duration-200`} />
            </button>
            {
                (dropdown) &&
                <div className={`${name} z-10 absolute top-[110%] left-1/2 transform -translate-x-1/2 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow-sm min-w-44 w-56`}>
                    <ul className={`py-2 px-2 text-sm text-gray-200 select-none multi-select ${name}`}>
                        {items?.map((item, index) => (
                            <li key={index} className={`flex items-center ${name}`}>
                                <Check isChecked={checkedItems.includes(item.value)} size={16} color="currentColor" className="multi-select" />
                                <label className={`${name} ml-2 block px-4 py-2 hover:bg-gray-700 rounded-lg hover:tracking-widest duration-200 cursor-pointer`} htmlFor={item.value}>{item.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            }

            {
                items?.map((item, index) => (
                    <input key={index} type="checkbox" id={item.value} className={`${name} hidden`} checked={checkedItems.includes(item.value)} onChange={() => { handleCheckboxChange(item.value) }} />
                ))
            }

        </div>
    );
}