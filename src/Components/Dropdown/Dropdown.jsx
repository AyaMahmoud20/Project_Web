import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Dropdown.css'; 

const Dropdown = () => {
  const [open, setOpen] = useState(false);
  const categories = ['Men', 'Women', 'Kids']; 

  return (
    <div className="dropdown" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="toggle">
      <span className="topline common"> </span>
      <span className="middleline  common"> </span>
      <span className="bottonline common"> </span>

        </div>
      {open && (
        <div className="dropdown-content">
          {categories.map(category => (
            <Link key={category} to={`/${category.toLowerCase()}`}>{category}</Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
