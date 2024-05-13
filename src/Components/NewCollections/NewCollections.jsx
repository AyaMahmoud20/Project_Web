import React, { useState, useEffect } from 'react';import './NewCollections.css';
import new_collection from '../Assets/new_collections';
import Items from '../Items/Items';

const NewCollections = () => {

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item, i) => (
                    <Items
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                        status={item.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewCollections;

/*const NewCollections = () => {
    const [newCollection, setNewCollection] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setNewCollection(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {newCollection.map((item, i) => (
                    <Items
                        key={i}
                        id={item._id}
                        name={item.productName}
                        image={item.image}
                        new_price={item.price}
                        old_price={item.old_price}
                        status={item.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewCollections;
*/