import { useState } from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../config/axios';
import { toast } from 'react-hot-toast';

import Alerta from '../components/Alerta';

const OlvidePassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async e=> {
    e.preventDefault();

    if(email === ''){
      toast.error('El email es obligatorio')
      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/forgot-password', {email})
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }

  return (
    <>
        <div className="bg-sky-800 rounded-xl md:w-2/5 hidden md:block">
          <h6 className="text-white font-semibold px-10 py-10 text-sm tracking-wider">Task Master</h6>
            <p className="text-white text-base px-10 mt-12 font-semibold">Introduce tu correo electrónico para buscar tu cuenta.</p>
        </div>

        <div className='md:w-3/5'>
          <Alerta />
          <h1 className="text-sky-800 mt-10 block text-2xl font-bold uppercase text-center md:text-left">Recupera tu cuenta </h1>
          <p className="text-gray-400 text-base px-3 mt-20 mb-10 font-semibold block md:hidden">Introduce tu correo electrónico para buscar tu cuenta.</p>
          <form 
            onSubmit={handleSubmit}
          >
              <div className="my-8">
                    <label className="text-gray-600 block text-base font-semibold">Email</label>
                      <input 
                          type="email"
                          placeholder="Your Email"
                          className="border w-full p-3 mt-3 bg-white rounded-lg font-normal outline-gray-300"
                          value={email}
                          onChange={e=> setEmail(e.target.value)}
                      />
              </div>
              <input 
                  type="submit"
                  value="Enviar Instrucciones"
                  className="bg-sky-800 text-white w-full py-3 rounded-xl font-bold hover:cursor-pointer md:w-auto mt-10 md:mt-3 px-10"
              />
          </form>
          <nav>
              <Link
                  className='block text-sm text-center font-normal text-gray-600 mt-10 md:mt-8 md:my-7'
                  to="/">Already have an account? {""}<span className='text-sky-800 font-semibold hover:border-b hover:border-sky-800'>Login</span>
              </Link>
          </nav>
        </div>
    </>
  )
}

export default OlvidePassword