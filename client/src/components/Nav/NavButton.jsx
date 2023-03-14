import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

const NavButton = ({link, name, action, click, setVis}) => {
    const location = useLocation()
    const pathUrl = location.pathname
  
    return (<Link to={link} 
                className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-200 hover:text-gray-800 md:hover:bg-gray-200 md:p-2 
                    md:border-0 md:m-0 ${pathUrl === link && !action ? 'bg-gray-600 text-white' : 'text-gray-700'}`}>
    {
      !action ? <li onClick={() => setVis('0')}>{name}</li> : <button onClick={click}>{name}</button> 
    }
  </Link>)
  }

export default NavButton