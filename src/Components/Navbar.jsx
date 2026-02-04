import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/image.png";
import MenuIcon from "@mui/icons-material/Menu";
import { safeStorageGet, safeStorageSet } from "../utils/safeStorage";
import UseAnimation from '../customhooks/TarunAnimation';

const LAST_ROUTE_KEY = "lastSelectedRoute";

const Navbar = () => {
  const [nav, setnav] = useState(true);
  const [restored, setRestored] = useState(false);

  const togglenav = () => { setnav(!nav) }

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const restoreRoute = async () => {
      const savedPath = await safeStorageGet(LAST_ROUTE_KEY);

      if (savedPath && savedPath !== location.pathname) {
        navigate(savedPath, { replace: true });
      }

      setRestored(true);
    };

    restoreRoute();
  }, []);


  // console.log(location, "location")

  useEffect(() => {
    if (!restored) return;

    safeStorageSet(LAST_ROUTE_KEY, location.pathname);
  }, [location.pathname, restored]);


  return (
    <>
      <header>
        <div className="flex h-20 items-center justify-center bg-blue-300 ">
          <button className='absolute top-4 left-4 w-12 text-black bg-white' onClick={togglenav}>
            <MenuIcon />
          </button>
          <img className='w-32 h-12 ml-0 rounded-xl' src={Logo} alt="Utility Box" />
        </div>

        <UseAnimation
          Component={<nav className="bg-gradient-to-b from-blue-300 to-white min-h-14 font-medium tab-enter">
            <ul className="flex flex-wrap justify-center gap-1">
              <li className="list-none">
                <NavLink to={"/"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Notepad</NavLink>
              </li>
              <li className="list-none">
                <NavLink to={"/colorpicker"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Color picker</NavLink>
              </li>
              <li className="list-none">
                <NavLink to={"/calender"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Calender</NavLink>
              </li>
              <li className="list-none">
                <NavLink to={"/regex"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Regex</NavLink>
              </li>
              <li className="list-none">
                <NavLink to={"/tools"} className="block px-4 py-3 text-black no-underline hover:bg-blue-200 rounded-xl">Tools</NavLink>
              </li>
            </ul>
          </nav>}
          duration={150}
          isshowComponent={nav}
          mountAnimationclass={"tab-enter"}
          unmountAnimationclass={"tab-exit"}
        />
      </header>
    </>
  );
};

export default Navbar;
