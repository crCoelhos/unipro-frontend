
export interface UserData {
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
};

export interface TicketBatch {
    id: number;
    name: string;
    startDate: string;
    finishDate: string;
    event: {
        id: number;
        name: string;
        status: boolean;
        date: string;
        location: string;
        description: string;
    };
}

export interface LoginResponse {
    token: string;
    user: UserData;
};

export interface AuthContextType {
    token: string;
    setToken: (token: string) => void;
    children: React.ReactNode;
};

export interface UseProfileController {
    handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    user: UserData | null;
    logout: () => void;
    getSessionUser: () => UserData | null;
    setSessionUser: (userData: UserData) => void;
};


export interface ProfileProps {
    formData: UserData;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export interface UserLoginData extends Pick<UserData, 'cpf' | 'password'> { }
