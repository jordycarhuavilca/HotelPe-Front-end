import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditRoomPage = () => {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [roomDetails, setRoomDetails] = useState({
        roomPhotoUrl: '',
        roomType: '',
        roomPrice: '',
        roomDescription: '',
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await ApiService.getRoomById(roomId);
                setRoomDetails({
                    roomPhotoUrl: response.room.roomPhotoUrl,
                    roomType: response.room.roomType,
                    roomPrice: response.room.roomPrice,
                    roomDescription: response.room.roomDescription,
                });
            } catch (error) {
                setError(error.response?.data?.message || error.message);
            }
        };
        fetchRoomDetails();
    }, [roomId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreview(null);
        }
    };


    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.updateRoom(roomId, formData);
            if (result.statusCode === 200) {
                setSuccess('Habitación actualizada correctamente.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
            setTimeout(() => setSuccess(''), 5000);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('¿Quieres eliminar esta habitación?')) {
            try {
                const result = await ApiService.deleteRoom(roomId);
                if (result.statusCode === 200) {
                    setSuccess('Habitación eliminada correctamente.');
                    
                    setTimeout(() => {
                        setSuccess('');
                        navigate('/admin/manage-rooms');
                    }, 3000);
                }
            } catch (error) {
                setError(error.response?.data?.message || error.message);
                setTimeout(() => setError(''), 5000);
            }
        }
    };

    return (
        <div className="w-11/12 mx-auto max-w-7xl">
            <h2 className='font-bold text-3xl'>Editar Habitación</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <div className="grid grid-cols-4 gap-5 items-center m-auto bg-[#EBEBEB] rounded-2xl mt-5">
                <div className="col-span-1">
                    <label>
                        {preview ? (
                            <img
                                src={preview}
                                alt="Room Preview"
                                className="w-full rounded-l-xl cursor-pointer"
                            />
                        ) : (
                            roomDetails.roomPhotoUrl && (
                                <img
                                    src={roomDetails.roomPhotoUrl}
                                    alt="Room"
                                    className="w-full rounded-l-xl cursor-pointer"
                                />
                            )
                        )}
                        <input
                            type="file"
                            name=""
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>
                <div className="col-span-2 flex flex-col gap-3">
                    <div className='flex gap-3 items-center justify-between'>
                        <label>Tipo de habitación :</label>
                        <input
                            className='py-2 px-2 rounded-md text-base w-[400px]'
                            type="text"
                            name="roomType"
                            value={roomDetails.roomType}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-3 items-center justify-between">
                        <label>Precio de la habitación :</label>
                        <input
                            className='py-2 px-2 rounded-md text-base w-[400px]'
                            type="text"
                            name="roomPrice"
                            value={roomDetails.roomPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex gap-3 items-center justify-between">
                        <label>Descripción de la habitación :</label>
                        <textarea
                            
                            className='py-2 px-2 rounded-md text-base w-[470px] resize-none'
                            name="roomDescription"
                            value={roomDetails.roomDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
                <div className='flex flex-col gap-3 col-span-1 items-end justify-end p-10'>
                    <button className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center" onClick={handleUpdate}>Actualizar <i className="fa-duotone fa-solid fa-pen-to-square"></i></button>
                    <button className="text-white px-4 py-2 bg-red-500 rounded-md hover:border-blue-400 hover:bg-red-400 transition-all duration-300 gap-2 flex items-center" onClick={handleDelete}>Eliminar <i className="fa-duotone fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>
    );
};

export default EditRoomPage;