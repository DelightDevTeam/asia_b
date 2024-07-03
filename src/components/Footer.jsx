import React from 'react'
import Marquee from "react-fast-marquee";
import g1 from '../assets/img/g1.png'
import g2 from '../assets/img/g2.png'
import g3 from '../assets/img/g3.png'
import g4 from '../assets/img/g4.png'
import g5 from '../assets/img/g5.png'
import g6 from '../assets/img/g6.png'
import g7 from '../assets/img/g7.png'
import g8 from '../assets/img/g8.png'
import g9 from '../assets/img/g9.png'
import g10 from '../assets/img/g10.png'

const Footer = () => {
    const imgs=[g1,g2,g3,g4,g5,g6,g7,g8,g9,g10]
  return (
    <div className='mb-5 pb-5'>
      <Marquee>
            {imgs.map((item,index)=>{
                return <img src={item} key={index} className='me-4 footerMarqueeImg' />
            })}
      </Marquee>
    </div>
  )
}

export default Footer
