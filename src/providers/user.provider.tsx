"use client";
import React, { useEffect } from "react";
import { createContext } from "react";


export interface Homes {
    user: any;
    setUser: (homes: any[]) => void;
}

export const UserContext = createContext<Homes>({
    user: null,
    setUser: (user: any) => { },
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<any>(null);

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('user='));
        if (!cookie) {
            saveUserToCookie(user);
        }
    }, [user]);

    useEffect(() => {
        const cookie = document.cookie.split('; ').find(row => row.startsWith('user='));
        if (cookie) {
            const cUser = JSON.parse(cookie.split('=')[1]);
            setUser(cUser);
        }
    }, [])

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function saveUserToCookie(home: any) {
    if (typeof window !== "undefined" && home) {
        document.cookie = `user=${JSON.stringify(home)}; path=/; max-age=31536000;`;
    }
}