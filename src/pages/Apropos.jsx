import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <section className="min-h-screen  flex justify-center items-center bg-gray-100 py-12 px-6 text-center max-sm:min-h-screen">
      <div className="max-w-3xl mx-auto ">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">À propos de nous</h2>
        
        <p className="text-lg text-gray-600">
        Chez <span className="font-semibold text-blue-600">Todo App</span>,
        nous croyons que l&#39;organisation ne devrait pas être une corvée. Notre mission ? 
        Réinventer la gestion des tâches avec une interface fluide, des fonctionnalités intelligentes et une expérience utilisateur agréable. 
        Gagnez du temps, boostez votre productivité et reprenez le contrôle de votre planning ! 
        </p>

        <p className="mt-4 text-lg text-gray-600">
          Ajoutez vos tâches, cochez ce qui est fait, et avancez sereinement vers vos objectifs ! 🚀
        </p>

        <Link to="/">
        <button 
        type="button" 
        className="bg-blue-600 text-white p-4 rounded-2xl cursor-pointer 
      hover:bg-blue-400 transition-colors duration-300 mt-6
      ">
            Accueil
        </button>
    </Link>
      </div>
    </section>
    </>
  );
};

export default About;
