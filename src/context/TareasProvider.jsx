import { createContext, useState, useEffect } from "react"
import clienteAxios from "../config/axios"
import deleteConfirmation from "../components/SweetAlerts"
import useAuth from "../hooks/useAuth"

const TareasContext = createContext()

const TareasProvider = ({children}) => {
    const [tareas, setTareas] = useState([])
    const [tareaEditada, setTareaEditada] = useState({})
    const { auth } = useAuth()
 
    // Este useEffect es importante, ya que hace que al recargar la pagina el contenido de la tarea se mantenga almacenado en el context, sin este, al recargar el context el contenido se perderia
    useEffect( () => {
      const obtenerTareas = async() => {
        try {
          const token = localStorage.getItem('user_token')
          if(!token) return

          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }

          const { data } = await clienteAxios('/tareas', config)
          data.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setTareas(data)
        } catch (error) {
          console.log(error)
        }
      }
      obtenerTareas()
    }, [auth])

    const guardarTarea = async(tarea)=> {
        // Autorizacion
        const token = localStorage.getItem('user_token')

        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
        if(tarea.id) {
            try {
              const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)
              const tareaActualizada = tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
              setTareas(tareaActualizada)
            } catch (error) {
              console.log(error)
            }
        }else {
            try {
              const { data } = await clienteAxios.post('/tareas', tarea, config) 
              const {createdAt, updatedAt, _v, ...tareaAlmacenada } = data

              setTareas([tareaAlmacenada,...tareas,])
            } catch (error) {
              console.log(error.response.data.msg)
            }
        }
    }

    const editarTarea = (tarea) => {
        setTareaEditada(tarea)
    }

    const eliminarTarea = async id => {
        const handleDeleteConfirmation = async () =>{
            try {
                const token = localStorage.getItem('user_token')

                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.delete(`/tareas/${id}`, config)
                const TareaActualizada = tareas.filter(tareaState => tareaState._id !== id) 
                setTareas(TareaActualizada)
            } catch (error) {
                console.log(error)
            }
        }

        deleteConfirmation({
            title: '',
            text: '¿Confirmas que deseas eliminar la Tarea? ',
            confirmButtonText: 'CONFIRMAR',
            onDelete: handleDeleteConfirmation
        });
    };

  return (
    <TareasContext.Provider
        value={{
          tareas,
          guardarTarea,
          editarTarea,
          tareaEditada,
          eliminarTarea
        }}
    >
        {children}
    </TareasContext.Provider>
  )
}

export {
    TareasProvider
}

export default TareasContext