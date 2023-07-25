import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
      <div className= {`flex items-center justify-center h-screen md:flex md:items-center md:justify-center`}>
        <main className="w-full md:w-auto max-w-3xl mx-auto flex flex-col md:flex-row md:gap-9 gap-2 p-5 bg-white md:shadow-lg rounded-xl">
          <Outlet />
        </main>
      </div>

    </>
  )
}

export default AuthLayout;