import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/axios"

import AlertaConfirmacion from "../components/AlertaConfirmacion"


const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const {id} = params;

  useEffect(()=> {
    const confirmarCuenta = async()=> {
      try {
          const url = `/usuarios/confirmar/${id}`; // La API del backend, el resto de la url esta en el config
          const { data } = await clienteAxios(url);

          setCuentaConfirmada(true)
          setAlerta({
            msg: data.msg
          });

      } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          });
      }

      setCargando(false)
    }

    confirmarCuenta();
  }, [])


  return (
    <>
        <div className="bg-sky-800 rounded-xl md:w-2/5 block">
          <h6 className="text-white font-semibold px-10 py-10 text-sm tracking-wider">Task Master</h6>
          <h1 className="text-white font-semibold text-2xl text-center md:mt-5 mb-10 mx-10">Confirmar cuenta</h1>
          <p className="text-white text-center text-sm mx-5 mb-10 font-normal hidden md:block">Confirma tu Cuenta y Comienza a Administrar tus Tareas</p>
        </div>
        <div className='md:w-3/5' >
            {!cargando && <AlertaConfirmacion alerta={alerta} />}
            
            {cuentaConfirmada && (
              <Link  className='block text-center text-gray-500 'to="/">
                Iniciar Sesion
              </Link>
            )}
        </div>
    </>
  )
}

export default ConfirmarCuenta