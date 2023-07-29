import { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios';



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mostrarPassword, setMostrarPassword] = useState(false)// muestra el password que esta oculto

    const { setAuth} = useAuth()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        if([email, password].includes('')){
            toast.error('Todos los campos son obligatorios')
            return
        }

        try {
            const {data} = await clienteAxios.post('/usuarios/login', {email, password})

            //Guardamos el token del usuario que inicio sesion
            localStorage.setItem('user_token', data.token)
            setAuth(data)
            navigate('/admin')
        } catch (error) {
            toast.error(error.response.data.msg)
        }

    }

  return (
   <>
        <div className="bg-sky-800 rounded-xl md:w-2/5 hidden md:block">
            <h6 className='text-white font-semibold px-10 py-10 text-sm tracking-wider'>Task Master</h6>
            <h1 className="text-white font-semibold text-2xl pt-20 pb-10 px-10">Administra tus actividades con nosotros. 
            </h1>
            <p className="text-white text-sm px-10 font-normal">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>

        </div>
        <div className='md:w-3/5'>
            <Alerta />
            <h1 className="text-sky-800 mt-10 mb-20 md:mb-0 block text-2xl font-bold uppercase text-center md:text-left">Iniciar Sesion</h1>
            <form
            onSubmit={handleSubmit}
            >
                <div className="my-8">
                    <label className="text-gray-600 block text-base font-semibold" >Correo</label>
                    <input 
                        type="email"
                        placeholder="Correo electronico"
                        autoComplete='username'
                        className="border w-full p-3 mt-3 bg-white rounded-lg font-normal outline-gray-300"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5 flex items-center"> {/* Utilizamos 'items-center' para centrar verticalmente los elementos */}
                    <div className="flex-grow"> {/* Utilizamos 'flex-grow' para que el input ocupe todo el ancho disponible */}
                        <label className="text-gray-600 block text-base font-semibold">Contraseña</label>
                        <input 
                        type={mostrarPassword ? "text" : "password"}
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        className="border-gray-300 w-full p-3 mt-3 bg-white rounded-lg font-normal outline-gray-300"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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

                <nav className='md:flex md:justify-between'>
                    <Link
                        className='block text-sm text-center text-sky-800 font-semibold mt-10 md:my-5'
                        to="/forgot-password"><span className='hover:border-b hover:border-sky-800'>Forgot Password?</span>
                    </Link>
                    <Link
                        className='block text-sm text-center my-5 text-gray-600 font-normal'
                        to="/registrar">Are you new User? <span className='text-sky-800 font-semibold hover:border-b hover:border-sky-800'>Sign up</span>
                        
                    </Link>
                </nav>
                <input 
                    type="submit"
                    value="Iniciar Sesion"
                    className="bg-sky-800 text-white w-full py-3 rounded-xl font-bold mt-10 md:mt-5 hover:cursor-pointer md:w-auto px-10 mb-10"

                />
            </form>
        </div>

   </>
  )
}

export default Login