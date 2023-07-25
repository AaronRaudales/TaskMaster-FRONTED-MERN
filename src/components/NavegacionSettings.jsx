import { Link, useLocation } from "react-router-dom"

const NavegacionSettings = () => {
    const location = useLocation()

  return (
    <>
    <nav className="pt-28 pb-5">
        <div className="flex items-center justify-center py-2 flex-row gap-5 bg-gray-200 text-sky-800 h-65 w-80 mx-auto my-1/2 rounded-lg">
            <div className={`p-1 px-8 rounded-lg font-bold ${location.pathname === '/admin/perfil' ? 'bg-white text-sky-700' : 'hover:bg-white hover:text-sky-700'}`}>
                <Link 
                    to="/admin/perfil"
                    >Perfil
                </Link>
            </div>
            <div className={`p-1 px-8 rounded-lg font-bold ${location.pathname === '/admin/cambiar-password' ? 'bg-white text-sky-700' : 'hover:bg-white hover:text-sky-700'}`}>
                <Link 
                    to="/admin/cambiar-password"
                    >Contraseña
                </Link>
            </div>
        </div>
    </nav>


    </>
  )
}

export default NavegacionSettings