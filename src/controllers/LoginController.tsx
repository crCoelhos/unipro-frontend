import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { UserData } from '../interfaces/types';

const url: String = "http://localhost:3003"

const useLoginController = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [authenticator, setAuthenticator] = useState<string>('');
    const [user, setUser] = useState<any>(null);
    const [loginError, setLoginError] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const config: AxiosRequestConfig = {
            headers: {
                Access: 123,
                'Content-Type': 'application/json'
            }
        };

        const loginData = { login: username, password: password }
        axios.post(`${url}/auth/login`, loginData, { headers: { 'Content-Type': 'application/json', Access: 123 } })
            .then(response => {
                let userData = response.data;
                console.log("data: ", userData);
                setSessionUser(userData);
                setAuthenticator(userData.token);
                setUser(userData);
                setLoginError(false);
                setLoggedIn(true);
            })
            .catch(error => {
                console.error(error.response.data);
                console.log(config)
                setLoginError(true);
                setLoggedIn(false);
            });
    };

    const setSessionUser = (userData: UserData) => {
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const getSessionUser = (): UserData => {
        const storedUserData = sessionStorage.getItem('user');
        return storedUserData ? JSON.parse(storedUserData) : null;
    };

    const logout = () => {
        sessionStorage.removeItem('user');
        setUser(null);
    };



    //                                  revisar ↓
    const updateSessionUser = (updatedUserData: any) => {
        const updatedSessionData = { ...getSessionUser(), user: updatedUserData };
        setSessionUser(updatedSessionData);
    };

    return {
        username,
        password,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit,
        user,
        logout,
        getSessionUser,
        updateSessionUser,
        loginError,
        loggedIn
    };
};

export default useLoginController;