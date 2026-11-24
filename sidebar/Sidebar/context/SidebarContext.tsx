"use client"
import { createContext } from 'react';

type SidebarContextType = {
    expanded: boolean
};

export const SidebarContext = createContext<SidebarContextType>({
    expanded: true
});

