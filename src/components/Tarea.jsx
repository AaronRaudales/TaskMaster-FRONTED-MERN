import { useState, useEffect } from "react"
import useTareas from "../hooks/useTareas"

const Tarea = ({tarea}) => {
  const {titulo, descripcion, asignaciones, fechaFinalizacion,horaFinalizacion, _id} = tarea;

  const { editarTarea, eliminarTarea } = useTareas()
  const [tiempoRestante, setTiempoRestante] = useState(null);

  // Formatear la fecha
  const formatearFecha = (fecha) => {
      const nuevaFecha = new Date(fecha);
      return new Intl.DateTimeFormat('es-HN', {dateStyle: 'long'}).format(nuevaFecha)
  }

  const formatearHora = (hora) => {
    const horaObj = new Date(`1970-01-01T${hora}Z`);
    const opciones = { hour: "numeric", minute: "numeric", hour12: true, timeZone: "UTC" };
    return horaObj.toLocaleString("es-HN", opciones);
  };
  
  
  // Restar la fecha y hora de finalización con la fecha y hora actuales
  useEffect(() => {
      const calcularTiempoRestante = () => {
        const fechaHoraFinalizacion = new Date(fechaFinalizacion);
        const [hora, minutos] = horaFinalizacion.split(":");
        fechaHoraFinalizacion.setUTCHours(hora);
        fechaHoraFinalizacion.setUTCMinutes(minutos);
        const ahora = new Date();
  
        if (isNaN(fechaHoraFinalizacion.getTime())) {
          console.error("Fecha de finalización inválida");
          return;
        }
  
        const tiempoRestanteMilisegundos = fechaHoraFinalizacion - ahora;
  
        // Verificar si la tarea ya ha vencido
        if (tiempoRestanteMilisegundos <= 0) {
          setTiempoRestante("Tarea vencida");
        } else {
          const segundos = Math.floor(tiempoRestanteMilisegundos / 1000) % 60;
          const minutos = Math.floor(tiempoRestanteMilisegundos / (1000 * 60)) % 60;
          const horas = Math.floor(tiempoRestanteMilisegundos / (1000 * 60 * 60)) % 24;
          const dias = Math.floor(tiempoRestanteMilisegundos / (1000 * 60 * 60 * 24));
  
          setTiempoRestante(`${dias} días, ${horas} horas, ${minutos} minutos y ${segundos} segundos`);
        }
      };
  
      // Llamar al cálculo inicial
      calcularTiempoRestante();
  
      // Actualizar el tiempo restante cada segundo
      const intervalo = setInterval(calcularTiempoRestante, 1000);
  
      // Limpiar el intervalo cuando el componente se desmonte
      clearInterval(intervalo);
  }, [fechaFinalizacion, horaFinalizacion]);
  
  return (
    <div className="mx-4 my-5 px-5 py-5 md:mx-10 md:my-0 md:mb-5 bg-white shadow-md rounded-md text-sm">
      <p className="font-bold uppercase text-sky-700 my-2">Titulo: {''}
        <span className="font-normal normal-case text-black">{titulo}</span>
      </p>
      <p className="font-bold uppercase text-sky-700 my-2">Descripcion: {''}
        <span className="font-normal normal-case text-black">{descripcion}</span>
      </p>
      <p className="font-bold uppercase text-sky-700 my-2">Asignaciones: {''}</p>
        {asignaciones.map((asignacion, index) => (
            <p key={index}>{asignacion}</p>
        ))}
      <p className="font-bold uppercase text-sky-700 my-2">Fecha Limite: {''}
        <span className="font-normal normal-case text-black">{formatearFecha(fechaFinalizacion)}</span>
      </p>
      <p className="font-bold uppercase text-sky-700 my-2">Hora Limite: {''}
        <span className="font-normal normal-case text-black">{formatearHora(horaFinalizacion)}</span>
      </p>
      <p className="font-bold uppercase text-sky-700 my-2">Tiempo Restante: {''}
        <span className="font-normal normal-case text-black">{tiempoRestante}</span>
      </p>
      <div className="mt-8 md:mb-0 flex justify-around">
          <button 
            type="button"
            className="bg-sky-800 hover:bg-sky-700 px-10 py-2 rounded-md uppercase text-white font-bold text-sm"
            onClick={() => editarTarea(tarea)}
          >
            Editar
          </button>
          <button 
            type="button"
            className="bg-red-600 hover:bg-red-500 transition-colors px-10 py-2 rounded-md uppercase text-white font-bold text-sm"
            onClick={() => eliminarTarea(_id)}
          >
            Eliminar
          </button>
      </div>
    </div> 
  )
}

export default Tarea