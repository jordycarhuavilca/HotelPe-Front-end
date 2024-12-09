import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import Pagination from '../common/Pagination';

const ManageBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [bookingsPerPage] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await ApiService.getAllBookings();
                const allBookings = response.bookingList;
                setBookings(allBookings);
                setFilteredBookings(allBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error.message);
            }
        };

        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings(searchTerm);
    }, [searchTerm, bookings]);

    const filterBookings = (term) => {
        if (term === '') {
            setFilteredBookings(bookings);
        } else {
            const filtered = bookings.filter((booking) =>
                booking.bookingConfirmationCode && booking.bookingConfirmationCode.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredBookings(filtered);
        }
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='w-11/12 mx-auto max-w-7xl'>
            <div className='my-10 flex flex-col gap-4'>
            <h2 className='font-bold text-2xl'>Todas las reservas</h2>
            <div className='flex items-center gap-2'>
                <label>Filtrar por número de reserva:</label>
                <input
                className='w-[250px] bg-[#F2F2F2] p-2 rounded'
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Ingrese el código de reserva"
                />
            </div>
            </div>
        
            <div className="w-[70%] m-auto grid grid-cols-2 gap-10">
                {currentBookings.map((booking) => (
                    <div key={booking.id} className="bg-[#F2F2F2] p-5 rounded-lg">
                        <p><strong>Código de reserva:</strong> {booking.bookingConfirmationCode}</p>
                        <p><strong>Check In :</strong> {booking.checkInDate}</p>
                        <p><strong>Check out :</strong> {booking.checkOutDate}</p>
                        <p><strong>Invitados totales:</strong> {booking.totalNumOfGuest}</p>
                        <button
                            className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center mt-3"
                            onClick={() => navigate(`/admin/edit-booking/${booking.bookingConfirmationCode}`)}
                        >Gestionar reserva</button>
                    </div>
                ))}
            </div>

            <Pagination
                roomsPerPage={bookingsPerPage}
                totalRooms={filteredBookings.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default ManageBookingsPage;