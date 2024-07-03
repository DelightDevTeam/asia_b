import React from 'react'
import '../assets/css/auth.css'
import { Form, InputGroup } from 'react-bootstrap'
import { BiLock, BiPhone, BiUser } from 'react-icons/bi'
import tele from '../assets/img/teleWhite.svg'
import fb from '../assets/img/fbw.svg'
import viber from '../assets/img/viberw.svg'
import { Link } from 'react-router-dom'
import { CgLock } from 'react-icons/cg'
import { FaIdCard } from 'react-icons/fa'

const RegisterPage = () => {
    const links=[
        {img:tele,link:'/'},
        {img:fb,link:'/'},
        {img:viber,link:'/'},
    ]
  return (
    <div className='authBg py-4'>
      <h3 className="fw-bold text-center">စာရင်းသွင်းရန်</h3>
      <h6 className="text-warning text-center mt-4 mb-3 fw-bold"> 
      စာရင်းသွင်းပြီးလျှင်ပြောင်းလဲ၍ မရတော့သောကြောင့် သင်၏သတင်းအချက်အလက်များကို အမှန်တိုင်းဖြည့်စွက်ပေးပါ
       </h6>
      <form action="" className="authForm mx-auto my-4">
      <InputGroup className='mb-3'>
      <InputGroup.Text className='formIcon' id="basic-addon1">
        <BiUser size={20} />
      </InputGroup.Text>
        <Form.Control
          placeholder="ဂိမ်းအကောင့်"
           aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className='mb-3'>
      <InputGroup.Text className='formIcon' id="basic-addon1">
        <FaIdCard size={20} />
      </InputGroup.Text>
        <Form.Control
          placeholder="အမည်ရင်း"
           aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className='mb-3'>
      <InputGroup.Text className='formIcon' id="basic-addon1">
        <BiPhone size={20} />
      </InputGroup.Text>
        <Form.Control
          placeholder="ဖုန်းနံပါတ်"
           aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className='mb-3'>
      <InputGroup.Text className='formIcon' id="basic-addon1">
        <BiLock size={20} />
      </InputGroup.Text>
        <Form.Control
          placeholder="စကားဝှက်"
        type='password'
        />
      </InputGroup>
      <InputGroup className='mb-3'>
      <InputGroup.Text className='formIcon' id="basic-addon1">
        <BiLock size={20} />
      </InputGroup.Text>
        <Form.Control
          placeholder="စကားဝှက် အတည်ပြုပါ"
        type='password'
        />
      </InputGroup>
     
      <div className="text-center mt-4">
       <button className="w-75  navLoginBtn fw-bold rounded-4 py-2 px-3 px-sm-4">
        <h6 className='p-0 m-0 fw-bold'>စာရင်းသွင်းမည်</h6>
      </button>
       <Link to={'/login'}>
      <button className="mt-3 w-75 authRegBtn fw-bold rounded-4 py-2 px-3 px-sm-4">
        <h6 className='p-0 m-0 fw-bold'>လော့အင်</h6>
      </button>
      </Link>
      </div>
      </form>
      <div className="d-flex align-items-center  justify-content-center gap-4">
        {links.map((item,index)=>{
            return  <Link to={item.link}  key={index}>
                  <img src={item.img} />
              </Link>

        })}
      </div>
     </div>
  )
}

export default RegisterPage
