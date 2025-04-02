import React, { useState,useEffect } from 'react';
import { FaCog, FaPlus } from 'react-icons/fa';
import { logout } from '../Services/authService';
import { handleCreateFranchise, fetchFranchises } from '../Services/franchiseService';


const FranchiseForm = ({ isOpen, onClose, onSubmit }) => {
    const [franchiseName, setFranchiseName] = useState('');
    const [franchiseAddress, setFranchiseAddress] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (franchiseName && franchiseAddress) {
            onSubmit({ franchiseName: franchiseName, address: franchiseAddress });
            setFranchiseName('');
            setFranchiseAddress('');
        } else {
            setError('Please fill in both fields.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl mb-4">Create New Franchise</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                        <label htmlFor="franchiseName" className="block text-gray-700">Franchise Name</label>
                        <input
                            type="text"
                            id="franchiseName"
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                            value={franchiseName}
                            onChange={(e) => setFranchiseName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="franchiseAddress" className="block text-gray-700">Franchise Address</label>
                        <input
                            type="text"
                            id="franchiseAddress"
                            className="w-full px-4 py-2 mt-2 border rounded-md"
                            value={franchiseAddress}
                            onChange={(e) => setFranchiseAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Navbar = ({ businessName }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isFranchiseFormOpen, setIsFranchiseFormOpen] = useState(false);
    const [franchises,setFranchises] = useState([]);
    const [selectedFranchise, setSelectedFranchise] = useState("");
    const user = JSON.parse(localStorage.getItem('userData'))?.user;
    const business = JSON.parse(localStorage.getItem('userData'))?.business;


    const handleLogout = () => {
        logout();
    };


    const CreateFranchise = async (franchiseData) => {
        franchiseData = {...franchiseData, businessId:business._id};
        const res = await handleCreateFranchise(franchiseData);
        
        setIsFranchiseFormOpen(false);
    };

    const fetchFranchise = async () => {
        const res = await fetchFranchises(business._id);
        
        setFranchises(res);
        setSelectedFranchise(res[0].franchiseName);
    }
    useEffect(() => {
        fetchFranchise();
    }, []);

    useEffect(() => {
        if (selectedFranchise) {
            const franchiseData = franchises.find(franchise => franchise.franchiseName === selectedFranchise);
            if (franchiseData) {
                localStorage.setItem('selectedFranchise', JSON.stringify(franchiseData));
            }
        }
    }, [selectedFranchise, franchises]);

    return (
        <div className='h-full px-2  rounded-xl flex items-center justify-between'>
            <div className="relative w-1/2 flex justify-center items-center gap-3">
                {franchises&&franchises.length > 0 ? (
                    <div className="relative w-3/4">
                        <button
                            className=" w-full px-4 py-2 text-lg font-normal text-gray-700 bg-black/10 backdrop-blur-lg  outline-none rounded-md shadow-sm"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {selectedFranchise}
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute left-0 w-full mt-2 origin-top-right bg-white/30 backdrop-blur-md z-10 border border-gray-300 rounded-md shadow-lg">
                                {franchises.map((franchise, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setSelectedFranchise(franchise.franchiseName);
                                            setIsDropdownOpen(false);
                                        }}
                                        className="block w-full px-4 py-2 text-lg text-left text-gray-700 hover:bg-black/5 outline-none"
                                    >
                                        {franchise.franchiseName}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <span className="text-lg font-semibold text-gray-700">{businessName}</span>
                )}
                <button
                    onClick={() => setIsFranchiseFormOpen(true)}
                    className=" h-3/4 flex justify-center items-center px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                    <FaPlus className="text-lg" />
                </button>
            </div>

            <div className="w-1/2 justify-end flex items-center space-x-4">
                <div className="text-lg text-gray-700">
                    {user?.name}
                </div>
                <div className={`text-lg px-2 select-none rounded-lg ${user?.role==='manager'?' bg-orange-300/20 text-orange-400 border border-orange-400':'bg-green-300/15 text-green-400 border border-green-400'}`}>
                    {user?.role === 'manager' ? 'Manager' : 'Owner'}
                </div>
                <a href="#profile" className="flex justify-center items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md">
                    <FaCog className="text-xl" />
                </a>
                
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium text-white bg-red-400 rounded-md hover:bg-red-500">
                    Sign Off
                </button>
            </div>

            <FranchiseForm
                isOpen={isFranchiseFormOpen}
                onClose={() => setIsFranchiseFormOpen(false)}
                onSubmit={CreateFranchise}
            />
        </div>
    );
};

export default Navbar;
