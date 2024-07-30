import React, { useState } from 'react'
import '../assets/css/auth.css'
import { Form, InputGroup, Spinner } from 'react-bootstrap'
import { BiCode, BiLock, BiPhone, BiUser } from 'react-icons/bi'
import tele from '../assets/img/teleWhite.svg'
import fb from '../assets/img/fbw.svg'
import viber from '../assets/img/viberw.svg'
import { Link } from 'react-router-dom'
import { CgLock } from 'react-icons/cg'
import { FaIdCard } from 'react-icons/fa'
import BASE_URL from '../hooks/baseURL'

const RegisterPage = () => {
    const links=[
        {img:tele,link:'/'},
        {img:fb,link:'/'},
        {img:viber,link:'/'},
    ]
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [refCode, setRefCode] = useState("");
    const [error, setError] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const register = (e) =>{
      e.preventDefault();
      setLoading(true);
      const registerData = {
          name: name,
          phone: phone,
          password: password,
          password_confirmation: confirmPassword,
          referral_code: refCode,
      };
      console.log(registerData);
      
      fetch(BASE_URL + '/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      })
        .then(async response => {
          if (!response.ok) {
            setLoading(false);
            let errorData;
            try {
              errorData = await response.json();
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
      
            if (response.status === 422) {
              setErrMsg("");
              setError(errorData.errors);
            }else if (response.status === 401) {
              setError("");
              setErrMsg(errorData.message)
              // console.log(errorData.message);
            }else{
            }
            throw new Error('Register Failed');
          }
          return response.json();
        })
        .then(data => {
          setLoading(false);
          localStorage.setItem('token', data.data.token);
          window.location.href = "/";
        })
        .catch(error => {
        });
    }

  return (
    <div className='authBg py-4'>
      <h3 className="fw-bold text-center">စာရင်းသွင်းရန်</h3>
      <h6 className="text-warning text-center mt-4 mb-3 fw-bold"> 
      စာရင်းသွင်းပြီးလျှင်ပြောင်းလဲ၍ မရတော့သောကြောင့် သင်၏သတင်းအချက်အလက်များကို အမှန်တိုင်းဖြည့်စွက်ပေးပါ
       </h6>
      <form onSubmit={register} className="authForm mx-auto my-4">
      
      <div className="mb-3">
        <InputGroup>
            <InputGroup.Text className='formIcon' id="basic-addon1">
              <FaIdCard size={20} />
            </InputGroup.Text>
              <Form.Control
                placeholder="အမည်ရင်း"
                aria-describedby="basic-addon1"
                onChange={e => setName(e.target.value)}
                value={name}
              />
        </InputGroup>
        {error.name && <small className='text-danger d-block'>{error.name}</small>}
      </div>
      

      <div className="mb-3">
        <InputGroup className='mb-3'>
            <InputGroup.Text className='formIcon' id="basic-addon1">
              <BiPhone size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="ဖုန်းနံပါတ်"
              aria-describedby="basic-addon1"
              onChange={e => setPhone(e.target.value)}
              value={phone}
            />
        </InputGroup>
        {error.phone && <small className='text-danger d-block'>{error.phone}</small>}
      </div>

      <div className="mb-3">
        <InputGroup>
            <InputGroup.Text className='formIcon' id="basic-addon1">
              <BiLock size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="စကားဝှက်"
            type='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
            />
        </InputGroup>
        {error.password && <small className='text-danger d-block'>{error.password}</small>}
      </div>

      <div className="mb-3">
        <InputGroup>
            <InputGroup.Text className='formIcon' id="basic-addon1">
              <BiLock size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="စကားဝှက် အတည်ပြုပါ"
            type='password'
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            />
        </InputGroup>
        {error.password_confirmation && <small className='text-danger d-block'>{error.password_confirmation}</small>}
      </div>

    <div className="mb-3">
      <InputGroup>
          <InputGroup.Text className='formIcon' id="basic-addon1">
            <BiCode size={20} />
          </InputGroup.Text>
          <Form.Control
            placeholder="ရည်ညွန်းကုဒ် ထည့်ပါ။"
            aria-describedby="basic-addon1"
            onChange={e => setRefCode(e.target.value)}
            value={refCode}
          />
      </InputGroup>
      {error.referral_code && <small className='text-danger d-block'>{error.referral_code}</small>}
    </div>

     
      <div className="text-center mt-4">
       <button type='submit' className="w-75  navLoginBtn fw-bold rounded-4 py-2 px-3 px-sm-4">
        {loading && <Spinner size='sm' className='me-2' />}
        <h6 className='p-0 m-0 fw-bold d-inline'>စာရင်းသွင်းမည်</h6>
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
