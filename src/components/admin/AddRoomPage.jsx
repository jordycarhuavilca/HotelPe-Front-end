import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';


const AddRoomPage = () => {
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
    const [roomTypes, setRoomTypes] = useState([]);
    const [newRoomType, setNewRoomType] = useState(false);


    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const types = await ApiService.getRoomTypes();
                setRoomTypes(types);
            } catch (error) {
                console.error('Error al buscar tipos de habitaciones:', error.message);
            }
        };
        fetchRoomTypes();
    }, []);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoomDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleRoomTypeChange = (e) => {
        if (e.target.value === 'new') {
            setNewRoomType(true);
            setRoomDetails(prevState => ({ ...prevState, roomType: '' }));
        } else {
            setNewRoomType(false);
            setRoomDetails(prevState => ({ ...prevState, roomType: e.target.value }));
        }
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


    const addRoom = async () => {
        if (!roomDetails.roomType || !roomDetails.roomPrice || !roomDetails.roomDescription) {
            setError('Se deben proporcionar todos los detalles de la habitación.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        if (!window.confirm('¿Quieres añadir esta habitación?')) {
            return
        }

        try {
            const formData = new FormData();
            formData.append('roomType', roomDetails.roomType);
            formData.append('roomPrice', roomDetails.roomPrice);
            formData.append('roomDescription', roomDetails.roomDescription);

            if (file) {
                formData.append('photo', file);
            }

            const result = await ApiService.addRoom(formData);
            if (result.statusCode === 200) {
                setSuccess('Sala agregada exitosamente.');
                
                setTimeout(() => {
                    setSuccess('');
                    navigate('/admin/manage-rooms');
                }, 3000);
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div className="w-11/12 mx-auto max-w-7xl">
            <div className='w-1/2 m-auto bg-[#EBEBEB] rounded-lg p-10'>
                <h2 className='text-center text-3xl font-bold'>Agregar Habitacion</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="flex flex-col gap-5 pt-10">
                    <div className="flex flex-col gap-2">
                        {preview && (
                            <img src={preview} alt="Room Preview" className="room-photo-preview" />
                        )}
                         <label className="cursor-pointer w-full h-32 flex items-center justify-center border-2 border-dashed border-blue-300 rounded-lg hover:bg-gray-100 bg-white">
                            <input
                                type="file"
                                name="roomPhoto"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <span className="text-center text-gray-500">Subir foto 📷</span>
                        </label>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label>Tipo de habitación</label>
                        <select value={roomDetails.roomType} onChange={handleRoomTypeChange} className='py-2 px-2 rounded-md text-base w-full'>
                            <option value="">Selecciona un tipo de habitación</option>
                            {roomTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                            <option value="new">Otro (por favor especifique)</option>
                        </select>
                        {newRoomType && (
                            <input
                                className='py-2 px-2 rounded-md text-base w-full'
                                type="text"
                                name="roomType"
                                placeholder="Introduce un nuevo tipo de habitación"
                                value={roomDetails.roomType}
                                onChange={handleChange}
                            />
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Precio de la habitación :</label>
                        <input
                            className='py-2 px-2 rounded-md text-base'
                            type="number"
                            placeholder='5000'
                            name="roomPrice"
                            value={roomDetails.roomPrice}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label>Descripción de la habitación</label>
                        <textarea
                            rows="5"
                            className='py-2 px-2 rounded-md text-base resize-none'
                            name="roomDescription"
                            value={roomDetails.roomDescription}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <button className="text-white px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center justify-center" onClick={addRoom}>Guardar <i className="fa-duotone fa-solid fa-floppy-disk"></i></button>
                </div>
            </div>
        </div>
    );
};

export default AddRoomPage;