import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../Context/ShopContext';

// Component to display star ratings
const Stars = ({ rating, onRate }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="star-rating">
      {stars.map((star) => (
        <img
          key={star}
          src={star <= rating ? star_icon : star_dull_icon} 
          alt={`Star ${star}`}
          onClick={() => onRate(star)} 
        />
      ))}
    </div>
  );
};

export const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, updateStock } = useContext(ShopContext);
  const [stockLevel, setStockLevel] = useState(product?.stock_level);
  const [lowStockAlert, setLowStockAlert] = useState(false);
  const [newReview, setNewReview] = useState({ comment: "", rating: 0 });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (stockLevel && stockLevel <= 5) {
      setLowStockAlert(true);
    } else {
      setLowStockAlert(false);
    }
  }, [stockLevel]);

  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const handleAddReview = () => {
    setReviews([...reviews, newReview]);
    setNewReview({ comment: "", rating: 0 });
  };

  if (!product || !product.image || !product.name || !product.new_price) {
    return null;
  }

  return (
    <div className='product-display'>
      <div className='product-display-left'>
        <div className='product-display-image-list'> 
          <img src={product.image} alt=""/>
          <img src={product.image} alt=""/>
          <img src={product.image} alt=""/>
          <img src={product.image} alt=""/>
        </div>
        <div className='product-display-image'>
          <img className='product-display-main-image' src={product.image} alt=""/>    
        </div>
      </div>
      <div className='product-display-right'> 
        <h1>{product.name}</h1>
        <div className='product-display-right-stars'> 
          <Stars rating={newReview.rating} onRate={(rating) => setNewReview({ ...newReview, rating })} />
         
        </div>
        <div className='product-display-right-prices'> 
          <div className='product-display-right-price-old'>${product.old_price}</div>
          <div className='product-display-right-price-new'>${product.new_price}</div>
        </div>
        <div className='product-display-right-description'>
          <p>{product.description}</p>
        </div>
        <div className='product-display-right-size'>
          <h1>Select Size</h1>
          <div className='product-display-right-sizes'> 
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={handleAddToCart}>Add To Cart</button>
        <div className='product-display-right-reviews'>
          <h3>Add Review:</h3>
          <textarea
            placeholder="Write your review here..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          />
          <button onClick={handleAddReview}>Add Review</button>
        </div>
        {}
        <div className="reviews-list">
          <h3>Reviews ({reviews.length}) :</h3>
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <p>{review.comment}</p>
            
            </div>
          ))}
        </div>
        {lowStockAlert && <p style={{ color:'red' }}>Low stock! Only {stockLevel} left.</p>}
      </div>
    </div>
  );
};

export default ProductDisplay;
