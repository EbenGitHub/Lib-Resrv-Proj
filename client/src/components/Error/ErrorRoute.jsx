import { useLocation, Link } from "react-router-dom";

const ErrorRoutes = () => {
    const { pathname } = useLocation()
    return ( 
        <div className="bg-blue-100 min-w-screen py-40 min-h-screen overflow-x-hidden flex flex-col items-center justify-center">
            <p className="text-sm">Oops! It seems like there is no match for <code className="text-gray-500 font-[900] bg-white px-3 rounded-lg animate-pulse mx-2">{pathname}</code>. <Link to='/books' className="underline font-[600]">Click here to go to books.</Link></p>
        </div>
     );
}
 
export default ErrorRoutes;