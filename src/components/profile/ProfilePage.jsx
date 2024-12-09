import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { toast } from "sonner"; // Importar Sonner

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                // Fetch user bookings using the fetched user ID
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user)

            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        toast.success('Sesión cerrada exitosamente', { duration: 5000, className: 'bg-green-500 text-white p-4' });
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="w-11/12 min-h-screen mx-auto max-w-7xl grid grid-cols-3 gap-10">
            <div className='col-span-1 flex flex-col items-center gap-4 bg-[#EBEBEB] rounded-2xl py-8 px-8 self-start'>
                <div className='flex items-center justify-center'>
                    <img src="https://avatar.iran.liara.run/public/boy?username=Ash" className='w-1/2' alt="" />
                </div>
                {user && <h1 className='text-xl font-bold'>Bienvenido, {user.name}</h1>}
                
                {error && <p className="error-message">{error}</p>}
                {user && (
                    <div className="">
                        <h3 className='font-bold text-center'>Detalle de mi perfil</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Número de teléfono:</strong> {user.phoneNumber}</p>
                    </div>
                )} 
                <div className='flex items-center justify-center w-full gap-4 '>
                    <button className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center" onClick={handleEditProfile}>Editar Perfil<i className="fa-duotone fa-solid fa-pen-to-square"></i></button>
                    <button className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center" onClick={handleLogout}>Salir<i className="fa-duotone fa-solid fa-right-from-bracket"></i></button>
                </div>
            </div>
            <div className="col-span-2">
                <h3 className='font-bold text-2xl mb-5'>Historial de habitaciones</h3>
                <div className="">
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div key={booking.id} className="flex justify-between items-center bg-[#EBEBEB] rounded-2xl mb-4">
                                <div className='w-1/2 flex flex-col gap-3 justify-center p-7'>
                                    <p><strong>Código de reserva:</strong> {booking.bookingConfirmationCode}</p>
                                    <p><strong>Check-in Día:</strong> {booking.checkInDate}</p>
                                    <p><strong>Check-out Día:</strong> {booking.checkOutDate}</p>
                                    <p><strong>Invitados totales:</strong> {booking.totalNumOfGuest}</p>
                                    <p><strong>Tipo de habitación:</strong> {booking.room.roomType}</p>
                                </div>
                                <div className='w-1/2 flex items-center justify-end'>
                                    <img src={booking.room.roomPhotoUrl} alt="Room" className="w-[350px] rounded-r-2xl object-cover h-60" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay habitaciones.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;