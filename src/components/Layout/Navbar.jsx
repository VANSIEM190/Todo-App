import React  from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useScroll from "../../hooks/useScroll";


const Navbar = React.memo(({userEmail}) => {
    
  // État pour gérer le défilement
  const scroll = useScroll();

    return<>
    {/* Navigation */}
    <div className="w-screen flex items-center justify-center  max-sm:w-screen">
    <nav className={`w-screen flex justify-around items-center p-6   fixed top-0 z-10 
      ${scroll? "bg-white shadow-sm shadow-neutral-300 " : "bg-transparent shadow-none" } 
      shadow-md transition-all duration-300 ease-in-out `}
      >
        <h3 className="text-xl font-bold text-blue-600">Todo App</h3>
        <ul className="hidden  md:flex space-x-6 ">
          <Link to="/">
            <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Accueil</li>
          </Link>
          {userEmail &&
            <>
              <Link to="/mes-tâches">
                <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Mes Tâches</li>
              </Link>
              <Link to="/créer-une-tâche">
                <li className="text-gray-600 hover:text-gray-900 cursor-pointer">Créer une tâche</li>
              </Link>
            </> 
            }
          <Link to="/à propos">
            <li className="text-gray-600 hover:text-gray-900 cursor-pointer">À propos</li>
          </Link>
        </ul>
        <div className="flex justify-center itemes-center gap-2">
        <i className="fab fa-github text-4xl cursor-pointer"></i>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          {userEmail ? (userEmail.split("@")[0]) : "tu es hors ligne"}
        </button>
        </div>
      </nav>
      </div>
    </>
});

Navbar.displayName = 'Navbar';

Navbar.propTypes = {
  userEmail: PropTypes.string,
}




export default Navbar;