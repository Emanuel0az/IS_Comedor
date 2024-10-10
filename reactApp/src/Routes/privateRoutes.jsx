import { Navigate, useLocation } from "react-router-dom";

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