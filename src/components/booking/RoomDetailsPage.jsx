import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import DatePicker from "react-datepicker";
import { toast } from "sonner";

const RoomDetailsPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1); // State variable for number of adults
  const [numChildren, setNumChildren] = useState(0); // State variable for number of children
  const [totalPrice, setTotalPrice] = useState(0); // State variable for total booking price
  const [totalGuests, setTotalGuests] = useState(1); // State variable for total number of guests
  const [showDatePicker, setShowDatePicker] = useState(false); // State variable to control date picker visibility
  const [userId, setUserId] = useState(""); // Set user id
  const [confirmationCode, setConfirmationCode] = useState(""); // State variable for booking confirmation code

  const formattedCheckInDate = new Date(
    checkInDate.getTime() - checkOutDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
  const formattedCheckOutDate = new Date(
    checkOutDate.getTime() - checkOutDate.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await ApiService.getRoomById(roomId);
        setRoomDetails(response.room);
        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching or error
      }
    };
    fetchData();
  }, [roomId]); // Re-run effect when roomId changes

  const showError = (message) => {
    toast.error(message, {
      className: "bg-red-500 text-white p-4",
    });
  };

  const showSuccess = (message) => {
    toast.success(message, {
      className: "bg-green-500 text-white p-4",
    });
  };

  const handleConfirmBooking = async () => {
    // Check if check-in and check-out dates are selected
    if (!checkInDate || !checkOutDate) {
      showError("Por favor seleccione las fechas de entrada y salida.");
      return;
    }

    //Comprueba si el número de adultos y niños es válido
    if (
      isNaN(numAdults) ||
      numAdults < 1 ||
      isNaN(numChildren) ||
      numChildren < 0
    ) {
      showError("Por favor ingrese números válidos para adultos y niños.");
      return;
    }

    // Calculate total number of days
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    // Calculate total number of guests
    const totalGuests = numAdults + numChildren;

    // Calculate total price
    const roomPricePerNight = roomDetails.roomPrice;
    const totalPrice = roomPricePerNight * totalDays;

    setTotalPrice(totalPrice);
    setTotalGuests(totalGuests);
  };

  const acceptBooking = async () => {
    setIsLoadingButton(true);
    try {
      // Ensure checkInDate and checkOutDate are Date objects
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      // Log the original dates for debugging
      console.log("Original Check-in Date:", startDate);
      console.log("Original Check-out Date:", endDate);

      // Convert dates to YYYY-MM-DD format, adjusting for time zone differences
      const formattedCheckInDate = new Date(
        startDate.getTime() - startDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];
      const formattedCheckOutDate = new Date(
        endDate.getTime() - endDate.getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      // Log the original dates for debugging
      console.log("Formated Check-in Date:", formattedCheckInDate);
      console.log("Formated Check-out Date:", formattedCheckOutDate);

      // Create booking object
      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numOfAdults: numAdults,
        numOfChildren: numChildren,
      };
      console.log(booking);
      console.log(checkOutDate);

      // Make booking
      const response = await ApiService.bookRoom(roomId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
        showSuccess(`¡Reserva exitosa!${confirmationCode}.`);
        // Hide message and navigate to homepage after 5 seconds
        setTimeout(() => {
          navigate("/rooms");
        }, 5000);
      }
    } catch {
      showError("Ups! Hubo un error al reservar la habitación.");
    } finally {
      setIsLoadingButton(false);
    }
  };

  if (isLoading) {
    return (
      <p className="room-detail-loading">
        Cargando detalles de la habitación...
      </p>
    );
  }

  if (error) {
    return <p className="room-detail-loading">{error}</p>;
  }

  if (!roomDetails) {
    return <p className="room-detail-loading">Habitación no encontrada.</p>;
  }

  const { roomType, roomPrice, roomPhotoUrl, description, bookings } =
    roomDetails;

    const handleRoomSelection = (booking) => {
      sessionStorage.setItem('selectedRoomId', roomId);
      sessionStorage.setItem('room_price', roomPrice);
      sessionStorage.setItem('room_description', description);
      sessionStorage.setItem('room_type', roomType);
      sessionStorage.setItem('checkIn', formattedCheckInDate);
      sessionStorage.setItem('checkOut', formattedCheckOutDate);

      navigate(`/cardPayment`);
  };

  return (
    <div className="mt-5 w-11/12 mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold text-center">
        Detalles de la habitación
      </h2>
      <br />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="">
            <h3 className="text-2xl font-bold text-center">{roomType}</h3>
            <p className="text-base  text-center">
              Precio: S/{roomPrice} por noche
            </p>
            <p>{description}</p>
          </div>
          {bookings && bookings.length > 0 && (
            <div className="bg-[#EBEBEB] rounded-2xl py-8 px-8 my-10 flex flex-col gap-4">
              <h3 className="font-bold">Detalles de las reservas existentes</h3>
              <ul className="list-none flex flex-col gap-4">
                {bookings.map((booking, index) => (
                  <li key={booking.id} className="flex flex-col justify-center">
                    <span className="booking-number font-bold">
                      Reserva {index + 1} :
                    </span>
                    <span className="booking-text">
                      Check-in: {booking.checkInDate}{" "}
                    </span>
                    <span className="booking-text">
                      Chech-Out: {booking.checkOutDate}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col gap-3 justify-center my-6">
            <div className="flex gap-3 items-center justify-center">
              <button
                className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center"
                onClick={() => setShowDatePicker(true)}
              >
                Reserva ahora{" "}
                <i className="fa-solid fa-cart-flatbed-suitcase"></i>
              </button>
              <button
                className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center"
                onClick={() => setShowDatePicker(false)}
              >
                Volver{" "}
                <i className="fa-duotone fa-solid fa-arrow-turn-left"></i>
              </button>
            </div>

            {showDatePicker && (
              <div className="flex flex-col gap-6 items-center justify-center">
                <div className="flex gap-3 items-center justify-center mt-4">
                  <div className="flex flex-col gap-2 items-center">
                    <span>Check-in:</span>
                    <DatePicker
                      className="py-2 px-2 bg-[#F2F2F2] rounded-md"
                      selected={checkInDate}
                      onChange={(date) => setCheckInDate(date)}
                      selectsStart
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      placeholderText="Check-in Date"
                      dateFormat="dd/MM/yyyy"
                      // dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <span>Check-out:</span>
                    <DatePicker
                      className="py-2 px-2 bg-[#F2F2F2] rounded-md"
                      selected={checkOutDate}
                      onChange={(date) => setCheckOutDate(date)}
                      selectsEnd
                      startDate={checkInDate}
                      endDate={checkOutDate}
                      minDate={checkInDate}
                      placeholderText="Check-out Date"
                      // dateFormat="yyyy-MM-dd"
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-2 items-center">
                    <label>Adultos:</label>
                    <input
                      className="py-2 px-2 rounded-md text-base bg-[#F2F2F2]"
                      type="number"
                      min="1"
                      value={numAdults}
                      onChange={(e) => setNumAdults(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <label>Niños:</label>
                    <input
                      className="w-full py-2 px-2 rounded-md text-base bg-[#F2F2F2]"
                      type="number"
                      min="0"
                      value={numChildren}
                      onChange={(e) => setNumChildren(parseInt(e.target.value))}
                    />
                  </div>
                  <button
                    className="text-white px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center justify-center"
                    onClick={handleConfirmBooking}
                  >
                    Ver precio
                  </button>
                </div>
              </div>
            )}
            {totalPrice > 0 && (
              <div className="flex  gap-3 justify-center items-center my-6">
                <p>
                  <b>Precio Total:</b> S/.{totalPrice}
                </p>
                <p>
                  <b>Invitados totales:</b> {totalGuests}
                </p>
                <button
                   onClick={() => handleRoomSelection()} 
                >
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <img
            src={roomPhotoUrl}
            alt={roomType}
            className="w-full rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
