import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useSignupController = () => {

    const url = 'http://localhost:3003'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [contact, setContact] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [signupError, setSignupError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event:any ) => {
        event.preventDefault();

        const userData = {
            name,
            email,
            password,
            contact,
            cpf,
            birthdate,
        };

        try {
            const response = await axios.post(url + '/auth/signup', userData);

            console.log(response.data); // verifica
            navigate('/login'); // Redireciona pro login
        } catch (error) {
            console.error(error);
            setSignupError(true);
            // Handle error
        }
    };

    return {
        name,
        email,
        password,
        contact,
        cpf,
        birthdate,
        signupError,
        setName,
        setEmail,
        setPassword,
        setContact,
        setCpf,
        setBirthdate,
        handleSubmit,
    };
};

export default useSignupController;
