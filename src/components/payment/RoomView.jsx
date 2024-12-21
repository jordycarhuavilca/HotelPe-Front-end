function RoomView() {

  const room_description = sessionStorage.getItem("room_description") || "Sin Descripción";
  const roomPrice = sessionStorage.getItem("room_price") || "Sin Precio";
  const roomType = sessionStorage.getItem("room_type") || "Sin Tipo";
  const roomPeople = sessionStorage.getItem("room_people") || "Sin Gente";
  const user_name = sessionStorage.getItem("user_name") || "Sin Usuario";


  return (
    <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Room Information
      </h3>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Room Type:</p>
        <p className="mt-1 text-gray-900 font-semibold">{roomType} </p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Price:</p>
        <p className="mt-1 text-gray-900 font-semibold">{roomPrice}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Descripción</p>
        <p className="mt-1 text-gray-900">{room_description}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Usuario</p>
        <p className="mt-1 text-gray-900">{user_name}</p>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700">Personas</p>
        <p className="mt-1 text-gray-900">{roomPeople}</p>
      </div>
    </div>
  );
}

export default RoomView;
