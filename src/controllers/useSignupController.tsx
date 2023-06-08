import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSignupController = () => {
    const url = 'http://localhost:3003';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sex, setSex] = useState('');
    const [contact, setContact] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [signupError, setSignupError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const userData = {
            name,
            email,
            password,
            contact,
            cpf,
            birthdate,
            sex,
        };

        try {
            const response = await axios.post(url + '/auth/signup', userData);

            navigate('/login'); // Redireciona para a página de login
        } catch (error) {
            console.error(error);
            setSignupError(true);
        }
    };

    return {
        name,
        email,
        password,
        birthdate,
        sex,
        contact,
        cpf,
        signupError,
        setName,
        setEmail,
        setPassword,
        setSex,
        setContact,
        setCpf,
        setBirthdate,
        handleSubmit,
    };
};

export default useSignupController;
