import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import useTareas from '../hooks/useTareas';

const Calendario = () => {
  const { tareas } = useTareas();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Cuando cambie la información de "tareas", actualiza el arreglo de eventos "events" con los nuevos datos
    if (tareas && tareas.length > 0) {
      const newEvents = tareas.map((tarea) => ({
        title: tarea.titulo,
        start: Date.now(), // Reemplaza esto con el campo adecuado de tus datos de "tareas"
        end: tarea.fechaFinalizacion, // Reemplaza esto con el campo adecuado de tus datos de "tareas"
      }));
      setEvents(newEvents);
    }
  }, [tareas]);

  return (
    <div className="flex md:justify-center h-screen">
      <div className="container pt-28 w-full md:w-3/4 z-0"> {/* Ajustamos el ancho del calendario */}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "prev,next",
            center: "title",
            end: "dayGridMonth"
          }}
          height={"90vh"}
          events={events}
        />
      </div>
    </div>
  );
};

export default Calendario;
