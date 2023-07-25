import { useState, useEffect } from "react";
import useTareas from "../hooks/useTareas"
import Tarea from "./Tarea"

const ListadoTareas = () => {

  const { tareas } = useTareas()

  return (

    <>
      {tareas.length ? ( 
        <>
          <h2 className="font-black text-2xl text-center md:mt-5">Listado Tareas</h2>
          <p className="text-center mb-8 text-lg mt-4">Visualiza tus {''} 
            <span className="font-bold text-sky-700">Tareas</span>
          </p>
          { tareas.map( (tarea) => (
              <Tarea 
                key={tarea._id}
                tarea = {tarea}
              />
          ))}
        </>

      ) : (
        <>
          <h2 className="font-black text-2xl text-center md:mt-5">Aun no tiene Tareas</h2>
          <p className="text-center mb-10 text-lg mt-4">Comienza agregando Tareas {''} 
            <span className="font-bold text-sky-700">y apareceran en este lugar</span>
          </p>
        </>
      )}
     </>
  )
}

export default ListadoTareas