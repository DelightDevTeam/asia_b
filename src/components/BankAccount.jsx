import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import wave from '../assets/img/wave.png'
import cb from '../assets/img/cb.png'
import aya from '../assets/img/aya.png'
import kbz from '../assets/img/kbz.png'

const BankAccount = () => {
  const [show,setShow]=useState(false);
  const [selectedBank,setSelectedBank]=useState({});
  const banks=[
    {img:wave,name:'Wave Money'},
    {img:cb,name:'CB Pay'},
    {img:aya,name:'AYA Pay'},
    {img:kbz,name:'KPay'},

  ]
  return (
    <div>
      <form className="profileForm mt-4 px-3 py-4 rounded-4">
      <h5 className="fw-bold mb-3">Add Bank Account | Max 1 account</h5>
      {selectedBank.img ? <div onClick={()=>setShow(true)} className='mb-2 cursor-pointer d-flex gap-2 align-items-center justify-content-center border rounded-3 ' style={{background:'#E5E5E5'}}>
        <img src={selectedBank.img}
         style={{height:'50px',width:'50px'}}  /> <small className="text-secondary fw-bold">
          {selectedBank.name}
        </small>
      </div> :
        <input onClick={()=>setShow(true)} type="text" readOnly className="form-control mb-2" placeholder='ဘဏ်အကောင့်ရွေးရန်' /> }

        <input type="text" className="form-control mb-2" placeholder='ဘဏ်အကောင့်နာမည်ကို မှန်ကန်စွာဖြည့်ပေးပါ' />
        <input type="text" className="form-control mb-2" placeholder='ဘဏ်အကောင့်နံပါတ်ကို မှန်ကန်စွာဖြည့်ပေးပါ' />
        <div className="text-end mt-3">
        <button className="btn text-black navLoginBtn">
           Submit
        </button>
        </div>
      </form>
      <Modal show={show} onHide={()=>setShow(false)} className='cursor-pointer infoBankAccModal'>
       <div className="px-1 py-2">
       <Modal.Header >
          <Modal.Title className=' text-center mx-auto'>
            <h5 className="fw-bold infoBankAccModalTitle">ဘဏ်အကောင့်ရွေးရန်</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='row'>
            {banks.map((bank,index)=>{
              return <div onClick={()=>{
                setSelectedBank(bank);
                setShow(false);
              }} key={index} className="col-3 p-1 p-sm-2">
                <img src={bank.img} className='img-fluid' />
              </div>
            })}
        </Modal.Body>
        <Modal.Footer >
        <button onClick={()=>setShow(false)} className="navLoginBtn btn text-black fw-bold w-100">
        ပယ်ဖျက်သည်
        </button>
        </Modal.Footer>
       </div>
      </Modal>
    </div>
  )
}

export default BankAccount
