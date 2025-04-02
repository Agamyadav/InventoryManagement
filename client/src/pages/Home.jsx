import React, { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Dashboard from './DashBoard.jsx';
import Stock from './Stock.jsx';
import Inventory from './Inventory.jsx';
import Sales from './Sales.jsx';
import Orders from './Order.jsx';
import Settings from './Settings.jsx';
import ProfileDetail from './ProfileDetail.jsx'
import bg from '../../public/vectors/Freebie.png'
function Home() {
  const user = { name: 'John Doe', role: 'owner' };
  const franchises = ['Franchise  1', 'Franchise 2'];
  const businessName = 'My Business';
  const [url, setUrl] = React.useState(window.location.href.split('/')[3]);
  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setUrl(window.location.href.split('/')[3]);
    }
    );
  }, []);
  
  return (
    <div className='w-screen h-screen flex gap-1 p-1 rounded-xl overflow-hidden relative'>
      <div className=' w-1/6 h-11/12  rounded-xl border-2 border-gray-300 relative'>
        <Sidebar/>
      </div>
      <div className=' w-5/6 h-11/12  rounded-xl flex flex-col gap-1 '>
        <div className=' h-16 p rounded-xl border-2 border-gray-300'>
          <Navbar businessName={businessName} franchises={franchises} />
        </div>
          {(url===''||url==='#dashboard')&&<Dashboard/>}
          {url==='#stocks'&&<Stock/>}
          {url==='#inventory'&&<Inventory/>}
          {url==='#sales'&&<Sales/>}
          {url==='#orders'&&<Orders/>}
          {url==='#settings'&&<Settings/>}
          {url==='#profile'&&<ProfileDetail/>}
      </div>
      <img src={bg} className='w-full h-full absolute -z-10 top-0 left-0 opacity-15'/>
    </div>
  )
}

export default Home