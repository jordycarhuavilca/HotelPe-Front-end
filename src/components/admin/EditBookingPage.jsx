import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { toast } from "sonner";

const EditBookingPage = () => {
  const navigate = useNavigate();
  const { bookingCode } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);

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

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await ApiService.getBookingByConfirmationCode(
          bookingCode
        );
        setBookingDetails(response.booking);
      } catch (error) {
        showError(error.message);
      }
    };

    fetchBookingDetails();
  }, [bookingCode]);

  const acheiveBooking = async (bookingId) => {
    if (!window.confirm("¿Estás seguro de que quieres lograr esta reserva?")) {
      return;
    }

    try {
      const response = await ApiService.cancelBooking(bookingId);
      if (response.statusCode === 200) {
        showSuccess("La reserva se logró con éxito.");
        setTimeout(() => {
          navigate("/admin/manage-bookings");
        }, 3000);
      }
    } catch {
      showError("Ups! Hubo un error al lograr la reserva.");
    }
  };

  return (
    <div className="w-full bg-[#F2F2F2]">
      <div className="w-11/12 mx-auto max-w-7xl py-10">
        <h2 className="font-bold text-3xl">Detalle de la habitación</h2>

        {bookingDetails && (
          <div className="grid grid-cols-3 gap-5 mt-5">
            <div className="col-span-2 flex flex-col gap-6">
              <div className="flex flex-col shadow-sm">
                <div className="bg-blue-500 py-3 px-5 rounded-t-md flex items-center gap-3">
                  <i className="fa-solid fa-calendar-week text-white text-base"></i>
                  <h3 className=" text-white text-lg">Detalle de la reserva</h3>
                </div>
                <div className="bg-white py-4 px-5 rounded-b-md flex flex-col gap-1 text-neutral-700">
                  <p>
                    <span className="font-medium text-black">
                      Código de confirmación :
                    </span>{" "}
                    {bookingDetails.bookingConfirmationCode}
                  </p>
                  <p>
                    <span className="font-medium text-black">
                      Check-in Date :
                    </span>{" "}
                    {bookingDetails.checkInDate}
                  </p>
                  <p>
                    <span className="font-medium text-black">
                      Check-out Date :
                    </span>{" "}
                    {bookingDetails.checkOutDate}
                  </p>
                  <p>
                    <span className="font-medium text-black">
                      Número de adultos :
                    </span>{" "}
                    {bookingDetails.numOfAdults}
                  </p>
                  <p>
                    <span className="font-medium text-black">
                      Número de niños :
                    </span>{" "}
                    {bookingDetails.numOfChildren}
                  </p>
                </div>
              </div>

              <div className="flex flex-col shadow-sm">
                <div className="bg-blue-500 py-3 px-5 rounded-t-md flex items-center gap-3">
                  <i className="fa-solid fa-user text-white text-base"></i>
                  <h3 className=" text-white text-lg">Perfil del comprador</h3>
                </div>
                <div className="bg-white py-4 px-5 rounded-b-md flex flex-col gap-1 text-neutral-700">
                  <p>
                    <span className="font-medium text-black"> Nombres :</span>{" "}
                    {bookingDetails.user.name}
                  </p>
                  <p>
                    <span className="font-medium text-black"> Email :</span>{" "}
                    {bookingDetails.user.email}
                  </p>
                  <p>
                    <span className="font-medium text-black">
                      {" "}
                      Número de teléfono :
                    </span>{" "}
                    {bookingDetails.user.phoneNumber}
                  </p>
                </div>
              </div>

              <div className="flex flex-col shadow-sm">
                <div className="bg-blue-500 py-3 px-5 rounded-t-md flex items-center gap-3">
                  <i className="fa-solid fa-bed-front text-white text-base"></i>
                  <h3 className=" text-white text-lg">
                    Detalles de la habitación
                  </h3>
                </div>
                <div className="bg-white py-4 px-5 rounded-b-md flex flex-col gap-1 text-neutral-700">
                  <p>
                    <span className="font-medium text-black">
                      {" "}
                      Tipo de habitación :
                    </span>{" "}
                    {bookingDetails.room.roomType}
                  </p>
                  <p>
                    <span className="font-medium text-black">
                      {" "}
                      Precio de la habitación :
                    </span>{" "}
                    S/.{bookingDetails.room.roomPrice}
                  </p>
                  <p>
                    <span className="font-medium text-black">
                      {" "}
                      Descripción de la habitación :
                    </span>{" "}
                    {bookingDetails.room.roomDescription}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-1 self-start flex flex-col gap-6">
              <img
                className="w-full h-80 object-cover rounded-lg"
                src={bookingDetails.room.roomPhotoUrl}
                alt=""
                sizes=""
                srcSet=""
              />
              <button
                className="text-white px-4 py-2 border-2 bg-blue-500 border-blue-500 rounded-md hover:border-blue-400 hover:bg-blue-400 transition-all duration-300 gap-2 flex items-center justify-center"
                onClick={() => acheiveBooking(bookingDetails.id)}
              >
                Finalizar Reserva
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBookingPage;
