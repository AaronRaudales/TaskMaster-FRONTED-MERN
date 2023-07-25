import { useState } from "react"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"
import { toast } from "react-hot-toast"

import NavegacionSettings from "../components/NavegacionSettings"


const CambiarPassword = () => {
  const { guardarNuevoPassword } = useAuth()

  const [password, setPassword] = useState({
    password_actual:'',
    password_nuevo:''
  });


  const handleSubmit = async e=> {
    e.preventDefault()

    if(Object.values(password).some(campo => campo === '')){
      toast.error('Todos los campos son obligatorios')
      return
    }

    if(password.password_nuevo < 6){
      toast.error('El password debe contener minimo 6 caracteres')
      return
    }
    
      const respuesta = await guardarNuevoPassword(password)
      if(respuesta.success === true){
        // Restablecer los campos de contraseña a vacíos después del cambio exitoso
        setPassword({
          password_actual:'',
          password_nuevo:''
        });

        toast.success(respuesta.message)
      } else {
        toast.error(respuesta.message)
      }
  }

  return (
    <>
        <NavegacionSettings />
        <h2 className="text-2xl m-5 text-center font-bold text-sky-700">Cambiar Contraseña</h2>
        <div className="flex justify-center m-3 md:m-0">
            <div className="w-full md:w-1/2 bg-white rounded-lg p-5">
            <Alerta />
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-5">
                      <label className="uppercase font-bold text-gray-600">Contraseña Actual</label>
                      <input 
                        type="password"
                        placeholder="Escribe tu contraseña actual"
                        className="border bg-gray-50 w-full p-2 mt-4 rounded-lg outline-gray-300"
                        name="password_actual"
                        value={password.password_actual}
                        onChange={e=> setPassword({
                          ...password, // Hacemos una copia de lo que haya en el state
                          [e.target.name] : e.target.value
                      })}
                      />
                    </div>
                    <div className="my-5">
                      <label className="uppercase font-bold text-gray-600">Contraseña Nueva</label>
                      <input 
                        type="password"
                        placeholder="Escribe tu nueva contraseña"
                        className="border bg-gray-50 w-full p-2 mt-4 rounded-lg outline-gray-300"
                        name="password_nuevo"
                        value={password.password_nuevo}
                        onChange={e=> setPassword({
                          ...password, // Hacemos una copia de lo que haya en el state
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

export default CambiarPassword