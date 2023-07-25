import { BrowserRouter, Routes, Route} from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthProvider';
import { TareasProvider } from './context/TareasProvider';

//Publicas
import AuthLayout from './layout/AuthLayout';
import Login from './paginasPublicas/Login';
import Registrar from './paginasPublicas/Registrar';
import OlvidePassword from './paginasPublicas/OlvidePassword';
import ConfirmarCuenta from './paginasPublicas/ConfirmarCuenta';
import NuevoPassword from './paginasPublicas/NuevoPassword';

//Privadas
import RutaProtegida from './layout/RutaProtegida';
import AdministrarTareas from './paginasPrivadas/AdministrarTareas';
import EditarPerfil from './paginasPrivadas/EditarPerfil'
import CambiarPassword from './paginasPrivadas/CambiarPassword';
import Calendario from './paginasPrivadas/Calendario';



function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
            <TareasProvider>
                <Routes>
                    {/* Rutas Publicas */}
                    <Route path='/' element={<AuthLayout />}> {/* Componente Padre */}
                        <Route index element={<Login />} /> {/* Pagina principal */}
                        <Route path='registrar' element={<Registrar />}/>
                        <Route path='forgot-password' element={<OlvidePassword />}/>
                        <Route path='forgot-password/:token' element={<NuevoPassword />}/>
                        <Route path='confirmar/:id' element={<ConfirmarCuenta />}/>
                    </Route>

                    {/* Rutas Privadas */}
                    <Route path='/admin' element={<RutaProtegida />}>
                        <Route index element={<AdministrarTareas />} />
                        <Route path='perfil' element={<EditarPerfil />}/> 
                        <Route path='cambiar-password' element={<CambiarPassword />}/> 
                        <Route path='calendario' element={<Calendario />}/> 
                    </Route>

                    
                </Routes>
            </TareasProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
