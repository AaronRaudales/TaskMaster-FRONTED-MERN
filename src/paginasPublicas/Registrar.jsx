import { useState } from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../config/axios';
import { toast } from 'react-hot-toast';
import Alerta from '../components/Alerta';

const Registrar = () => {
  const [nombre, setNombre ] = useState('')
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('')
  const [repetirPassword, setRepetirPassword ] = useState('')
  const [mostrarPassword, setMostrarPassword] = useState(false)// muestra el password que esta oculto
  const [mostrarConfirmarPassword, setMostrarConfirmarPassword] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){
      toast.error('Completa todos los campos.');
      return;
    }

    if(password !== repetirPassword){
      toast.error('Las contraseñas no coinciden')
      return;
    }

    if(password.length < 6 ){
      toast.error('Contraseña no cumple requisitos, Minimo 6 caracteres requeridos.')
      return;
    }

    // Crear el usuario en la api
    try {
       await clienteAxios.post('/usuarios', {nombre, email, password})
       toast.success('Creado correctamente, revise su email');
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  return (
    <>
      <Alerta />
        <div className="bg-sky-800 rounded-xl md:w-2/5 hidden md:block">
          <h6 className="text-white font-semibold px-10 py-10 text-sm tracking-wider">Task Master</h6>
            <h1 className="text-white font-semibold text-2xl mt-20 mb-10 px-10">Bienvenido.</h1>
            <p className="text-white text-sm px-10 font-normal">¡Únase a nuestra aplicación de lista de tareas pendientes y tome el control de sus tareas sin esfuerzo! Regístrese ahora y aproveche al máximo cada día!.</p>
        </div>

        <div className='md:w-3/5'>
          <h1 className="text-sky-800 mt-10 mb-20 md:mt-5 md:mb-10 block text-2xl font-bold uppercase text-center md:text-left">Crea una cuenta</h1>
          <form 
          onSubmit={handleSubmit}
          >
              <div className="my-5">
                <label className="text-gray-600 block text-base font-semibold" >Nombre</label>
                  <input 
                      type="text"
                      placeholder="Nombre Completo"
                      className="border w-full p-3 mt-3 bg-white rounded-lg font-normal focus:outline-none focus:shadow-none"
                      value={nombre}
                      onChange={ e => setNombre(e.target.value)}
                  />
              </div>
              <div className="my-5">
                <label className="text-gray-600 block text-base font-semibold" >Correo</label>
                  <input 
                      type="email"
                      placeholder="Correo Electronico"
                      className="border w-full p-3 mt-3 bg-white rounded-lg font-normal focus:outline-none focus:shadow-none"
                      value={email}
                      onChange={ e => setEmail(e.target.value)}
                  />
              </div>
              <div className="my-5 flex items-center">
                  <div className="flex-grow">
                    <label className="text-gray-600 block text-base font-semibold">Contraseña</label>
                      <input 
                          type="password"
                          placeholder="Contraseña"
                          className="border w-full p-3 mt-3 bg-white rounded-lg font-normal focus:outline-none focus:shadow-none"
                          value={password}
                          onChange={ e => setPassword(e.target.value)}
                      />
                  </div>
                  <div 
                          className="cursor-pointer ml-2 mt-10" 
                          onClick={() => setMostrarPassword(!mostrarPassword)}
                      > {/* Ajustamos el margen izquierdo para separar el icono del input */}
                          {mostrarPassword ? (
                          <i className="bx bxs-show bx-sm"></i>
                          ) : (
                          <i className="bx bxs-low-vision bx-sm"></i>
                          )}
                  </div>
              </div>
              <div className="my-5 flex items-center">
                  <div className="flex-grow">
                    <label className="text-gray-600 block text-base font-semibold">Confirmar Contraseña</label>
                      <input 
                          type="password"
                          placeholder="Confirma tu contraseña"
                          className="border w-full p-3 mt-3 bg-white rounded-lg font-normal focus:outline-none focus:shadow-none"
                          value={repetirPassword}
                          onChange={ e => setRepetirPassword(e.target.value)}
                      />
                  </div>
                  <div 
                          className="cursor-pointer ml-2 mt-10" 
                          onClick={() => setMostrarConfirmarPassword(!mostrarConfirmarPassword)}
                      > {/* Ajustamos el margen izquierdo para separar el icono del input */}
                          {mostrarConfirmarPassword ? (
                          <i className="bx bxs-show bx-sm"></i>
                          ) : (
                          <i className="bx bxs-low-vision bx-sm"></i>
                          )}
                  </div>
              </div>
              <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-sky-800 text-white w-full py-3 rounded-xl font-bold hover:cursor-pointer md:w-auto px-10 mt-10 md:mt-0"
                />
          </form>
          <nav>
              <Link
                  className='block text-sm text-center font-normal text-gray-600 mt-8 md:mt-7 md:mb-2'
                  to="/">Already have an account? {""}<span className='text-sky-800 font-semibold hover:border-b hover:border-sky-800'>Login</span>
              </Link>
          </nav>
        </div>
    </>
  )
}

export default Registrar