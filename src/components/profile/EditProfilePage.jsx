import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="w-11/12 mx-auto max-w-7xl mb-20 h-[60vh] flex items-center">
            <div className='w-1/2 m-auto bg-[#EBEBEB] rounded-md p-10'>
                <h2 className='text-center text-3xl font-bold'>Editar Perfil</h2>
                {error && <p className="error-message">{error}</p>}
                {user && (
                    <div className="mt-10">
                        <p><strong>Nombre y Apellidos:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Número de teléfono:</strong> {user.phoneNumber}</p>
                        <div className='w-full flex flex-row justify-center mt-10'>
                           <button className="text-white px-4 py-2 bg-red-500 rounded-md hover:border-blue-400 hover:bg-red-400 transition-all duration-300 gap-2 flex items-center" onClick={handleDeleteProfile}>Eliminar Perfil<i className="fa-duotone fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                )}
            </div> 
        </div>
    );
};

export default EditProfilePage;