import { useState, useEffect } from "react"
import useTareas from "../hooks/useTareas"

import Alerta from "./Alerta"
import toast  from "react-hot-toast"


const FormularioTareas = () => {
    // State locales
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [asignacion, setAsignacion] = useState('')
    const [fechaFinalizacion, setFechaFinalizacion] = useState('')
    const [horaFinalizacion, setHoraFinalizacion] = useState('')
    const [id, setId] = useState(null)

    const { guardarTarea, tareaEditada } = useTareas()

      // Nuevo estado para manejar las asignaciones
    const [asignaciones, setAsignaciones] = useState([])

    useEffect(() => {
        if(tareaEditada?.titulo){
          setTitulo(tareaEditada.titulo)
          setDescripcion(tareaEditada.descripcion)
          setAsignaciones(tareaEditada.asignaciones)
          setFechaFinalizacion(tareaEditada.fechaFinalizacion)
          setHoraFinalizacion(tareaEditada.horaFinalizacion)
          setId(tareaEditada._id)

        }
    }, [tareaEditada])

    const handleSubmit = e => {
      e.preventDefault()

      if([titulo, descripcion, asignaciones, fechaFinalizacion, horaFinalizacion].includes('')){
        toast.error('Todos los campos son obligatorios')
        return;
      }

      // Combinar la fecha seleccionada con la hora seleccionada para obtener la fecha completa
      const fechaCompleta = new Date(`${fechaFinalizacion}T${horaFinalizacion}`);

        // Filtrar los campos de entrada vacíos de las asignaciones antes de enviar la tarea actualizada
      const asignacionesFiltradas = asignaciones.filter(asignacion => asignacion.trim() !== "");

      guardarTarea({titulo, descripcion, asignaciones: asignacionesFiltradas, fechaFinalizacion:fechaCompleta,horaFinalizacion, id})
      { id ? (toast.success('Tarea modificada exitosamente') ): ( toast.success('Tarea agregada exitosamente') )}
      
      setTitulo('')
      setDescripcion('')
      setAsignaciones([])
      setFechaFinalizacion('')
      setHoraFinalizacion('')
      setId('')
    }

    const handleAgregarAsignacion = () => {
      if (asignacion.trim() !== '') {
        setAsignaciones([...asignaciones, asignacion])
        setAsignacion('')
      }
    }


  return (
    <>
      <h2 className="font-black text-2xl text-center md:mt-5">Administrador de Tareas</h2>
      <p className="text-center mb-8 text-lg mt-4">Añade tus tareas y {''} 
        <span className="font-bold text-sky-700">Administralos</span>
      </p>

      <Alerta />
      <form 
        className=" bg-white py-5 px-5 mx-4 mb-10 lg:mx-0 shadow-md rounded-md lg:ml-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
            <label htmlFor="titulo" className="text-sky-700 uppercase font-bold">Titulo</label>
            <input 
                type="text"
                id="titulo"
                placeholder="Titulo"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 focus:outline-none focus:shadow-none rounded-md"
                value={titulo}
                onChange={e =>  setTitulo(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="descripcion" className="text-sky-700 uppercase font-bold">Descripcion</label>
            <input 
                type="text"
                id="descripcion"
                placeholder="Descripcion de la tarea"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 focus:outline-none focus:shadow-none rounded-md"
                value={descripcion}
                onChange={ e =>  setDescripcion(e.target.value)}
            />
        </div>

        <div className="mb-4">
            <label htmlFor="asignacion" className="text-sky-700 uppercase font-bold">
              Asignacion
            </label>
            {asignaciones.map((asignacion, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                className="border-2 w-full p-2 placeholder-gray-400 focus:outline-none focus:shadow-none rounded-md"
                value={asignacion}
                onChange={(e) => {
                  const updatedAsignaciones = [...asignaciones];
                  updatedAsignaciones[index] = e.target.value;
                  setAsignaciones(updatedAsignaciones);
                }}
              />
            </div>
          ))}
          <div className="mb-2">
            <input
              id="asignacion"
              placeholder="Asignaciones a administrar"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 focus:outline-none focus:shadow-none rounded-md"
              value={asignacion}
              onChange={(e) => setAsignacion(e.target.value)}
            />
            <button
              type="button"
              className="bg-sky-800 hover:bg-sky-700 transition-colors block p-3 mt-2 text-xs text-white uppercase font-bold cursor-pointer rounded-lg"
              onClick={handleAgregarAsignacion}
            >
              Agregar Asignacion
            </button>
          </div>
          {/* Mostrar las asignaciones agregadas */}
          {asignaciones.length > 0 && (
            <div className="mt-4">
              <p className="text-sky-700 uppercase font-bold">Asignaciones Agregadas:</p>
              <ul className="list-disc ml-5">
                {asignaciones.map((asignacion, index) => (
                  <li key={index}>{asignacion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mb-6">
            <label htmlFor="fechaFinalizacion" className="text-sky-700 uppercase font-bold">Fecha Limite</label>
            <input 
                type="date"
                id="fechaFinalizacion"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 focus:outline-none focus:shadow-none rounded-md"
                value={fechaFinalizacion}
                onChange={e =>  setFechaFinalizacion(e.target.value)}
            />
        </div>
        <div className="mb-6">
            <label htmlFor="horaFinalizacion" className="text-sky-700 uppercase font-bold">Hora Limite</label>
            <input 
                type="time"
                id="horaFinalizacion"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 focus:outline-none focus:shadow-none rounded-md"
                value={horaFinalizacion}
                onChange={e =>  setHoraFinalizacion(e.target.value)}
            />
        </div>

          <input 
              type="submit" 
              className="bg-sky-800 hover:bg-sky-700 transition-colors w-full p-3 text-white uppercase font-bold cursor-pointer rounded-lg"
              value={id ? "Guardar Cambios" : "Agregar Tarea"}
          />
      </form>
    </>
  )
}

export default FormularioTareas