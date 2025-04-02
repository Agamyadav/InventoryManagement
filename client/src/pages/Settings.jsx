import React, { useEffect, useState } from 'react';
import { setManager, getFranchise } from '../Services/franchiseService';

const Settings = () => {
    const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
    const [currentManager, setCurrentManager] = useState({});
    const [newManager, setNewManager] = useState('');
    const [newManagerEmail, setNewManagerEmail] = useState('');
    const [newManagerPassword, setNewManagerPassword] = useState('');
    const [showManagerForm, setShowManagerForm] = useState(false);

    const handleChangeManager = async (e) => {
        e.preventDefault();
        if (newManager && newManagerEmail && newManagerPassword) {
            try {
                const res =await setManager({
                    managerName: newManager,
                    managerEmail: newManagerEmail,
                    managerPassword: newManagerPassword,
                    franchiseId:franchise._id,
                });


                setNewManager('');
                setNewManagerEmail('');
                setNewManagerPassword('');
                setShowManagerForm(false);
            } catch (error) {
                alert('Error setting manager: ' + error.message);
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    useEffect(() => {
        const fetchFranchise = async () => {
                const res = await getFranchise(franchise._id);
                if ( res.statusCode === 200) {
                    const franchiseData = {
                        _id : res.data._id,
                        franchiseName : res.data.franchiseName,
                        businessId : res.data.businessId,
                        address : res.data.address,
                        managerId : res.data.managerId._id,
                        managerName : res.data.managerId.name,
                        managerEmail : res.data.managerId.email
                    }
                    setCurrentManager ({
                        managerId : res.data.managerId._id,
                        managerName : res.data.managerId.name,
                        managerEmail : res.data.managerId.email
                    })
                    localStorage.setItem("selectedFranchise", JSON.stringify(franchiseData));
                }
        };
            fetchFranchise();
    }, []);

    return (
        <div className="p-6 h-screen overflow-scroll rounded-xl border-2 border-gray-200 relative">
            <h1 className="text-2xl font-medium mb-6">Franchise Settings</h1>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-2">Franchise Details</h2>
                <div className="mb-4">
                    <p className="text-gray-700 font-medium">Franchise Name:</p>
                    <p className="text-lg">{franchise.franchiseName}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700 font-medium">Current Manager:</p>
                    <p className="text-lg">{currentManager.managerName}</p>
                </div>
                <div className="mb-4">
                    <p className="text-gray-700 font-medium">Location:</p>
                    <p className="text-lg">{franchise.address}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-2">Change Manager</h2>

                <button
                    onClick={() => setShowManagerForm(!showManagerForm)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    {showManagerForm ? 'Cancel' : 'Set Manager'}
                </button>

                {showManagerForm && (
                    <form onSubmit={handleChangeManager} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-gray-700">New Manager Name</label>
                            <input
                                type="text"
                                value={newManager}
                                onChange={(e) => setNewManager(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">New Manager Email</label>
                            <input
                                type="email"
                                value={newManagerEmail}
                                onChange={(e) => setNewManagerEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">New Manager Password</label>
                            <input
                                type="password"
                                value={newManagerPassword}
                                onChange={(e) => setNewManagerPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                )}

                <p className="mt-4">Current Manager: {currentManager.managerName}</p>
                <p>Manager Email: {currentManager.managerEmail}</p>
            </div>
        </div>
    );
};

export default Settings;
