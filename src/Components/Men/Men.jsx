import React from 'react'
import './Men.css'
import data_product  from '../Assets/data_men'
import Items from '../Items/Items'
const Men =() => {
    return (
        <div className='popular'>
            <h1> POPULAR IN MEN </h1>
            <hr />
            <div className="popular-item">
                {data_product.map((item,i)=>{
                    return <Items
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                    old_price={item.old_price}
                    status={item.status}

                />
                })}
            </div>
          

        </div>
    )
}
export default Men