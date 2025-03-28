import {useState , useEffect} from "react";

const useScroll = () =>{
    // État pour gérer le défilement
    const [scroll, setScroll] = useState(false);

    // Écouteur d'événements pour le défilement
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scroll;
}

export default useScroll;