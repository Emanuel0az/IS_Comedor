import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie'; 

export const PrivateRoutes = ({ children }) => {
    const token = Cookies.get('token2') || Cookies.get('token3');
    const location = useLocation();

    if (!token) {
        // Redirige al login y guarda la ubicación actual
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
export const PrivateRoutess = ({ children }) => {
    const token = Cookies.get('token2');
    const location = useLocation();

    if (!token) {
        // Redirige al login y guarda la ubicación actual
        return <Navigate to="/home" state={{ from: location }} replace />;
    }

    return children;
}
export const PrivateRoutes2 = ({ children }) => {
    // Obtén el token de la cookie
    const token = Cookies.get('token');
    const location = useLocation();

    if (!token) {
        // Redirige al login y guarda la ubicación actual
        return <Navigate to="/access" state={{ from: location }} replace />;
    }

    return children;
};
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