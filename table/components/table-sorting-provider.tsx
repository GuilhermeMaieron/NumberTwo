"use client"
import { createContext, useEffect, useState } from 'react';

type TableContextType = {
    sorting: string | undefined;
    setSorting: (column: string) => void;
    isReverse: () => boolean;
};

export const TableSortingContext = createContext<TableContextType>({
    sorting: undefined,
    setSorting: () => {},
    isReverse: () => false,
});

type TableSortingProviderProps = {
    children?: React.ReactNode;
    sortingValue?: string;
    onSortingChange?: (sorting: string | undefined) => void;
};

export function TableSortingProvider({
    children,
    sortingValue,
    onSortingChange,
}: TableSortingProviderProps) {
    const [sorting, setSorting] = useState<string | undefined>(sortingValue);

    useEffect(() => {
        setSorting(sortingValue);
    }, [sortingValue]);

    const setSortingHandler = (column: string) => {
        let newSortingValue = undefined;
        if (sorting === column) {
            newSortingValue = `-${column}`;
        } else if (sorting === `-${column}`) {
            newSortingValue = undefined;
        } else {
            newSortingValue = column;
        }
        setSorting(newSortingValue);
        onSortingChange?.(newSortingValue);
    };
    const isReverse = () => sorting?.startsWith('-') ?? false;

    return (
        <TableSortingContext.Provider
            value={{
                sorting,
                setSorting: setSortingHandler,
                isReverse,
            }}
        >
            {children}
        </TableSortingContext.Provider>
    );
}
