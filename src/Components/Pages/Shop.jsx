import React, { useState } from 'react';
import NewCollections from '../NewCollections/NewCollections';
import './Shop.css';

const Shop = () => {
    const [filter, setFilter] = useState('all');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div className="shop-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                />
                <button className="search-button">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className="filter-container">
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="filter-select"
                >
                    <option value="all">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
            <NewCollections filter={filter} />
        </div>
    );
};

export default Shop;
