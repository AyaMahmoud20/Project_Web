import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png';

export const Breadcrum = (props) => {
  const { product } = props;

  const category = product ? product.category : null;

  return (
    <div className='breadcrum'>
     HOME <img src={arrow_icon} alt="" /> SHOP < img src={arrow_icon} alt="" /> {category} <img src={arrow_icon} alt="" /> {product && product.name}
    </div>
  )
}

export default Breadcrum
