import React, { useState } from 'react';
import './Profile.css';
import profile from '../Assets/samantha-cover-model-fashion-women-female.jpg';

const Profile = () => {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [name, setName] = useState("Aya Mahmoud");
  const [email, setEmail] = useState("Aya_Mahmoud@gmail.com");
  const [location, setLocation] = useState("Cairo");
  const [phone, setPhone] = useState("01234567891");
  const [profileImage, setProfileImage] = useState(profile);

  const openOrders = () => {
    setIsOrdersOpen(true);
  };

  const closeOrders = () => {
    setIsOrdersOpen(false);
  };

  const openEdit = () => {
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  const handleProfileImageChange = (event) => {
    const newImage = URL.createObjectURL(event.target.files[0]);
    setProfileImage(newImage);
  };

  const handleSave = () => {
    closeEdit();
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profileImage} alt="Profile" className="profile-photo" />
        <h2>{name}</h2>
      </div>
      <div className="profile-info">
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <p>Location : {location}</p>
        <p>Phone : {phone}</p>
      </div>
      <div className="profile-actions">
        <button onClick={openEdit}>Edit Profile</button>
        <button className="delete-account">Delete Account</button>
        <button className="orders-button" onClick={openOrders}>Orders</button>
      </div>
      {isEditOpen && (
        <div className="edit-profile-popup">
          <h3>Edit Profile</h3>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <label>Change Profile Image:</label>

          <input type="file" accept="image/*" onChange={handleProfileImageChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={closeEdit}>Cancel</button>
        </div>
      )}
      {isOrdersOpen && (
        <div className="orders-popup">
          <p>Order 1 - Confirmed - Refund: $0</p>
          <p>Order 2 - refused  - Refund: $80</p>
          <p>Order 3 - Confirmed - Refund: $0</p>
          <button onClick={closeOrders}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
