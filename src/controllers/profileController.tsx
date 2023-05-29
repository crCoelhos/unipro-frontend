import { useState } from 'react';
import { UserData, UseProfileController } from '../interfaces/types';

const useProfileController = (): UseProfileController => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [user, setUser] = useState<UserData | null>(null);

  const setSessionUser = (userData: UserData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const getSessionUser = (): UserData | null => {
    const storedUserData = sessionStorage.getItem('user');
    return storedUserData ? JSON.parse(storedUserData) : null;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    const updatedUserData = { ...user, ...formData };
    setSessionUser(updatedUserData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: fieldValue }));
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return {
    handleFormSubmit,
    handleInputChange,
    user,
    logout,
    getSessionUser,
    setSessionUser,
  };
};

export default useProfileController;
