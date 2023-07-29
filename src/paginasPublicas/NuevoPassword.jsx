import { useState, useEffect } from "react"
import {useParams, useNavigate} from 'react-router-dom'
import { toast } from "react-hot-toast"
import clienteAxios from "../config/axios"

import Alerta from "../components/Alerta"

const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [tokenConfirmado, setTokenConfirmado] = useState(false)

  const params = useParams()
  const { token } = params;

  const navigate = useNavigate()

  useEffect(() =>{
    const confirmarToken = async() => {
      try {
      await clienteAxios(`/usuarios/forgot-password/${token}`)
      toast.success('Coloca tu nueva contraseña')

      setTokenConfirmado(true)
      } catch (error) {
        toast.error('Ha ocurrido un error. Por favor, acceda al enlace que le hemos enviado para poder cambiar su contraseña.')
      }
    }
    confirmarToken()
  },[])

  const handleSubmit = async e => {
    e.preventDefault()

    if(password === ''){
      toast.error('Completa todos los campos')
      return
    }
  
    if(password.length < 6){
      toast.error('Contraseña no cumple requisitos, Minimo 6 caracteres requeridos.')
      return
    }

    try {
      const {data} = await clienteAxios.post(`/usuarios/forgot-password/${token}`, {password})
      toast.success(data.msg)

      //Redirecciona a la pagina principal luego de cambiar la contraseña
      setTimeout(() => {
        navigate('/')
      }, 3000);

    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  return (
    <>
      <div className="bg-sky-800 rounded-xl md:w-2/5 hidden md:block">
          <h6 className="text-white font-semibold px-10 py-10 text-sm tracking-wider">Task Master</h6>
            <p className="text-white text-base px-10 mt-5 mb-10 font-semibold">Restablece tu contraseña y no pierdas tu acceso.</p>
        </div>

        <div className='md:w-3/5'>
          <Alerta />
          <h1 className="text-sky-800 mt-10 block text-2xl font-bold uppercase text-center md:text-left">Restablecer Contraseña</h1>
          <p className="text-gray-400 text-base px-3 mt-20 mb-10 font-semibold block md:hidden">Restablece tu contraseña y no pierdas tu acceso.</p>

          { tokenConfirmado && (
            <>
              <form 
                onSubmit={handleSubmit}
              >
                  <div className="my-8">
                        <label className="text-gray-600 block text-base font-semibold">Nueva Contraseña</label>
                          <input 
                              type="password"
                              placeholder="Nueva contraseña"
                              className="border w-full p-3 mt-3 bg-white rounded-lg font-normal outline-gray-300"
                              value={password}
                              onChange={ e => setPassword(e.target.value)}
                          />
                  </div>
                  <input 
                      type="submit"
                      value="Guardar Contraseña"
                      className="bg-sky-800 text-white w-full py-3 rounded-xl font-bold hover:cursor-pointer md:w-auto mt-10 md:mt-3 px-10"
                  />
              </form>
            </>
          )}
        </div>
    </>
  )
}

export default NuevoPassword