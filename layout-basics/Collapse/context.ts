"use client"
import { createContext } from 'react';

type CollapseContextType = {
    id: string,
    isOpen: boolean,
}

export const CollapseContext = createContext<CollapseContextType>({
    id: "",
    isOpen: false
});
