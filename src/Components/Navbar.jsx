import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/images/image.png';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [nav, setnav] = useState(false)

  const togglenav = () => { setnav(!nav) }

  return (
    <>
      <header>
        <div className="flex h-20 items-center justify-center bg-blue-300 ">
          <button className='absolute top-4 left-4 w-12 text-black bg-white' onClick={togglenav}>
            <MenuIcon />
          </button>
          <img className='w-44 h-16 ml-0 rounded-xl' src={Logo} alt="Utility Box" />
        </div>
        {nav &&
          <nav className="bg-gradient-to-b from-blue-300 to-white min-h-16 font-medium smooth-entry">
            <ul className="flex flex-wrap justify-center gap-1">
              <li className="list-none">
                <NavLink to={"/"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Notepad</NavLink>
              </li>
              <li className="list-none">
                <NavLink to={"/todo"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Todo</NavLink>
              </li>
              {/* <li className="list-none">
                <NavLink to={"/tools"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Tools</NavLink>
              </li> */}
              {/* <li className="list-none">
                <NavLink to={"/imagesearch"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Image</NavLink>
              </li> */}
              <li className="list-none">
                <NavLink to={"/calculator"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Calculator</NavLink>
              </li>
              {/* <li className="list-none">
                <NavLink to={"/AlarmClock"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">AlarmClock</NavLink>
              </li> */}
              <li className="list-none">
                <NavLink to={"/currencyconverter"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Currency</NavLink>
              </li>
              {/* <li className="list-none">
                <NavLink to={"/weather"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Weather</NavLink>
              </li> */}
              <li className="list-none">
                <NavLink to={"/dictionary"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Dictionary</NavLink>
              </li>
            </ul>
          </nav>
        }
      </header>
    </>
  );
};

export default Navbar;
