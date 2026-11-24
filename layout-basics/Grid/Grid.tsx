
type LayoutProps = {
    children: React.ReactNode | React.ReactNode[],
    className?: string,
    style?: React.CSSProperties,
}


export function Row({ children, className = '', style }: LayoutProps) {
    return (
        <div className={`d-flex flex-row w-100 align-items-center ${className}`} style={style}>
            {children}
        </div>
    );
}

export function Col({ children, className = '', style }: LayoutProps) {
    return (
        <div className={`d-flex flex-column w-100 ${className}`} style={style}>
            {children}
        </div>
    );
}

export function Flex({ children, className = '', style }: LayoutProps) {
    return (
        <div className={`d-flex ${className}`} style={style}>
            {children}
        </div>
    );
}
