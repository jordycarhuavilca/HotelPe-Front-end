import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';

const AdminPage = () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        <div className="w-11/12 mx-auto max-w-7xl mb-20 h-[60vh] flex items-center">
            <div className='w-1/2 m-auto bg-[#EBEBEB] rounded-md p-10'>
                <h1 className="font-bold text-3xl text-center">Bienvenido, {adminName}</h1>
                <div className="flex flex-row justify-center mt-10 gap-6">
                    <button className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center" onClick={() => navigate('/admin/manage-rooms')}>
                        Administrar Habitaciones <i className="fa-duotone fa-solid fa-bed-front"></i>
                    </button>
                    <button className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center" onClick={() => navigate('/admin/manage-bookings')}>
                        Gestionar reservas <i className="fa-duotone fa-solid fa-list-check"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;