import React, { useEffect } from "react";
import 'flowbite';
import { ChevronDown, Settings } from "../icons/Icons";

export default function Dropdown({ title, items, onSelect }: { title?: string, items?: string[], onSelect?: (item: string) => void }) {

    const [dropdown, setDropdown] = React.useState<boolean | null>(null);

    return (
        <div className="relative">

            <button id="dropdownDefaultButton" onFocus={() => { setDropdown(!dropdown) }} onBlur={() => { setTimeout(() => setDropdown(false), 100) }}
                className="w-fit text-white bg-gray-500/40 hover:bg-gray-400/40 focus:ring-2 focus:outline-none focus:ring-gray-300/40 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer gap-2" type="button">
                <Settings isStroke size={16} color="currentColor" strokeColor="currentColor" strokeWidth={2} />
                {title || "Válassz egy lakást!"}
                <ChevronDown size={16} color="currentColor" strokeColor="currentColor" strokeWidth={2} isStroke className={`${dropdown ? 'rotate-180' : ''} duration-200`} />
            </button>
            {
                dropdown &&
                <div className="z-10 absolute top-[110%] left-1/2 transform -translate-x-1/2 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow-sm min-w-44 w-56">
                    <ul className="py-2 px-2 text-sm text-gray-200 ">
                        {items?.map((item, index) => (
                            <li key={index}>
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    if (onSelect) onSelect(item);
                                    setDropdown(false);
                                }} className="block px-4 py-2 hover:bg-gray-700 rounded-lg hover:tracking-widest duration-200">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            }

        </div>
    );
}