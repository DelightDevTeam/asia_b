import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';

const Carousel = () => {
  const {data:banners} = useFetch(BASE_URL + "/banner");

  return (
    <Swiper className='my-2'
    slidesPerView={1}
    autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
  >
    {banners && banners.map((banner,index)=>{
        return  <SwiperSlide key={index} className='cursor-pointer'>
            <img className='bannerImg w-100 rounded-3' src={banner.img_url} />
        </SwiperSlide>

    })}
    </Swiper>
  )
}

export default Carousel