import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie'; 

export const PrivateRoutes = ({ children }) => {
    const user = localStorage.getItem('user');
    const location = useLocation();

    if (!user) {
        // Redirige al login y guarda la ubicación actual
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
export const PrivateRoutes2 = ({ children }) => {
    const user = localStorage.getItem('chef');
    const location = useLocation();

    if (!user) {
        // Redirige al login y guarda la ubicación actual
        return <Navigate to="/access" state={{ from: location }} replace />;
    }

    return children;
}
export const PrivateRoutes3 = ({ children }) => {
    // Obtén el token de la cookie
    const token = Cookies.get('token');
    const location = useLocation();

    if (!token) {
        // Redirige al login y guarda la ubicación actual
        return <Navigate to="/accesss" state={{ from: location }} replace />;
    }

    return children;
};