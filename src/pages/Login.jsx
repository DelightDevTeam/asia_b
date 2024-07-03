import React, { useEffect, useState } from 'react'
import '../assets/css/auth.css'
import { Form, InputGroup } from 'react-bootstrap'
import { BiLock, BiUser } from 'react-icons/bi'
import tele from '../assets/img/teleWhite.svg'
import fb from '../assets/img/fbw.svg'
import viber from '../assets/img/viberw.svg'
import { Link, useNavigate } from 'react-router-dom'
import SmallSpinner from '../components/SmallSpinner'
import BASE_URL from "../hooks/baseURL";

const LoginPage = () => {
  const [username , setUsername] = useState('');
  const [password , setPassword] = useState('');
  const [error , setError] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success , setSuccess] = useState('');
  const [loading , setLoading] = useState(false);
  const [data, setData] = useState('');
  const navigate = useNavigate();

    const links=[
        {img:tele,link:'/'},
        {img:fb,link:'/'},
        {img:viber,link:'/'},
    ];

    const auth = localStorage.getItem('token');

    useEffect(() => {
      if(auth){
        navigate('/');
      }
    }, [auth, navigate]);
  
    const login = (e) =>{
      e.preventDefault();
      setLoading(true);
      const loginData = {
          user_name: username,
          password: password
      };
      
      fetch(BASE_URL + '/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
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
            throw new Error('Login Failed');
          }
          return response.json();
        })
        .then(data => {
          setData(data);
          setLoading(false);
          if(data.data.is_changed_password === 0){
            setUserId(data.data.id)
            setPhone("");
            setPassword("");
            change();
          }else{
            if (data.data.token) {
              localStorage.setItem('token', data.data.token);
              window.location.href = "/";
              console.log("success");
            } else {
              throw new Error('Token not found in response');
            }
          }
        })
        .catch(error => {
        });
    }
  

  return (
    <div className='authBg py-4'>
      <h3 className="fw-bold text-center">လော့အင်</h3>
      <form onSubmit={login} className="authForm mx-auto my-4">
        <div className="mb-3">
          <InputGroup className=''>
            <InputGroup.Text className='formIcon' id="basic-addon1">
              <BiUser size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="ဂိမ်းအကောင့်"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
          {error.user_name && <span className='text-danger'>*{error.user_name}</span>}
          {errMsg && <span className='text-danger'>*{errMsg}</span>}
        </div>
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text className='formIcon' id="basic-addon1">
              <BiLock size={20} />
            </InputGroup.Text>
            <Form.Control
              placeholder="စကားဝှက်"
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {error.password && <span className='text-danger'>*{error.password}</span>}
        </div>
        
        <div className="text-center mt-4">
          <button className="w-75  navLoginBtn fw-bold rounded-4 py-2 px-3 px-sm-4">
            {loading && <SmallSpinner />}
            <h6 className='p-0 m-0 fw-bold d-inline'>လော့အင်</h6>
          </button>
          <Link to={'/register'}>
            <button className="mt-3 w-75 authRegBtn fw-bold rounded-4 py-2 px-3 px-sm-4">
              <h6 className='p-0 m-0 fw-bold'>စာရင်းသွင်းရန်</h6>
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

export default LoginPage
