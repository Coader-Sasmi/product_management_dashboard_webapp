// src/components/Layout/Layout.tsx

import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar toggleSidebar={toggleSidebar} />

            <div className="flex">
                <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;