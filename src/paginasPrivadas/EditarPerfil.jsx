import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"
import { toast } from "react-hot-toast"

import NavegacionSettings from "../components/NavegacionSettings"


const Perfil = () => {
  const { auth, actualizarPerfil } = useAuth()
  const [perfil, setPerfil] = useState({})


  useEffect(()=> {
    setPerfil(auth)
  },[auth])

  const handleSubmit = async e=> {
      e.preventDefault()

      const { nombre, email } = perfil;

      if([nombre, email].includes('')){
        toast.error('Nombre e Email son obligatorios')
        return
      }

      const usuarioActualizado = await actualizarPerfil(perfil)
      if(usuarioActualizado.success === true){
        toast.success(usuarioActualizado.message)
      } else {
        toast.error(usuarioActualizado.message)
      }
  }


  return (
   <>
        <NavegacionSettings /> 
        <h2 className="text-2xl m-5 text-center font-bold text-sky-700">Editar Perfil</h2>
        <div className="flex justify-center m-3 md:m-0">
            <div className="w-full md:w-1/2 bg-white rounded-lg p-5">
            <Alerta />
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                      <label className="uppercase font-bold text-gray-600">Nombre</label>
                      <input 
                        type="text"
                        name="nombre"
                        className="border bg-gray-50 w-full p-2 mt-4 rounded-lg outline-gray-300"
                        value={perfil.nombre || ''} 
                        onChange={ e => setPerfil({
                          ...perfil,
                          [e.target.name] : e.target.value
                        })}
                      />
                    </div>
                    <div className="my-3">
                      <label className="uppercase font-bold text-gray-600">Telefono</label>
                      <input 
                        type="tel"
                        name="telefono"
                        className="border bg-gray-50 w-full p-2 mt-4 rounded-lg outline-gray-300"
                        value={perfil.telefono || ''} 
                        onChange={ e => setPerfil({
                          ...perfil,
                          [e.target.name] : e.target.value
                        })} 
                      />
                    </div>
                    <div className="my-3">
                      <label className="uppercase font-bold text-gray-600">Email</label>
                      <input 
                        type="email"
                        name="email"
                        className="border bg-gray-50 w-full p-2 mt-4 rounded-lg outline-gray-300"
                        value={perfil.email || ''} 
                        onChange={ e => setPerfil({
                          ...perfil,
                          [e.target.name] : e.target.value
                        })} 
                      />
                    </div>
                    <input 
                      type="submit"
                      value='Guardar Cambios'
                      className="w-full text-center bg-sky-700 py-3 uppercase font-bold text-white rounded-lg mt-5 cursor-pointer" 
                    />
                </form>
            </div>
        </div>
   </>
  )
}

export default Perfil