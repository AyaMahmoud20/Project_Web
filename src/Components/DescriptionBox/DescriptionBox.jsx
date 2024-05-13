import React, { useState } from 'react';
import './DescriptionBox.css'
export const DescriptionBox = () => {
  const [p, setP] = useState('');

  return (
    <div className='descriptionbox' >
<div className="descriptionbox-navigator">
<div className="descriptionbox-nav-box">Description</div>
</div>
<div className="description box-Description">
    <p>E-commerce websites have become cornerstone businesses in the digital age, revolutionizing how we shop, sell, and connect globally.In essence, e-commerce websites are not just platforms for buying and selling; they are dynamic hubs that facilitate global trade, enhance customer experiences, and drive innovation in the retail industry.

</p>

<p>In essence, e-commerce websites are not just platforms for buying and selling; they are dynamic hubs that facilitate global trade, enhance customer experiences, and drive innovation in the retail industry.</p>
    </div>
    </div>
  )
}
export default DescriptionBox
