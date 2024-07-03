import React from 'react'
import { BsVolumeUp } from 'react-icons/bs'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';

const Marquee = () => {
  const {data: bannerText} = useFetch(BASE_URL + '/bannerText');

  return (
    <div className='d-flex align-items-center gap-2  homeMarquee mt-3 mb-2 py-1 rounded-3 mx-2 px-1'>
        <BsVolumeUp size={18} className='ms-2 soundIcon' />
        <marquee behavior="" direction="left">
            {bannerText?.text}
        </marquee>

    </div>
    

   )
}

export default Marquee
