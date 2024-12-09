import RoomTopDetails from "./RoomTopDetails";

function RoomTop() {
  return (
    <>
      <div className="w-11/12 mx-auto lg:max-w-7xl">
        <h2 className="pt-10 pb-3 font-bold text-2xl text-black">
          Habitaciones Top
        </h2>
      </div>

      {/* HOTELES TOP SECTION */}
      <section className="w-11/12 mx-auto lg:max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-4 mb-10">
        <RoomTopDetails />
        <div className="relative w-full rounded-lg overflow-hidden">
          <img
            src="https://www.swissotel.com/assets/0/92/2119/2178/2217/2219/6442451722/83eb355a-2f1c-49d8-ad51-1ccce3b52b33.jpg"
            alt="Suite Presidencial"
            className="w-full h-60 object-cover rounded-lg"
          />
          <p className="mt-4 font-semibold text-black">Suite Presidencial</p>
          <p className="font-light text-sm text-gray-700"> 2 Propiedades</p>
        </div>
        <div className="relative w-full rounded-lg overflow-hidden">
          <img
            src="https://phantom-elmundo.unidadeditorial.es/6b342c0ccdfebb27bbeb8bae85a845a6/resize/640/assets/multimedia/imagenes/2020/01/24/15798594800100.jpg"
            alt="Penthouse"
            className="w-full h-60 object-cover rounded-lg"
          />
          <p className="mt-4 font-semibold text-black">Penthouse</p>
          <p className="font-light text-sm text-gray-700"> 3 Propiedades</p>
        </div>
      </section>
    </>
  );
}

export default RoomTop;
