import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';
import RoomResult from '../common/RoomResult';

const ManageRoomPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await ApiService.getAllRooms();
        const allRooms = response.roomList;
        setRooms(allRooms);
        setFilteredRooms(allRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error.message);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const types = await ApiService.getRoomTypes();
        setRoomTypes(types);
      } catch (error) {
        console.error('Error fetching room types:', error.message);
      }
    };

    fetchRooms();
    fetchRoomTypes();
  }, []);

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
    filterRooms(e.target.value);
  };

  const filterRooms = (type) => {
    if (type === '') {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.roomType === type);
      setFilteredRooms(filtered);
    }
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='w-11/12 mx-auto max-w-7xl'>
      <h2 className='font-bold text-2xl'>Habitaciones</h2>
      <div>
        <div className='w-full flex justify-between mt-5'>
          <div className='px-4 py-2  rounded-md gap-2 flex items-center'>
            <label className=''>Filtrar por tipo de habitación:</label>
            <select value={selectedRoomType} onChange={handleRoomTypeChange} className='rounded px-2 bg-blue-500 text-white'>
                <option value="">Todos</option>
                {roomTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>
          <button className='text-white px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center' onClick={() => navigate('/admin/add-room')}>
            Agregar <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <RoomResult roomSearchResults={currentRooms} />

      <Pagination
        roomsPerPage={roomsPerPage}
        totalRooms={filteredRooms.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default ManageRoomPage;