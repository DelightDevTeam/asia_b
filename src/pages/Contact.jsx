import React from 'react';
import logo from '../assets/img/logo.png';
import tele from '../assets/img/tele.png';
import viber from '../assets/img/viber.png';
import fb from '../assets/img/fb.png';
import line from '../assets/img/line.png';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const socials = [
    { img: tele, title: 'Telegram Official', link: '/' },
    { img: viber, title: 'Viber Official', link: '/' },
    { img: fb, title: 'Facebook Official', link: '/' },
    { img: line, title: 'Line Official', link: '/' },
  ];
  return (
    <div className='py-5 px-3 px-sm-5 '>
      <h4 className='fw-bold text-center mb-4'>ဆက်သွယ်ရန်</h4>
      <div className='contactBox mx-auto h-max d-flex flex-wrap flex-sm-nowrap align-items-center justify-content-center gap-sm-4 rounded-4 border shadow-lg py-2 py-sm-0 px-4 px-lg-5 my-3'>
        <img src={logo} />
        <div>
          <small className='fw-bold '>
            Asia Bet Slot မှလှိုက်လှဲစွာကြိုဆိုပါတယ်ရှင့်
          </small>
          <small className='d-block mt-2 fw-bold'>
            လူကြီးမင်းများတွက် 24 နာရီ၀န်ဆောင်မှုများပေးဆောင်နိုင်ရန်
          </small>
        </div>
      </div>
      <div className='row mt-sm-5'>
        {socials.map((item, index) => {
          return (
            <div className='col-6 mb-4 col-sm-3 text-center' key={index}>
              <Link to={item.link}>
                <img src={item.img} className='socialContactImg' />
                <small className='d-block'>{item.title}</small>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactPage;
