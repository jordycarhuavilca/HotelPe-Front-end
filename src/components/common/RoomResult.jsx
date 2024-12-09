import { useNavigate } from 'react-router-dom'; 
import ApiService from '../../service/ApiService';
import PropTypes from 'prop-types';

const RoomResult = ({ roomSearchResults }) => {
    const navigate = useNavigate(); 
    const isAdmin = ApiService.isAdmin();
    return (
        <section className="mt-5 w-11/12 mx-auto max-w-7xl">
            {roomSearchResults && roomSearchResults.length > 0 && (
                <div className="m-auto  flex flex-col gap-4">
                    {roomSearchResults.map(room => (
                        <div key={room.id} className="grid grid-cols-4 gap-4 items-center bg-[#EBEBEB] rounded-lg ">
                            <img className='w-full rounded-l-lg object-cover h-56' src={room.roomPhotoUrl} alt={room.roomType} />
                            <div className="col-span-2 flex-col flex gap-4">
                                <h3><b>Tipo de habitacion :</b> {room.roomType}</h3>
                                <p><b>Precio:</b> S/{room.roomPrice} por noche</p>
                                <p><b>Descripcion:</b> {room.roomDescription}</p>
                            </div>

                            <div className='flex gap-1 col-span-1 items-center justify-end p-10'>
                                {isAdmin ? (
                                    <button
                                        className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center"
                                        onClick={() => navigate(`/admin/edit-room/${room.id}`)} 
                                    >
                                        Editar <i className="fa-duotone fa-solid fa-pen-to-square"></i>
                                    </button>
                                ) : (
                                    <button
                                        className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center"
                                        onClick={() => navigate(`/room-details-book/${room.id}`)} 
                                    >
                                        Reservar / <i className="fa-duotone fa-solid fa-eye"></i>
                                    </button>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

RoomResult.propTypes = {
    roomSearchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RoomResult;