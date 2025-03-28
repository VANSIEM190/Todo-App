import { useState, useEffect } from "react";

const useResize = () =>{
const [taille, setTaille] = useState(window.innerWidth);
    const [sidebar, setSidebar] = useState(taille < 775);

    useEffect(() => {
        const handleResize = () => {
        const tailleInitiale = 775;
            setTaille(window.innerWidth);
            setSidebar(window.innerWidth < tailleInitiale);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return sidebar;
}

export default useResize;