import { useState } from "react";
import ApiService from "../../service/ApiService";
import { toast } from "sonner"; // Importar Sonner

const FindBookingPage = () => {
  const [confirmationCode, setConfirmationCode] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(true);

  const showError = (message) => {
    toast.error(message, {
      className: "bg-red-500 text-white p-4",
    });
  };

  const handleSearch = async () => {
    if (!confirmationCode.trim()) {
      showError("Por favor introduzca un código de confirmación de reserva");
      setTimeout(() => setError(""), 5000);
      setShowMessage(false);
      return;
    }

    setShowMessage(false);
    try {
      // Call API to get booking details
      const response = await ApiService.getBookingByConfirmationCode(
        confirmationCode
      );
      setBookingDetails(response.booking);
      setError(null); // Clear error if successful
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="w-11/12 mx-auto max-w-7xl ">
      <section className="relative w-full max-w-7xl h-[250px] flex items-center justify-center px-16">
        <img
          src="https://images-ext-1.discordapp.net/external/mSam0orlxx8PNLpvh0FpCZIqyn57mU9xWwWvvND2SXA/https/s3.us-east-1.amazonaws.com/ca-webprod/media/hoteles-en-miraflores-5-estrellas.webp?format=webp&width=1025&height=356"
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover rounded-md"
        />
        <div className="z-10">
          <h1 className="text-white text-4xl font-semibold">MIS RESERVAS</h1>
        </div>
      </section>
      <div className="flex flex-row items-center justify-center my-6 gap-3">
        <input
          required
          type="text"
          placeholder="Codigo de reserva"
          value={confirmationCode}
          onChange={(e) => setConfirmationCode(e.target.value)}
          className="py-2 px-3 rounded-md bg-[#F2F2F2] text-base"
        />
        <button
          className="bg-blue-500 text-white rounded-md py-2 px-6 text-base"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      {showMessage && (
        <div className="w-11/12 h-96 m-auto bg-[#F4F4F4] rounded-md grid grid-cols-3 gap-4 p-4 mb-10">
          <div className="col-span-1 flex items-center justify-center">
            <img
              src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
              alt=""
              className="w-1/2"
            />
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-black text-2xl font-bold">
              Introduce un codigo de reserva válido
            </p>
          </div>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
      {bookingDetails && (
        <div className="booking-details mb-10">
          <div className="grid grid-cols-3 w-full">
            <div>
              <h3 className="font-bold">Detalles de la reserva</h3>
              <p>
                Código de confirmación: {bookingDetails.bookingConfirmationCode}
              </p>
              <p>Check-in Día: {bookingDetails.checkInDate}</p>
              <p>Check-out Día: {bookingDetails.checkOutDate}</p>
              <p>Número de adultos: {bookingDetails.numOfAdults}</p>
              <p>Número de niños: {bookingDetails.numOfChildren}</p>
            </div>
            <div>
              <h3 className="font-bold">Detalles de la reserva</h3>
              <div>
                <p> Nombres: {bookingDetails.user.name}</p>
                <p> Email: {bookingDetails.user.email}</p>
                <p> Número de teléfono: {bookingDetails.user.phoneNumber}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold">Detalles de la habitación</h3>
              <p> Tipo de habitación: {bookingDetails.room.roomType}</p>
              <img
                src={bookingDetails.room.roomPhotoUrl}
                alt=""
                sizes=""
                srcSet=""
                className=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindBookingPage;
