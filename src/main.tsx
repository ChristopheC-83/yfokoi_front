import { createRoot } from 'react-dom/client'
import './assets/style/main.css'
import './assets/style/custom.css'
import App from './App.tsx'
import 'flowbite';


createRoot(document.getElementById('root')!).render(
    <App />
)
