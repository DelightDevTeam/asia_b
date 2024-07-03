import React from 'react'
import dragon from '../assets/img/dragon.svg'
import trophyGold from '../assets/img/trophyGold.svg'
 import '../assets/css/ranking.css';
import { Accordion } from 'react-bootstrap';

const RankingPage = () => {
    const datas=[
        {
            title:'ယနေ့',
            data:[]
        },
        {
            title:'ရက်သတ္တပတ် 1',
            data:[
                {user:'user1',balance:'23,456'},
                {user:'user1',balance:'23,456'},
                {user:'user1',balance:'23,456'},
             ]
        },
        {
            title:'ရက်သတ္တပတ် 2',
            data:[
                {user:'user1',balance:'23,456'},
                {user:'user1',balance:'23,456'},
                {user:'user1',balance:'23,456'},
             ]
        },
        {
            title:'ရက်သတ္တပတ် 3',
            data:[
                {user:'user1',balance:'23,456'},
                {user:'user1',balance:'23,456'},
                {user:'user1',balance:'23,456'},
             ]
        },
        {
            title:'ရက်သတ္တပတ် 4',
            data:[
                {user:'user1',balance:'23,456'},
                {user:'user1',balance:'23,456'},
                {user:'user1',balance:'23,456'},
             ]
        },
        
    ]
  return (
    <div className='ranking py-4 px-3 px-sm-5'>
      <div className="d-flex align-items-center justify-content-center gap-sm-4">
      <img src={dragon} className='dragon' />
      <div className='text-center'>
            <div className="cursor-pointer bg-black text-white py-2 px-3 px-sm-5 rounded-3">
              <h5 className="fw-bold rankingText"> {new Date().toLocaleString()}</h5>
         </div>
            <h5 className="mt-3 mb-2 rankingText fw-bold">တစ်လတာ အနိုင်ရသူ 
            <img src={trophyGold} className='trophyGold' /></h5>
            <h5 className=" fw-bold rankingText">NGAJAYXXX X26</h5>
      </div>
      </div>
       <Accordion className='mb-5 mt-4'>
        {datas.map((item,index)=>{
           return  <Accordion.Item className='mb-2 rounded-3' eventKey={index} key={index}>
             <Accordion.Header >{item.title}</Accordion.Header>
             <Accordion.Body>
                {item.data.length===0 && <p className='text-white'>မှတ်တမ်းမရှိပါ</p>
                }
                {item.data.map((result)=>{
                    return <div className="bg-black mb-2 text-white py-1 px-4 text-center">
                        <h6>{result.user} - {result.balance}</h6>
                    </div>
                })}
             </Accordion.Body>
           </Accordion.Item>
        })}
      
    </Accordion>
    </div>
  )
}

export default RankingPage
