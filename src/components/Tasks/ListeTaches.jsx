import { useState, useEffect, useCallback } from "react";
import { db } from "../../services/firebaseConfig";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, where } from "firebase/firestore";

import { useAuth } from "../../context/AuthoContext";
import useResize from "../../hooks/useResize";
import Sidebar from "../../components/Layout/Sidebar";
import Navbar from "../../components/Layout/Navbar";

const ListeTaches = () => {
    // Récupération du contexte utilisateur
    const { userEmail } = useAuth();
    const sidebar = useResize();
    
    // État pour stocker les tâches
    const [taches, setTaches] = useState([]);

    // Récupération des tâches de l'utilisateur connecté
    useEffect(() => {
        if (!userEmail) return; 

        const q = query(
            collection(db, "taches"),
            where("userEmail", "==", userEmail),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tachesArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTaches(tachesArray);
        });

        return () => unsubscribe();
    }, [userEmail]);

    // Suppression d'une tâche
    const supprimerTache = useCallback(async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
            try {
                await deleteDoc(doc(db, "taches", id));
            } catch (error) {
                console.error("Erreur lors de la suppression :", error);
            }
        }
    }, []);

    // Fonction pour formater la date
    const formaterDate = (timestamp) => {
        if (!timestamp) return "Date inconnue";
        const date = timestamp.toDate();
        return date.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            {sidebar ? <Sidebar userEmail={userEmail} /> : <Navbar userEmail={userEmail} />}

            <div className="min-w-screen min-h-max p-6 mt-10">
                {["Travail", "Personnel", "Famille", "Autre"].map((cat) => {
                    const tachesFiltrees = taches.filter((t) => t.categorie === cat);

                    return (
                        <div key={cat} className="mt-6">
                            <h2 className="text-xl font-semibold">{cat}</h2>
                            <ul className="bg-white p-4 rounded-lg shadow-md">
                                {tachesFiltrees.length === 0 ? (
                                    <li className="text-gray-500">Aucune tâche</li>
                                ) : (
                                    tachesFiltrees.map((tache) => (
                                        <li key={tache.id} className="p-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <span className="font-semibold">{tache.tache}</span>
                                                    <span
                                                        className={`ml-2 text-sm ${
                                                            tache.priorite === "Haute"
                                                                ? "text-red-500"
                                                                : "text-gray-600"
                                                        }`}
                                                    >
                                                        ({tache.priorite})
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => supprimerTache(tache.id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-red-700"
                                                >
                                                    🗑️
                                                </button>
                                            </div>

                                            {/* Barre horizontale avec la date au centre */}
                                            <div className="relative my-4">
                                                <hr className="border-gray-300" />
                                                <span className="absolute left-1/2 top-0 -translate-x-1/2 bg-white px-2 text-sm text-gray-600 text-center">
                                                    {formaterDate(tache.createdAt)}
                                                </span>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListeTaches;
