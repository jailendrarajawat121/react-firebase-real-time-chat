import React from 'react';
import NavbarComponent from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <NavbarComponent />
            <div className="layout-content">
                <Sidebar />
                <main className="main">{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout; 