import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = ({ children, roles = null }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (roles && !roles.includes(user.role)) {
            navigate('/');
        }
    }, [roles, user, navigate]);

    return children;
};

export default ProtectedRoute;