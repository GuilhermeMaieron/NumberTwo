import * as React from 'react';
import { useContext } from 'react';
import styles from './styles.module.scss';
import { TableSortingContext } from './table-sorting-provider';
import { cn } from './utils';

const Root = React.forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => {
    return (
        <div className={`relative w-full overflow-auto ${styles.tableWrapper}`}>
            <table
                ref={ref}
                className={cn('w-full caption-bottom text-sm', className)}
                {...props}
            />
        </div>
    );
});
Root.displayName = 'Root';

const Header = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement> & {
        sticky?: boolean;
    }
>(({ className, children, sticky, ...props }, ref) => (
    <thead
        ref={ref}
        data-sticky={sticky}
        className={cn(`[&_tr]:border-b ${styles.header}`, `${className}`)}
        {...props}
    >
        <tr className="border-b">{children}</tr>
    </thead>
));
Header.displayName = 'Header';

const Body = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn('[&_tr:last-child]:border-0', styles.body, className)}
        {...props}
    />
));
Body.displayName = 'Body';

const Footer = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement> & {
        sticky?: boolean;
    }
>(({ className, sticky, ...props }, ref) => (
    <tfoot
        ref={ref}
        data-sticky={sticky ? 'true' : 'false'}
        className={cn(
            'border-t font-medium [&>tr]:last:border-b-0',
            styles.footer,
            className,
        )}
        {...props}
    />
));
Footer.displayName = 'Footer';

const Row = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            'border-b transition-colors',
            styles.row,
            props.onClick && 'cursor-pointer',
            className,
        )}
        {...props}
    />
));
Row.displayName = 'Row';

const Head = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement> & {
        sortable?: boolean;
        sortableKey?: string;
    }
>(({ className, ...props }, ref) => {
    const { children, sortable, sortableKey, ...innerProps } = props;
    const { sorting, setSorting, isReverse } = useContext(TableSortingContext);
    return (
        <th
            ref={ref}
            className={cn(
                ' h-10 px-2 text-left align-middle text-base font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
                sortable &&
                    `select-none hover:cursor-pointer ${styles.headSortable}`,
                className,
            )}
            onClick={() => sortable && sortableKey && setSorting(sortableKey)}
            {...innerProps}
        >
            {children}
            {sortable ? (
                sortableKey && sorting?.replace('-', '') === sortableKey ? (
                    <i
                        className={`bi ml-2 text-base bi-sort-${isReverse() ? 'down' : 'up'}`}
                    />
                ) : (
                    <i
                        className={`bi bi-filter-left ml-2 text-sm ${styles.sortIconMuted}`}
                    ></i>
                )
            ) : null}
        </th>
    );
});
Head.displayName = 'Head';

const Cell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
            className,
        )}
        {...props}
    />
));
Cell.displayName = 'Cell';

const Caption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn('mt-4 text-sm', styles.caption, className)}
        {...props}
    />
));
Caption.displayName = 'Caption';

export const Table = {
    Root,
    Header,
    Body,
    Head,
    Cell,
    Row,
    Caption,
    Footer,
};
