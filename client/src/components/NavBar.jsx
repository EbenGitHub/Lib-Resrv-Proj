import logo from '../assets/lib.webp'
import { Link, useLocation } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

const NavBar = ({token, setToken, setNot}) => {
  const location = useLocation()
  const client = useApolloClient()
  console.log(location.pathname)
    return ( 
        <nav className="z-20 p-3 border-gray-200 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 fixed w-screen">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link to='https://github.com/EbenGitHub' className="flex items-center">
              <img src={logo} className="h-6 mr-3 sm:h-10" alt="Library Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ላyብRaሪ</span>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <Link to='/'>Home</Link>
              </li>
              <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <Link to='/books'>Books</Link>
              </li>
              {
                !token ? <>
                          <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to='/login'>Login</Link>
                          </li>
                          <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to='/signup'>Signup</Link>
                          </li>
                        </> : <>
                          <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to='/reservations'>My Reservations</Link>
                          </li>
                          <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                            <Link to='/books' onClick={() => {
                              localStorage.removeItem('library-user-token')
                              setToken(null)
                              client.resetStore()
                              setNot({title: 'you are not logged in. Please log in to enjoy full features', status: 'warning', link: {title: 'click here to log in', anchor: '/login'}})
                            }}>Sign out</Link>
                          </li>
                        </>
              }
              <li className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <Link to='mailto:abenezergoo@gmail.com'>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     );
}
 
export default NavBar;