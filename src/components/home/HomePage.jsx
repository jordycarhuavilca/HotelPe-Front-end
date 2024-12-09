import { useState } from "react";
import RoomResult from "../common/RoomResult";
import RoomSearch from "../common/RoomSearch";
import Banner from "../../assets/img/banner.webp"
import BannerApp from "../../assets/img/bannerapp.webp"
import AppFoto from "../../assets/img/app-foto.webp"
import RoomTop from "./RoomTop";

const HomePage = () => {

    const [roomSearchResults, setRoomSearchResults] = useState([]);

    // Function to handle search results
    const handleSearchResult = (results) => {
        setRoomSearchResults(results);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center">
            {/* HEADER / BANNER ROOM SECTION */}
            
                <header className="relative w-11/12 max-w-7xl h-[500px] flex items-center justify-center mb-20">
                    <img src={Banner} alt="Banner" className="absolute inset-0 w-full h-full object-cover rounded-md" />
                    <div className="relative z-10 text-center text-white">
                        <h1 className="text-white text-4xl font-bold">
                            Disfrute de las vacaciones de sus sueños
                        </h1>
                        <p className="text-white text-lg font-light">Planifique y reserve una Habitacion perfecta para su vacaciones</p>
                    </div>
                    <RoomSearch handleSearchResult={handleSearchResult} isAbsolute={true} />
                </header>

            {/* SEARCH/FIND AVAILABLE ROOM SECTION */}
            
            <RoomResult roomSearchResults={roomSearchResults} />

            <div className="w-11/12 mx-auto max-w-7xl mt-10">
                <h4><a className="font-bold text-2xl text-blue-500" href="/rooms">Todas Las Habitaciones</a></h4>
                <h3 className="md:w-3/5 sm:w-full">Planifique y reserve nuestro viaje perfecto con asesoramiento de expertos, sugerencias de viaje, información sobre destinos e inspiración nuestra</h3>

                <h2 className="pt-10 pb-3 font-bold text-2xl text-black">Nuestras Sedes</h2>
            </div>

            

            {/* SEDES SECTION */}
            <section className="w-11/12 mx-auto max-w-7xl flex md:flex-row flex-col gap-4 mb-4">
            <div className="relative w-full max-w-sm rounded-lg overflow-hidden">
                <img 
                    src="https://www.laencontre.com.pe/noticias/wp-content/uploads/2020/02/distrito-molino-1024x576.jpg"
                    alt="Distrito Molino"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-4 font-medium text-gray-700">Distrito Molino</p>
                <p className="font-light text-sm text-gray-700"> 1 Propiedades</p>
            </div>
            <div className="relative w-full max-w-sm rounded-lg overflow-hidden">
                <img 
                    src="https://urbania.pe/blog/wp-content/uploads/2019/02/lima_subdistritos_exclusivos.jpg" 
                    alt="Distrito San Isidro"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-4 font-medium text-gray-700">Distrito San Isidro</p>
                <p className="font-light text-sm text-gray-700"> 4 Propiedades</p>
            </div>
            <div className="relative w-full max-w-sm rounded-lg overflow-hidden">
                <img 
                    src="https://viajes.nationalgeographic.com.es/medio/2019/11/06/barranco2_0dcce855_1200x630.jpg" 
                    alt="Distrito Barranco"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <p className="mt-4   font-medium text-gray-700">Distrito Barranco</p>
                <p className="font-light text-sm text-gray-700"> 2 Propiedades</p>
            </div>
            <div className="relative w-full max-w-sm rounded-lg overflow-hidden">
                <img 
                    src="https://www.miraflores.gob.pe/wp-content/uploads/2020/12/PSPXS3WNBNAPVDYFZ7GMEO5RA4.jpg" 
                    alt="Distrito Miraflores"
                    className="w-full h-48 object-cover rounded-lg"
                />
                    <p className="mt-4 font-medium text-gray-700">Distrito Miraflores</p>
                    <p className="font-light text-sm text-gray-700"> 3 Propiedades</p>
                </div>
            </section>


            <div className="w-11/12 mx-auto max-w-7xl mt-5">
                <h2 className="pt-10 pb-3 font-bold text-2xl text-black">Servicios de HotelPe</h2>
            </div>

            {/* SERVICES SECTION */}
            <section className="w-11/12 mx-auto max-w-7xl flex md:flex-row flex-col gap-4 mb-5">
            
                <div className="relative w-full max-w-sm rounded-lg shadow-lg overflow-hidden">
                    <img 
                        src="https://branatech.com/wp-content/uploads/2019/09/terminal-air-conditioner-min.jpg" 
                        alt=""
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-[#00000050] h-full px-4 py-4 flex flex-col justify-end">
                        <h2 className="text-white text-lg font-semibold">
                            Aire Acondicionado
                        </h2>
                        <p className="text-white text-sm">
                            Relájate con aire acondicionado ajustable para tu confort en todo momento.
                        </p>
                    </div>

                </div>
                <div className="relative w-full max-w-sm rounded-lg shadow-lg overflow-hidden">
                    <img 
                        src="https://www.preferente.com/wp-content/uploads/2020/05/image_content_20025794_20180828185409.jpg" 
                        alt=""
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-[#00000050] h-full px-4 py-4 flex flex-col justify-end">
                        <h2 className="text-white text-lg font-semibold">
                            Mini Bar
                        </h2>
                        <p className="text-white text-sm">
                            Disfruta de bebidas y snacks gratuitos del mini bar en tu habitación.
                        </p>
                    </div>
                </div>
                <div className="relative w-full max-w-sm rounded-lg shadow-lg overflow-hidden">
                    <img 
                        src="https://www.adslzone.net/app/uploads-adslzone.net/2017/08/wifi-hotel.jpg" 
                        alt=""
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-[#00000050] h-full px-4 py-4 flex flex-col justify-end">
                        <h2 className="text-white text-lg font-semibold">
                            Wi-Fi
                        </h2>
                        <p className="text-white text-sm">
                            Wi-Fi de alta velocidad gratuito en todas las habitaciones y áreas públicas.
                        </p>
                    </div>
                </div>
                <div className="relative w-full max-w-sm rounded-lg shadow-lg overflow-hidden">
                    <img 
                        src="https://media-cdn.tripadvisor.com/media/photo-s/14/e9/8a/08/aparcamiento-interior.jpg" 
                        alt=""
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-[#00000050] h-full px-4 py-4 flex flex-col justify-end">
                        <h2 className="text-white text-lg font-semibold">
                            Parking
                        </h2>
                        <p className="text-white text-sm">
                        Aprovecha el estacionamiento gratuito disponible para todos los huéspedes.
                        </p>
                    </div>
                </div>
            </section>

            <RoomTop />

            {/* AVAILABLE ROOMS SECTION */}
               
            <section className="relative w-11/12 max-w-7xl h-[280px] flex items-center justify-start px-16 mb-10">
                <img src={BannerApp} alt="Banner" className="absolute inset-0 w-full h-full object-cover rounded-md" />
                <div className="z-10">
                    <h3 className="text-white text-2xl font-semibold w-1/2 mb-10">
                    Descargue la aplicación móvil para obtener cupones de bonificación y códigos de viaje.
                    </h3>
                    <a href="" className="bg-blue-500 z-20 px-5 py-3 text-white rounded-md hover:bg-blue-400 transition-all duration-300">Descargar App Mobile</a>
                </div>
                <img src={AppFoto} alt="App" className="absolute  object-contain right-0" />
            </section>
        </div>
    );
}

export default HomePage;