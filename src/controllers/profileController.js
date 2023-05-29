import { useState } from 'react';

const useProfileController = () => {
  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null);

  const setSessionUser = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  }

  const getSessionUser = () => {
    const storedUserData = sessionStorage.getItem('user');
    return storedUserData ? JSON.parse(storedUserData) : null;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedUserData = { ...user.user, ...formData };
    setSessionUser({ ...user, user: updatedUserData });
  };

  const handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: fieldValue }));
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  }

  return {
    handleFormSubmit,
    handleInputChange,
    user,
    logout,
    getSessionUser,
    setSessionUser
  };
};

export default useProfileController;
