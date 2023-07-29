import { Outlet, Navigate } from "react-router-dom"
import useAuth from '../hooks/useAuth'

import Sidebar from "../components/Sidebar"

const RutaProtegida = () => {
  const {auth} = useAuth()

  return (
    <>

      {/* Un div para que en tamaño sm tenga un fondo gris */}
      <div className="bg-gray-100">
            {/*<Sidebar/>/*}
            {/* Verifica que el usuario este autenticado  */}
            {auth?._id ? (
                <main>
                    <Outlet /> 
                </main>
            ): <Navigate to='/' /> }
      </div>
        

    </>
  )
}

export default RutaProtegida