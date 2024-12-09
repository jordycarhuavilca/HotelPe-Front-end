import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { toast } from "sonner"; // Importar Sonner

function Navbar() {
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        ApiService.logout();
        toast.success('Sesión cerrada exitosamente', { duration: 5000, className: 'bg-green-500 text-white p-4'});
        navigate('/home');
    };

    return (
        <nav className="h-[68px] w-full flex items-center justify-center">
            <div className='grid grid-cols-3 gap-4 items-center justify-between w-11/12 max-w-7xl'>
                <div className="flex gap-1 items-center col-span-1">
                    <i className="fa-solid fa-hotel text-blue-500"></i><NavLink to="/home" className="text-lg">HotelPe</NavLink>
                </div>
                <div className='col-span-1 flex items-center justify-center'>
                    <ul className="flex items-center gap-12 text-base">
                        <li><NavLink to="/home" activeclassname="active">Inicio</NavLink></li>
                        <li><NavLink to="/rooms" activeclassname="active">Habitaciones</NavLink></li>
                        <li><NavLink to="/find-booking" activeclassname="active">Mis reservas</NavLink></li>
                    </ul>
                </div>
                <div className="flex gap-1 col-span-1 items-center justify-end">
                        {isUser && <li className='list-none'><NavLink to="/profile" className="text-blue-500 px-4 py-2 border-2 border-blue-500 rounded-md hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 gap-2 flex items-center" activeclassname="active">Perfil<i className="fa-duotone fa-solid fa-user"></i></NavLink></li>}
                        {isAdmin && <li className='list-none'><NavLink to="/admin" activeclassname="active" className="text-blue-500 px-4 py-2 border-2 border-blue-500 rounded-md hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 gap-2 flex items-center">Admin <i className="fa-solid fa-user-tie"></i></NavLink></li>}

                        {!isAuthenticated &&<NavLink  to="/login" activeclassname="active" className="text-black px-4 py-2 border-2 bg-white border-white rounded-md hover:text-white hover:border-blue-500 hover:bg-blue-500 transition-all duration-300">Iniciar Sesión</NavLink>}
                        {!isAuthenticated &&<NavLink to="/register" className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300" activeclassname="active">Registrate</NavLink>}
                        
                        {isAuthenticated && <li onClick={handleLogout} className='list-none cursor-pointer text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center'>Salir <i className="fa-duotone fa-solid fa-right-from-bracket"></i></li>}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;