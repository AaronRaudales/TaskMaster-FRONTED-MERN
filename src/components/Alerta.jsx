import {Toaster} from 'react-hot-toast'

const Alerta = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 5000,
        style: {
          background: '#FFFFFF',
          color: '#075985',
          fontWeight: 'bold',
          fontSize: '16px',
          padding: '20px'
        }
      }}
    />
  )
}

export default Alerta