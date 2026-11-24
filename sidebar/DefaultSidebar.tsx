// eslint-disable-next-line camelcase
import { ReactNode } from 'react';
import { Sidebar, SidebarBodyContent, SidebarFooter, SidebarThemeToggle } from '.';

type ConteudoDefaultSidebar = {
    children: ReactNode,
    titulo: string,
    func_submit?: () => void,
    metodo_form?: string,
    href?: string,
    defaultClosed?: boolean
}


export function DefaultSidebar(props: ConteudoDefaultSidebar) {
    
    return (
        <Sidebar href={props.href} 
                 defaultClosed={props.defaultClosed} 
                 titulo={props.titulo}
                 metodo_form={props.metodo_form} 
                 func_submit={props.func_submit}>
            <SidebarBodyContent>
                {props.children}
            </SidebarBodyContent>

            {/* <SidebarFooter>   
                
            </SidebarFooter> */}
        </Sidebar>
    );
}
