import React from 'react';
import { FaTachometerAlt, FaBoxOpen, FaProductHunt, FaChartLine, FaClipboardList, FaCog } from 'react-icons/fa';
const Sidebar = () => {
    return (
        <div className="h-screen p-6 w-full shadow-lg">
            
            <nav className="flex flex-col space-y-4">
                <a href="#dashboard" className="flex items-center p-2 text-xl text-gray-700 hover:bg-gray-200 rounded-md">
                    <FaTachometerAlt className="mr-3" />
                    <span>Dashboard</span>
                </a>
                <a href="#stocks" className="flex items-center p-2 text-xl text-gray-700 hover:bg-gray-200 rounded-md">
                    <FaBoxOpen className="mr-3" />
                    <span>Stocks</span>
                </a>
                <a href="#inventory" className="flex items-center p-2 text-xl text-gray-700 hover:bg-gray-200 rounded-md">
                    <FaProductHunt className="mr-3" />
                    <span>Inventory</span>
                </a>
                <a href="#sales" className="flex items-center p-2 text-xl text-gray-700 hover:bg-gray-200 rounded-md">
                    <FaChartLine className="mr-3" />
                    <span>Sales</span>
                </a>
                <a href="#orders" className="flex items-center p-2 text-xl text-gray-700 hover:bg-gray-200 rounded-md">
                    <FaClipboardList className="mr-3" />
                    <span>Orders</span>
                </a>
                <a href="#settings" className="flex items-center p-2 text-xl text-gray-700 hover:bg-gray-200 rounded-md">
                    <FaCog className="mr-3" />
                    <span>Settings</span>
                </a>
            </nav>
            
        </div>
    );
};

export default Sidebar;
