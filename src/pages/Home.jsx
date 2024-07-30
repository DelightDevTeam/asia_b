import React, { useState } from 'react';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import '../assets/css/home.css';
import { Link } from 'react-router-dom';
import { FaGift, FaViber } from 'react-icons/fa';
import tele from '../assets/img/teleWhite.svg';
import fb from '../assets/img/fbw.svg';
import viber from '../assets/img/viberw.svg';
import Marquee from '../components/Marquee';
import BASE_URL from '../hooks/baseURL';

const HomePage = () => {
  const auth = localStorage.getItem('token');
  const [loader, setLoader] = useState(false);

  const links = [
    { img: tele, link: '/' },
    { img: fb, link: '/' },
    { img: viber, link: '/' },
  ];

  const logout = async (e) => {
    e.preventDefault();
    setLoader(true);
    localStorage.removeItem('token');
    window.location.href = '/login';
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        // console.log("Logout success!");
        setLoader(false);
        window.location.href = '/login';
      } else {
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <Marquee />
      <Carousel />
      <div className='beforeLoginHome my-5 pb-3'>
        {!auth && (
          <>
            <Link to={'/login'}>
              <button className='w-full py-2   rounded-3 homeLoginBtn text-center text-black fw-bold'>
                လော့အင်
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="mt-3 w-full text-center authRegBtn fw-bold rounded-3 py-2  d-block px-sm-4">
                <h5 className="p-0 m-0 fw-bold">စာရင်းသွင်းရန်</h5>
              </button>
            </Link>
          </>
        )}
        {auth && (
          <>
            <button
              className='w-full py-2 rounded-3 homeLoginBtn text-center text-black fw-bold'
              onClick={logout}
            >
              {loader ? (
                <SmallSpinner />
              ) : (
                <i className='fas fa-right-from-bracket me-2'></i>
              )}
              ထွက်ရန်
            </button>
          </>
        )}

        <div className='mt-4 w-full text-center d-flex align-items-center justify-content-center gap-2  py-2 cursor-pointer sidebarSocial text-center rounded-3'>
          <FaViber size={28} />
          <p className=' fw-semibold'>09123456890</p>
        </div>
        <div className='mt-4  w-full text-center d-flex align-items-center justify-content-center gap-2   py-2 cursor-pointer homePromotionBtn text-center rounded-3'>
          <FaGift size={28} />
          <p className=' fw-semibold  '>ပရိုမိုးရှင်း</p>
        </div>
        <div className='mt-4  d-flex align-items-center  justify-content-center gap-4'>
          {links.map((item, index) => {
            return (
              <Link to={item.link} key={index}>
                <img src={item.img} />
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
