import React,{useState,useEffect} from 'react';
import { getInventories } from '../Services/inventoryService';
import StockPage from './StockPage';
import { createFranchiseStock } from '../Services/franchiseService';




function Stock() {
    const [inventories,setInventories] = useState([]);
    const [inventoryId,setInventoryId] = useState(window.location.href.split('/')[4]);
    
    useEffect(()=>{
        const business = JSON.parse(localStorage.getItem('userData'))?.business;
        const fetchInventory = async() => {
            const res =  await getInventories(business._id);
            setInventories(res.data);
            const franchise = JSON.parse(localStorage.getItem("selectedFranchise"));
            const res1 = await createFranchiseStock(franchise._id,business._id);

        }
        fetchInventory();
    },[])

    useEffect(()=>{
        window.addEventListener('hashchange', () => {
            setInventoryId(window.location.href.split('/')[4]);
        });
    },[])

    return (
        <div className="p-6 h-screen overflow-scroll rounded-xl border-2 border-gray-200 relative">
        {!inventoryId&&<div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Inventories</h2>
            <div className='w-full h-full flex gap-3'>
                {inventories&&inventories.map((inventory) => (
                <div key={inventory._id} className="mb-6 border p-4 rounded-md shadow-md bg-white flex flex-col justify-center gap-3">
                    <h3 className="text-lg font-semibold mb-8 text-center">{inventory.inventoryName}</h3>
                    <button onClick={()=>(window.location.href = `/#stocks/${inventory._id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                        Manage Inventory
                    </button>
                    <button onClick={()=>(handleDelete(inventory._id))} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                        Delete
                    </button>
                </div>
                ))}
            </div>
        </div>}

            {inventoryId &&<StockPage inventoryId={inventoryId}/>}
        </div>
    );
}


export default Stock;
