import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

// render content only when logged in
const PrivateRoute = ({ children, navigateTo = '/login', replace = true }) => {
    const { isLogged } = useContext(AuthContext);

    if (!isLogged) {
        return <Navigate to={navigateTo} replace={replace} />;
    }

    return children;
};

export default PrivateRoute;
