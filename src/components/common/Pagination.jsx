import PropTypes from 'prop-types';

const Pagination = ({ roomsPerPage, totalRooms, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='w-full flex justify-center my-10 gap-5'>
      <ul className="list-none flex justify-center gap-2">
        {pageNumbers.map((number) => (
          <li key={number} className="">
            <button onClick={() => paginate(number)} className={`text-white bg-blue-500 w-10 h-10 rounded-md flex items-center justify-center ${currentPage === number ? 'current-page' : ''}`}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Pagination.propTypes  = {
  roomsPerPage: PropTypes.number.isRequired,
  totalRooms: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;