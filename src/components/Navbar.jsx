import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../assets/css/navbar.css';
import { IoMdClose } from 'react-icons/io';
import home from '../assets/img/home.svg';
import logo from '../assets/img/logo.png';
import money from '../assets/img/money.png';
import register from '../assets/img/register.svg';
import promotion from '../assets/img/promotion.svg';
import trophy from '../assets/img/trophy.svg';
import profile from '../assets/img/profile.svg';
import contact from '../assets/img/contact.svg';
import deposit from '../assets/img/deposit.svg';
import about from '../assets/img/about.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaViber } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';

function Navbar() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('token');
  const { data: user } = useFetch(BASE_URL + '/user');
  // console.log(user);

  const navLinks = [
    { img: home, name: 'ပင်မ', link: '/' },
    // {img:register,name:'စာရင်းသွင်းရန်',link:'/register'},
    { img: profile, name: 'မိမိမှတ်တမ်း', link: '/information?tab=profile' },
    { img: money, name: 'ငွေသွင်း/ငွေထုတ်', link: '/information?tab=transfer' },
    { img: promotion, name: 'ပရိုမိုးရှင်း', link: '/promotion' },
    // {img:trophy,name:'အမှတ်စဥ်များ',link:'/ranking'},
    { img: contact, name: 'ဆက်သွယ်ရန်', link: '/contact' },
    { img: about, name: 'ကျွန်ုပ်တို့အကြောင်း', link: '/contact' },
  ];
  const [show, setShow] = useState(false);

  return (
    <>
      <div className='navbar py-0 px-2 shadow-lg d-flex align-items-center'>
        <div className='d-flex align-items-center gap-sm-2'>
          {auth && (
            <div
              onClick={() => setShow(true)}
              className='border py-sm-0 px-1 px-sm-2 rounded border-2'
            >
              <HiOutlineMenuAlt2 size={25} />
            </div>
          )}
          <Link to={'/'}>
            <img src={logo} className='navLogo' />
          </Link>
        </div>

        {auth && user && (
          <div className='d-flex align-items-center gap-2'>
            <Link to={'/information?tab=transfer'}>
              <img src={deposit} className='navDepositImg' />
            </Link>
            <div>
              <Link to={'/information?tab=profile'}>
                <div style={{ marginBottom: '0px' }}>
                  <img src={profile} className='me-1 navProfileImg' />
                  <small className='fw-bold'>{user.user_name}</small>
                </div>
                <small className='ms-1'>
                  {Number(user.balance).toLocaleString('en-US')} MMK
                </small>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Offcanvas
        className='sidebar text-white '
        show={show}
        onHide={() => setShow(false)}
      >
        <div className=' px-sm-2'>
          <Offcanvas.Header className=' w-100'>
            <Offcanvas.Title className='w-100 d-flex align-items-center justify-content-between'>
              <p> </p>
              <IoMdClose
                onClick={() => setShow(false)}
                className='cursor-pointer'
                size={30}
                color='#fff'
              />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='w-100'>
            {navLinks.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    navigate(item.link);
                    setShow(false);
                  }}
                  key={index}
                  className='  mb-3 d-flex align-items-center gap-3'
                >
                  <img src={item.img} className='sideBarImg' />
                  <p className='fw-bold sidebarTitle'>{item.name}</p>
                </div>
              );
            })}
            <div className='mt-4 w-max px-4 px-sm-5 py-2 cursor-pointer sidebarSocial text-center rounded-3'>
              <FaViber size={28} />
              <p className=' fw-semibold'>09123456890</p>
            </div>
            <h5 className=' sidebarTeleText text-center fw-semibold mt-4 mb-3'>
              Telegram
              <span className='mx-1 mx-sm-3'>|</span>
              0912346590
            </h5>
            <h5 className='sidebarViberText text-center fw-semibold'>
              Viber
              <span className='mx-1 mx-sm-3'>|</span>
              0912346590
            </h5>
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
}

export default Navbar;
