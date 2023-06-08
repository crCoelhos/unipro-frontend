import React, { useState } from 'react';
import Profile from '../components/Profile/Profile';

function ProfileController() {
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
    };
  
    return (
      <Profile
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  
  export default ProfileController;