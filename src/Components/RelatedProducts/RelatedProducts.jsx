import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/data_women';
import Items from '../Items/Items';

const RelatedProducts = () => {
  return (
    <div className='related-products'>
      <h1>Related Products</h1>
      <hr />
      <div className="related-products-item">
        {data_product.map((item, i) => (
          <Items
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
