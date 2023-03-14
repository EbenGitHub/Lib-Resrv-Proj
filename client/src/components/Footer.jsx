import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <div className="bg-blue-100 fixed bottom-0 w-screen px-8">
            <Link to='https://github.com/EbenGitHub' className="text-sm">© Copyright reserverd with MIT License. ALX-Holberton 2023. Ebenezer Eshetie.</Link>
        </div>
     );
}
 
export default Footer;