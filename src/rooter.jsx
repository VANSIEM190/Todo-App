import {Routes,Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthoContext";
import { lazy , Suspense } from "react";
const App = lazy(()=>import("./pages/Landingpage"));
const Form = lazy(()=>import("./components/UI/Form"));
const LoadingPage = lazy(()=>import("./components/UI/LoadingPage"));
const Apropos = lazy(()=>import("./pages/Apropos"));
const Creertache = lazy(()=>import("./components/Tasks/CreerTache"));
const ListeTaches = lazy(()=>import("./components/Tasks/ListeTaches"));
const ErrorPage = lazy(()=> import('./pages/ErrorPage'))

function Rooter (){
  return <>
    <Suspense fallback={
      <LoadingPage/>
    }>
      <AuthProvider>
      <Routes>
        <Route path="/" element={< App/>}/>
        <Route path="/se-connecter" element={< Form/>}/>
        <Route path="/à propos" element={< Apropos/>}/>
        <Route path="/mes-tâches" element={< ListeTaches/>}/>
        <Route path="/créer-une-tâche" element={< Creertache/>}/>
        <Route path="/*" element={< ErrorPage/>}/>
    </Routes>
      </AuthProvider>
    
    </Suspense>
  </>
}

export default Rooter;
