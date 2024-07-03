import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import TransferLogs from './TransferLogs';
import GameLogs from './GameLogs';
import DepositLog from './DepositLog';
import WithdrawLog from './WithdrawLog';

const Log = () => {
  const [selectedTab,setSelectedTab]=useState(1);
  const tabs=[
      {id:1,name:'ငွေသွင်း',value:''},
      {id:2,name:'ငွေထုတ်',value:''},
      {id:3,name:'လွှဲပြောင်းမှတ်တမ်း',value:''},
      {id:4,name:'ဂိမ်းမှတ်တမ်း',value:''},
   ];
  



  return (
    <div className='container-fluid'>
      <div className="d-flex flex-wrap align-items-center justify-content-center gap-1 gap-sm-2">
        {tabs.map((tab, index)=>{
            return <div onClick={()=>setSelectedTab(tab.id)} className={`btn py-1 px-3 py-sm-2 px-sm-5 ${tab.id===selectedTab ? 'navLoginBtn text-black' : 'bg-dark text-white' }  `} key={index}>
                <p className="fw-semibold moneyTransferTabTitle">{tab.name}</p>
            </div>
        })}
      </div>
      {/* cash in */}
      {selectedTab === 1 && (
        <DepositLog />
      )}
      {/* cash out */}
      {selectedTab === 2 && (
        <WithdrawLog />
      )}
      {/* transaction */}
      {selectedTab === 3 && (
        <TransferLogs />
      )}
      {/* game logs */}
      {selectedTab === 4 && (
        <GameLogs />
      )}
    </div>
  )
}

export default Log
