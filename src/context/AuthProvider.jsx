import {useState, useEffect, createContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import clienteAxios from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [ auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)

    const {pathname } = useLocation()
    const navigate = useNavigate()

    useEffect(()=> {
        const autenticarUsuario = async() => {
            const token = localStorage.getItem('user_token')
            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
                const rutas= ["/", "/registrar", "/forgot-password", "/confirmar"]
 
                if (rutas.includes(pathname)) {
                    navigate("/admin");
                }
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario();
    }, [])

    if (cargando) {
        // No muestra nada mientras se verifica la autenticación
        return null;
    }

    // Cerrar la sesion del sitio
    const cerrarSesion = () =>{
        localStorage.removeItem('user_token')
        setAuth({})
    }

    const actualizarPerfil = async datos =>{
        const token = localStorage.getItem('user_token')
        if(!token){
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put(`usuarios/perfil/${datos._id}`, datos, config)
            return {success:true, message:'Datos modificados correctamente'}
        } catch (error) {
            return {success:false, message: error.response.data.msg}
        }
    }

    const guardarNuevoPassword = async datos => {
        const token = localStorage.getItem('user_token')
        if(!token){
            setCargando(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const { data } = await clienteAxios.put('/usuarios/actualizar-password', datos, config)
            return {success:true, message:data.msg}
        } catch (error) {
            return {success:false, message: error.response.data.msg}
        }
    }
    
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarNuevoPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext