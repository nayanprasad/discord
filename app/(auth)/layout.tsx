import React from 'react';

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <div className={"bg-amber-800 h-full"}>
            {children}
        </div>
    );
};

export default Layout;
