import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrum from '../BreadCrums/Breadcrum';
import { ProductDisplay } from '../ProductDisplay/ProductDisplay';
import DescriptionBox from '../DescriptionBox/DescriptionBox';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { ShopContext } from '../Context/ShopContext';

const Product = () => {
    const [reviews, setReviews] = useState([]);

    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const product = all_product.find((e) => e.id === Number(productId));
    console.log("aya"+ product);
    return (
        <div>

            <Breadcrum Product={product} />
            <ProductDisplay product={product}  />
            <DescriptionBox />
            <RelatedProducts />
        </div>
    );
};

export default Product;