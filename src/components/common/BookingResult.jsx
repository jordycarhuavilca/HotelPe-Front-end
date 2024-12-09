import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookingResult = ({ bookingSearchResults }) => {
  return (
    <div className="booking-results">
      {bookingSearchResults.map((booking) => (
        <div key={booking.id} className="booking-result-item">
          <p>ID de habitación: {booking.roomId}</p>
          <p>ID de usuario: {booking.userId}</p>
          <p>Start Date: {booking.startDate}</p>
          <p>Fecha de finalización: {booking.endDate}</p>
          <p>Estado: {booking.status}</p>
          <Link to={`/admin/edit-booking/${booking.id}`} className="edit-link">Edit</Link>
        </div>
      ))}
    </div>
  );
};

BookingResult.propTypes = {
  bookingSearchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookingResult;