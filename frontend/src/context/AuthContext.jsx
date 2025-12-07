import { useState, createContext, useEffect } from 'react';
import { baseUrl } from '../util/constants';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [Id, setId] = useState('');
    const [user, setUser] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authorize = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                };
                const response = await fetch(
                    `${baseUrl}/api/authorize/`,
                    options
                );
                const data = await response.json();

                if (response.status === 200) {
                    handleSetUser(data.user, data.id, data.admin);
                } else if (response.status === 401) {
                    resetUser();
                }
            } catch (error) {
                console.error('authentication error');
            } finally {
                setLoading(false);
            }
        };

        authorize();
    }, []);

    const handleSetUser = (username, id, admin) => {
        setUser(username);
        setId(id);
        setIsAdmin(admin);
        setIsLogged(true);
    };

    const resetUser = () => {
        setUser('');
        setId('');
        setIsAdmin(false);
        setIsLogged(false);
    };

    let contextData = {
        Id,
        user,
        isAdmin,
        isLogged,
        loading,
        handleSetUser,
        resetUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
