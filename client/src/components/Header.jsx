import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const linkStyle = {
    fontSize: '16px',
    color: '#FFFFFF',
    textDecoration: 'none', // Ensure no underline
    cursor: 'pointer', // Change cursor to pointer on hover
    hover: {
      textDecoration: 'underline', // Add underline on hover
    },

  };

  return (
    <header className='bg-pink-200 shadow-md' style={{ backgroundColor: '#F58F93' }}>
      <div className='flex justify-between items-center max-w-8xl mx-auto p-2'>
        
        <div style={{paddingTop: '20px',color:'white' }}>
        © 2024 StyleX - Pranit Kumbhar
        </div>
        
        <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center mx-auto'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <div style={{ paddingRight:15 }}>
          <ul className='flex gap-5' style={{paddingTop: '20px'}}>
            <Link to='/'>
              <li className='hidden sm:inline' style={linkStyle}>
                HOME
              </li>
            </Link>
            <Link to="/about">
              <li className='hidden sm:inline' style={linkStyle}>
                ABOUT
              </li>
            </Link>
            <Link to='/profile'>
              {currentUser ? (
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currentUser.avatar}
                  alt='profile'
                />
              ) : (
                <li className=' text-slate-700' style={linkStyle}> SIGN IN</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}
