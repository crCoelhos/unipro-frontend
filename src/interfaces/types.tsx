
export interface UserData {
    // token: string; //CONSIDERAR ESTA ADIÇÃO
    user: {
        id: number;
        name: string;
        cpf: string;
        birthdate: string;
        registration: string;
        contact: string;
        course: string;
        university: string;
        photo: string | null;
        password: string;
        role: string;
        is_active: boolean;
        membership_date: string;
        createdAt: Date;
        updatedAt: Date;
    },
};

export interface LoginResponse {
    token: string;
    user: UserData['user'];
};

export interface AuthContextType {
    token: string;
    setToken: (token: string) => void;
    children: React.ReactNode;
};

export interface UseProfileController {
    handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    user: UserData['user'] | null;
    logout: () => void;
    getSessionUser: () => UserData['user'] | null;
    setSessionUser: (userData: UserData['user']) => void;
};


export interface ProfileProps {
    formData: UserData['user'];
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export interface UserLoginData extends Pick<UserData['user'], 'cpf' | 'password'> { }
