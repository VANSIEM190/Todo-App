import { Link } from "react-router-dom"; 
import { useAuth } from "../context/AuthoContext";
import useResize from "../hooks/useResize";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import LoadingPage from "../components/UI/LoadingPage";

const LandingPage = () => {
    const { userEmail, loading } = useAuth(); 
    const sidebar = useResize();

    if (loading) return <LoadingPage />;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            {sidebar ? <Sidebar userEmail={userEmail}/> : <Navbar  userEmail={userEmail}/>}
            <section className="text-center mt-10 px-6">
                <h1 className="text-4xl font-bold">
                    Gérez vos priorités avec <span className="text-blue-600">simplicité et efficacité</span>
                </h1>
                <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                    Notre application vous permet de gérer vos tâches quotidiennes de manière simple et efficace.
                </p>
                <div className="mt-6">
                    <Link to={userEmail ? "/créer-une-tâche" : "/se-connecter"}>
                        <button className="bg-black text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-gray-800">
                            Commencer
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
