import { useState } from "react"

import ListadoTareas from "../components/ListadoTareas"
import FormularioTareas from "../components/FormularioTareas"

const AdministrarTareas = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="flex flex-col md:flex-row mt-20">

        {/* Boton para ocultar el formulario en dispositivos moviles */}
        <button
          type="buttom"
          className="bg-sky-700 text-white uppercase font-bold mx-10 mt-10 p-3 rounded-md mb-10 md:hidden"
          onClick={ () => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}
        </button>


        <div className={`${mostrarFormulario ? 'block': 'hidden'} md:block md:w-1/2 lg:w-2/5`}>
            <FormularioTareas />
        </div>
        <div className="md:w-1/2 lg:w-3/5">
            <ListadoTareas />
        </div>
    </div>
  )
}

export default AdministrarTareas