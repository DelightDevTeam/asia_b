import React from 'react'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseURL'
import Games from './Games';
import { Spinner } from 'react-bootstrap';

const AllTab = () => {
  const {data: types, loading} = useFetch(BASE_URL + "/gameType");
  // console.log(types);
  return (
    <div className='p-3'>
      {/* <h5>All Games</h5> */}
      {
        loading && <Spinner />
      }
      {types && types.map((type, index) => (
        <div key={index}>
          <h2 className='mb-3'>{type.name}</h2>
          <Games games={type.products} type={type.name} />
        </div>
      ))}
    </div>
  )
}

export default AllTab
