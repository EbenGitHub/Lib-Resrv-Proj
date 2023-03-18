import logo from '../assets/lib.webp'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSignout } from '../hooks/useSignout';
import NavButton from './Nav/NavButton';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const authentication = useSelector(state => state.authentication)
  const signout = useSignout()
  const [vis, setVis] = useState('0')

  let oldScrollY = 0;

const [direction, setDirection] = useState('up');

const controlDirection = () => {
    if((window.scrollY > oldScrollY && window.scrollY - oldScrollY > 25) && (window.scrollY > 50)) {
        setDirection('down');
        oldScrollY = window.scrollY;
    } else if ((window.scrollY < oldScrollY && window.scrollY - oldScrollY < 25)) {
        setDirection('up');
        oldScrollY = window.scrollY;
    }
    
}

useEffect(() => {
    window.addEventListener('scroll', controlDirection);
    return () => {
        window.removeEventListener('scroll', controlDirection);
    };
},[window]) // eslint-disable-line

    if (direction === 'down') return <nav className="z-20 p-3 m-2 rounded-full bg-gray-100 fixed"><img src={logo} className="h-6 sm:h-10" alt="Library Logo" onClick={() => setDirection('up')} /></nav>

    return ( 
        <nav className="z-20 p-3 border-gray-200 rounded bg-gray-50 fixed w-screen">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to='https://github.com/EbenGitHub' className="flex items-center">
              <img src={logo} className="h-6 mr-3 sm:h-10" alt="Library Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap">ላyብRaሪ</span>
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={() => vis === '0' ? setVis('auto'): setVis('0')}>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className="w-full md:block md:w-auto h-0 md:h-auto" id="navbar-solid-bg">
          <ul className={`flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent md:h-auto h-${vis} md:mr-0 mr-4 overflow-hidden`}>
            <NavButton setVis={setVis} link='/' name='Home' />
            <NavButton setVis={setVis} link='/books' name='Books' />
            {
              !authentication ? <>
                          <NavButton setVis={setVis} link='/login' name='Login' />
                          <NavButton setVis={setVis} link='/signup' name='Signup' />
                      </> : <>
                          <NavButton setVis={setVis} link='/reservations' name='My Reservations' />
                          <NavButton setVis={setVis} link='/books' name='Sign out' click={signout} action />
                      </>
            }
            <NavButton setVis={setVis} link='mailto:abenezergoo@gmail.com' name='Contact' />
          </ul>
            
          </div>
        </div>
      </nav>
     );
}
 
export default NavBar;