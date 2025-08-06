"use client";
import React, { useEffect } from "react";
import { createContext } from "react";


export interface Homes {
    homes: any[];
    selectedHome?: any;
    setSelectedHome?: (home: any) => void;
    setHomes: (homes: any[]) => void;
}

export const HomeContext = createContext<Homes>({
    homes: [],
    selectedHome: undefined,
    setSelectedHome: (home: any) => { },
    setHomes: (homes: any[]) => { },
});

export function HomeProvider({ children }: { children: React.ReactNode }) {
    const [homes, setHomes] = React.useState<any[]>([]);
    const [selectedHome, setSelectedHome] = React.useState<any | undefined>(undefined);

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('selectedHome='));
        if (!cookie) {
            saveHomeToCookie(selectedHome);
        }else if(cookie && cookie.split('=')[1] !== JSON.stringify(selectedHome)) {
            saveHomeToCookie(selectedHome);
        }
    }, [selectedHome]);

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('selectedHome='));
        if (cookie) {
            const home = JSON.parse(cookie.split('=')[1]);
            setSelectedHome(home);
        }else{
            setSelectedHome(null);
        }
    }, [])

    return (
        <HomeContext.Provider value={{ homes, setHomes, selectedHome, setSelectedHome }}>
            {children}
        </HomeContext.Provider>
    );
}

export function saveHomeToCookie(home: any) {
    if (typeof window !== "undefined" && home) {
        document.cookie = `selectedHome=${JSON.stringify(home)}; path=/; max-age=31536000;`;
    }
}