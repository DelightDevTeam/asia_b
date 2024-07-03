import React from 'react'

const Promotion = () => {
    const imgs=[
        'https://tbbslot3d.netlify.app/assets/promotion1-D1y5gQGM.png',
        'https://tbbslot3d.netlify.app/assets/promotion2-B5iW7-Mx.gif',
        'https://tbbslot3d.netlify.app/assets/promotion4-D8z2ql8D.gif'
    ]
  return (
      <div className='py-4 px-3 px-sm-5 mx-lg-5 mb-5'>
        <h1 className="fw-bold text-center">Promotion</h1>
        {imgs.map((img,index)=>{
          return  <img key={index} src={img} className='my-3 my-sm-4 promotionImg' />
        })}
     </div>
  )
}

export default Promotion
