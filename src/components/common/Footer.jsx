import { NavLink } from 'react-router-dom';

const FooterComponent = () => {
    return (
        <footer className="w-full mt-auto">
            <div className="w-11/12 mx-auto max-w-7xl">
                <div className="w-full text-center py-5 flex flex-col gap-4">
                    <h3 className="text-3xl font-bold text-black">
                        Explora el mundo con HotelPe
                    </h3>
                    <p className="text-blue-500">
                        Descubre nuevos lugares y experiencias.
                    </p>
                </div>
                <div className="flex flex-row my-10 w-full items-start justify-between">
                    <div className="flex gap-1 items-center ">
                        <i className="fa-solid fa-hotel text-blue-500"></i><NavLink to="/home" className="text-lg">HotelPe</NavLink>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className="font-bold text-lg">Servicios</span>
                        <ul className='text-neutral-600'>
                            <li>Acerca de</li>
                            <li>Trabajos</li>
                            <li>Nuevos Cuartos</li>
                            <li>Publicidad</li>
                            <li>Contacto</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className="font-bold text-lg">Explore</span>
                        <ul className='text-neutral-600'>
                            <li>Perú</li>
                            <li>Lima</li>
                            <li>Trujillo</li>
                            <li>Callo</li>
                            <li>Arequipa</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className="font-bold text-lg">Terminos y Condiciones</span>
                        <ul className='text-neutral-600'>
                            <li>Politicas de Privacidad</li>
                            <li>Política de Cookies</li>
                            <li>Accesibilidades</li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <span className="font-bold text-lg">Soporte</span>
                        <ul className='text-neutral-600'>
                            <li>Soporte</li>
                            <li>Cancelar tu reserva</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-[#EBEBEB] text-right pr-14 py-2">
                <h3>
                   © Hotel Pe | 2024
                </h3>
            </div> 
        </footer>
    );
};

export default FooterComponent;