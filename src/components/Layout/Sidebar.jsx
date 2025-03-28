import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useScroll from "../../hooks/useScroll";

const Sidebar = React.memo(({userEmail}) => {

  const [sidebar, setSidebar] = useState(false);
  const scrollSidebar = useScroll();

  return (
    <>
    <nav className={`w-screen flex justify-between items-center p-6 fixed top-0 z-10 
      ${scrollSidebar ? "bg-white shadow-sm shadow-neutral-300" : "bg-transparent shadow-none"} 
      transition-all duration-300 ease-in-out`}
      >
      <h3 className=" text-xl font-bold text-blue-600">Todo App</h3>
      <i className="fa fa-bars text-3xl" onClick={() => setSidebar(true)}></i>
    </nav>
    {sidebar && <aside className="bg-gray-800 text-gray-100 w-full h-screen fixed top-0 right-0 z-10 ">
      <div className="w-full flex justify-between items-center p-3">
        <h3 className="text-xl font-bold text-blue-600">Todo App</h3>
        <i className="fa fa-times text-3xl cursor-pointer" onClick={() => setSidebar(false)}></i>
      </div>
      <ul className="space-y-2 px-4 py-6">
        <Link to="/">
          <li className="cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-lg">Accueil</li>
        </Link>
        {userEmail &&
          <>
            <Link to="/mes-tâches">
              <li className="cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-lg">Mes Tâches</li>
            </Link>
            <Link to="/créer-une-tâche">
              <li className="cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-lg">Créer une tâche</li>
            </Link>
          </> 
        }
        <Link to="/à propos">
          <li className="cursor-pointer hover:bg-gray-700 px-4 py-2 rounded-lg">À propos</li>
        </Link>
      </ul>
      <div className="flex justify-center items-center gap-2 px-4 py-6">
        <i className="fab fa-github text-4xl cursor-pointer" ></i>
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            {userEmail ? (userEmail.split("@")[0]) : "tu es hors ligne"}
        </div>
        </div>
    </aside>}
    </>
  )
});

Sidebar.displayName = 'Sidebar';

Sidebar.propTypes = {
  userEmail: PropTypes.string,
}

export default Sidebar;