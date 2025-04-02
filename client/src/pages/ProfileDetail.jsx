import React, { useState } from 'react';
import { getUser, updateDetails } from '../Services/authService';
import { getCurrentUser } from '../Services/authService';

const ProfileDetail = () => {
    const user = JSON.parse(localStorage.getItem('userData')).user;
    const business = JSON.parse(localStorage.getItem('userData')).business;

    const [isEditingOwner, setIsEditingOwner] = useState(false);
    const [isEditingBusiness, setIsEditingBusiness] = useState(false);
    
    const [ownerName, setOwnerName] = useState(user.name);
    const [ownerEmail, setOwnerEmail] = useState(user.email);

    
    const [businessName, setBusinessName] = useState(business.businessName);
    const [businessType, setBusinessType] = useState(business.businessType);

    
    const handleUpdate = async(e) => {
        e.preventDefault();
        const res  = await updateDetails({
            name: ownerName,
            businessName,
            businessType
        })
        console.log(res);
        const response = await getUser();
        localStorage.setItem("userData", JSON.stringify(response?.data));
        window.location.reload();
        setIsEditingOwner(false);
        setIsEditingBusiness(false);
        
    };

    return (
        <div className="p-6 h-screen overflow-scroll rounded-xl border-2 border-gray-200 relative">
            <h1 className="text-2xl font-medium mb-6">Profile Details</h1>
            
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Owner Details</h2>
                {isEditingOwner ? (
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input
                                type="text"
                                value={ownerName}
                                onChange={(e) => setOwnerName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditingOwner(false)}
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div>
                        <p><strong>Name:</strong> {ownerName}</p>
                        <p><strong>Email:</strong> {ownerEmail}</p>
                        <button
                            onClick={() => setIsEditingOwner(true)}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Edit Owner Details
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold mb-4">Business Details</h2>
                {isEditingBusiness ? (
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Business Name</label>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Website</label>
                            <input
                                type="url"
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditingBusiness(false)}
                            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div>
                        <p><strong>Business Name:</strong> {businessName}</p>
                        <p><strong>Business Type:</strong> {businessType}</p>
                        <button
                            onClick={() => setIsEditingBusiness(true)}
                            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                        >
                            Edit Business Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileDetail;
