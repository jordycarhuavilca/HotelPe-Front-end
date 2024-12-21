function RoomView() {
  const reservation =
    JSON.parse(localStorage.getItem("reservation")) || null;

  if (!reservation) {
    return;
  }



  return (
    <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Room Information
      </h3>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Room Type:</p>
        <p className="mt-1 text-gray-900 font-semibold">
          {reservation.room.roomType}{" "}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Precio total:</p>
        <p className="mt-1 text-gray-900 font-semibold">
          {reservation.totalPrice}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">
          Checkin date and Checkout date
        </p>
        <p className="mt-1 text-gray-900 font-semibold">
          {reservation.checkInDate} - {reservation.checkOutDate}
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Descripción</p>
        <p className="mt-1 text-gray-900">{reservation.room.roomDescription}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Cliente</p>
        <p className="mt-1 text-gray-900">{reservation.user.name}</p>
        <p className="mt-1 text-gray-900">{reservation.user.email}</p>
        <p className="mt-1 text-gray-900">{reservation.user.phoneNumber}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Personas</p>
        <p className="mt-1 text-gray-900">{reservation.numOfAdults}</p>
        <p className="mt-1 text-gray-900">{reservation.numOfChildren}</p>
        <p className="mt-1 text-gray-900">{reservation.totalGuests}</p>
      </div>
    </div>
  );
}

export default RoomView;
