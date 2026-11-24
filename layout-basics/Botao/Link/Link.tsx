import Link, { LinkProps } from 'next/link';
import { HTMLAttributeAnchorTarget, ReactNode } from 'react';
import style from './Link.module.scss';

type InnerLinkProps = LinkProps &
    React.RefAttributes<HTMLAnchorElement> & {
        children: ReactNode;
        className?: string;
        target?: HTMLAttributeAnchorTarget;
    };

const InnerLink = ({ href, children, className, ...props }: InnerLinkProps) => (
    <Link href={href} className={`${style.link} ${className}`} {...props}>
        {children}
    </Link>
);

export { InnerLink as Link };
