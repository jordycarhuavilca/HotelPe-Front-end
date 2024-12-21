import React, { useEffect, useState } from 'react'; 

function RoomView()  {


    const room_description = sessionStorage.getItem('room_description') || 'Sin Descripción';
    const roomPrice = sessionStorage.getItem('room_price') || 'Sin Precio';
    const roomType = sessionStorage.getItem('room_type') || 'Sin Tipo';

  
    return (
        <div class="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Room Information</h3>
    
        <div class="mb-4">
          <p class="text-sm font-medium text-gray-700">Room Type:</p>
          <p class="mt-1 text-gray-900 font-semibold">{roomType} </p>
        </div>
    
        <div class="mb-4">
          <p class="text-sm font-medium text-gray-700">Price:</p>
          <p class="mt-1 text-gray-900 font-semibold">{roomPrice}</p>
        </div>
    
        <div class="mb-4">
          <p class="text-sm font-medium text-gray-700">Descripción</p>
          <p class="mt-1 text-gray-900">
            {room_description}
          </p>
        </div>
      </div>
      );
}


export default RoomView;