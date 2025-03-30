import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { db } from "../../services/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import useResize from "../../hooks/useResize";
import { useAuth } from "../../context/AuthoContext";
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";

const CreerTache = () => {
    // États pour les messages de succès/erreur
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    // Récupération du contexte utilisateur
    const { userEmail } = useAuth();
    const sidebar = useResize();

    // Options du formulaire
    const categories = ["Travail", "Personnel", "Famille", "Autre"];
    const priorites = ["Haute", "Moyenne", "Basse"];

    // Validation du formulaire avec Yup
    const validationFormTache = Yup.object().shape({
        tache: Yup.string().required("⚠️ Veuillez remplir ce  champs !"),
        categorie: Yup.string().required("⚠️ Veuillez remplir ce  champs !"),
        priorite: Yup.string().required("⚠️ Veuillez remplir ce  champs !"),
    });


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            {sidebar ? <Sidebar userEmail={userEmail} /> : <Navbar userEmail={userEmail} />}

            <section className="text-center mt-20 px-6 py-2 w-screen">
                <h1 className="text-4xl font-bold">Créer une tâche</h1>

                <Formik
                    initialValues={{
                        tache: "",
                        categorie: "",
                        priorite: "",
                        date: "",
                    }}
                    validationSchema={validationFormTache}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            await addDoc(collection(db, "taches"), {
                                tache: values.tache,
                                categorie: values.categorie,
                                priorite: values.priorite,
                                complete: false,
                                createdAt: serverTimestamp(),
                                userEmail,
                            });

                            setMessage("✅ Tâche ajoutée avec succès !");
                            setSuccess(true);
                            resetForm();
                            navigate("/mes-tâches");
                        } catch (error) {
                            console.error(error);
                            setMessage("❌ Erreur lors de l'ajout de la tâche !");
                            setSuccess(false);
                        }
                    }}
                >
                    {({ handleSubmit, handleChange, values , errors , touched}) => (
                        <form className="mt-6 w-2/4 mx-auto max-sm:w-full" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="tache"
                                placeholder="Tâche"
                                value={values.tache}
                                onChange={handleChange}
                                className="border p-2 rounded-lg w-full"
                                aria-invalid={errors.tache && touched.tache ? "true" : "false"}
                            />
                            <p className="mt-4 text-red-600">{errors.tache}</p>
                            <select
                                name="categorie"
                                value={values.categorie}
                                onChange={handleChange}
                                className="border p-2 rounded-lg w-full mt-4"
                                aria-invalid={errors.categorie && touched.categorie ? "true" : "false"}
                            >
                                <option value="">Catégorie</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-4 text-red-600">{errors.categorie}</p>
                            <select
                                name="priorite"
                                value={values.priorite}
                                onChange={handleChange}
                                className="border p-2 rounded-lg w-full mt-4"
                                aria-invalid={errors.priorite && touched.priorite ? "true" : "false"}
                            >
                                <option value="">Priorité</option>
                                {priorites.map((prio, index) => (
                                    <option key={index} value={prio}>
                                        {prio}
                                    </option>
                                ))}
                            </select>
                            <p className="mt-4 text-red-600">{errors.priorite}</p>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-4 rounded-lg mt-6 cursor-pointer hover:bg-blue-700"
                            >
                                Ajouter la tâche
                            </button>
                        </form>
                    )}
                </Formik>
                {message && <p className={`mt-4 ${success ? "text-green-600" : "text-red-600"}`}>{message}</p>}
            </section>
        </div>
    );
};

export default CreerTache;
