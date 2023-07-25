
const AlertaConfirmacion = ({alerta}) => {
    return (
      <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'bg-sky-800'} bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10 mt-10 md:mt-20`}>
          {alerta.msg}
      </div>
    )
  };
  
  export default AlertaConfirmacion;