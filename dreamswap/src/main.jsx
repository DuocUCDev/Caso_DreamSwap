import 'bootstrap/dist/css/bootstrap.min.css'

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import AppRouter from './routes/AppRouter.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App>
            <AppRouter />
        </App>
    </BrowserRouter>

)
