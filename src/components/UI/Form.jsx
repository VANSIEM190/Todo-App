import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../services/firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Form = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const validationSchema = Yup.object({
    email: Yup.string()
      .matches(emailRegex, 'Adresse email invalide')  
      .required("L'email est requis"),
    password: Yup.string()
      .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
      .required('Le mot de passe est requis')
  });

  return (
    <div className="bg-gradient-to-r from-blue-300 to-gray-100 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-gray-900">
          Bienvenue ! <br />
          Connectez-vous à votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              await createUserWithEmailAndPassword(auth, values.email, values.password);
              navigate('/créer-une-tâche');
            } catch (error) {
              setError(error.message);
            }
          }}
        >
          {({ handleSubmit, handleChange, values, errors, touched }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                    value={values.email}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    aria-label="Email address"
                    aria-describedby="email-error"
                    aria-invalid={errors.email && touched.email ? "true" : "false"}
                  />
                  {errors.email && touched.email && (
                    <div id="email-error" className="text-red-500 text-sm" role="alert">
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={values.password}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    aria-label="Password"
                    aria-describedby="password-error"
                    aria-invalid={errors.password && touched.password ? "true" : "false"}
                  />
                  {errors.password && touched.password && (
                    <div id="password-error" className="text-red-500 text-sm" role="alert">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              {error && <div className="text-red-500 text-sm" role="alert">{error}</div>}

              <div>
                  <button
                  type="submit"
                  className="flex w-full justify-center rounded-md no-underline bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs cursor-pointer hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Se connecter
                </button>
              </div>
            </form>
          )}
        </Formik>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <span className="font-semibold text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </span>
        </p>
      </div>
    </div>
  );
};

export default Form;
