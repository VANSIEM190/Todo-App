import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rooter from './rooter'
import { BrowserRouter } from 'react-router-dom'
import './assets/icons/css/all.min.css';
import './styles/index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Rooter />
  </BrowserRouter>
  </StrictMode>,
)
