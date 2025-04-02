import React, { useEffect, useState } from 'react';
import Product from './Product'
import { createInventory, getInventories, deleteInventory } from '../Services/inventoryService';

function Inventory() {
  const [inventories, setInventories] = useState([]);
  const [newInventoryName,setNewInventoryName] = useState();

  const [inventoryId,setInventoryId] = useState(window.location.href.split('/')[4]);

  useEffect(()=>{
    const business = JSON.parse(localStorage.getItem('userData')).business;
    const fetchInventory = async() => {
      const res = await getInventories(business._id);
      setInventories(res.data);
    }
    fetchInventory();
  },[])

  const handleAddInventory = async() => {
    const business = JSON.parse(localStorage.getItem('userData')).business;
    if(!newInventoryName) return;
    const res = await createInventory(business._id,newInventoryName);
    setNewInventoryName("")
    window.location.reload();
  }
  const handleDelete = async(id) => {
    const res = await deleteInventory(id);
    window.location.reload();
  }
  useEffect(()=>{
    window.addEventListener('hashchange', () => {
        setInventoryId(window.location.href.split('/')[4]);
    });
  },[])

  return (
    <div className="p-6 h-screen overflow-scroll rounded-xl border-2 border-gray-200 relative">
      {!inventoryId&&<>
      <h1 className="text-2xl font-medium mb-6">Inventory Management</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Inventory</h2>
        <input
          type="text"
          value={newInventoryName}
          onChange={(e) => setNewInventoryName(e.target.value)}
          placeholder="Enter inventory name"
          className="border p-2 mr-4 rounded-md"
        />
        <button
          onClick={handleAddInventory}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Inventory
        </button>
      </div>
      

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Inventories</h2>
        <div className='w-full h-full flex gap-3'>
            {inventories&&inventories.map((inventory) => (
            <div key={inventory.id} className="mb-6 border p-4 rounded-md shadow-md bg-white flex flex-col justify-center gap-3">
                <h3 className="text-lg font-semibold mb-8 text-center">{inventory.inventoryName}</h3>
                <button onClick={()=>(window.location.href = `/#inventory/${inventory._id}`)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                    Manage Inventory
                </button>
                <button onClick={()=>(handleDelete(inventory._id))} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                    Delete
                </button>
            </div>
            ))}
        </div>
      </div>
      </>}
      {
        inventoryId&&<Product inventoryId ={inventoryId} />
      }


    </div>
  );
}

export default Inventory;
