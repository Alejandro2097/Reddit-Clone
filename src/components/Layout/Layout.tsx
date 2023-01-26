import React, { ReactNode } from 'react';


type LayoutProps = {
    children?: ReactNode;
};
const Layout:React.FC<LayoutProps> = ({ children } ) => {
    
    return ( 
        <>
            {/*<Navbar>  */}
            <main>{children}</main>
        </>
    )
}
export default Layout;