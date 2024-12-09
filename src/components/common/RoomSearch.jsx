import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ApiService from '../../service/ApiService';
import PropTypes from 'prop-types';
import { Toaster, toast } from 'sonner'; // Importar Sonner

const RoomSearch = ({ handleSearchResult, isAbsolute }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [roomType, setRoomType] = useState('');
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error al buscar tipos de habitacion:', error.message);
      }
    };
    fetchRoomTypes();
  }, []);

  /**This methods is going to be used to show errors using Sonner */
  const showError = (message) => {
    toast.error(message, {
      className: 'bg-red-500 text-white p-4',
    }); 
  };

  /**This is going to be used to fetch available rooms from the database based on search data */
  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !roomType) {
      showError('Por favor selecciona todos los campos');
      return false;
    }
    try {
      const formattedStartDate = startDate ? startDate.toISOString().split('T')[0] : null;
      const formattedEndDate = endDate ? endDate.toISOString().split('T')[0] : null;

      const response = await ApiService.getAvailableRoomsByDateAndType(formattedStartDate, formattedEndDate, roomType);

      if (response.statusCode === 200) {
        if (response.roomList.length === 0) {
          showError('La habitación no está disponible actualmente para estas fechas en el tipo de habitación seleccionado');
          return;
        }
        handleSearchResult(response.roomList);
      }
    } catch (error) {
      showError("Ocurrió un error desconocido: " + error.response.data.message);
    }
  };

  return (
    <section className={isAbsolute ? 'absolute bottom-[-36px]' : ''}>
      <div className="bg-white flex flex-row py-4 px-4 gap-5 rounded-lg drop-shadow-md">
        <div className="flex items-center bg-[#F2F2F2] rounded-md px-2">
          <i className="fa-regular fa-calendar-days text-gray-400 text-base px-2"></i>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Fecha Check-In"
            className="py-2 px-2 bg-[#F2F2F2] rounded-md"
          />
        </div>
        <div className="flex items-center bg-[#F2F2F2] rounded-md px-2">
          <i className="fa-regular fa-calendar-days text-gray-400 text-base px-2"></i>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Fecha Check-Out"
            className="py-2 px-2 rounded-md bg-[#F2F2F2]"
          />
        </div>

        <div className="flex items-center bg-[#F2F2F2] rounded-md px-2">
          <i className="fa-solid fa-bed text-gray-400 text-base px-2"></i>
          <select
            className="py-2 px-2 rounded-md bg-[#F2F2F2] text-gray-400"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option disabled value="">
              Tipo de Habitación
            </option>
            {roomTypes.map((roomType) => (
              <option key={roomType} value={roomType}>
                {roomType}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-400 transition-all duration-300 text-white rounded-md py-1 px-8 text-base"
          onClick={handleInternalSearch}
        >
          Buscar
        </button>
      </div>
      <Toaster visibleToasts={4}/>
    </section>
  );
};

RoomSearch.propTypes = {
  handleSearchResult: PropTypes.func.isRequired,
  isAbsolute: PropTypes.bool.isRequired,
};

export default RoomSearch;
